import {ApolloClient, from, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from "@apollo/client/react";
import {BrowserRouter} from "react-router-dom";
import Main from '../Main';
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";
import UserContextProvider from "../../context/UserContext";
import React, {FC} from "react";
import {Provider as ReduxProvider} from "react-redux";
import store from '../../store';

const App: FC = () => {

    const httpLink = createUploadLink({
        uri: `${process.env.REACT_APP_GRAPHQL_URL}/graphql`
    });

    const token: string | null = localStorage.getItem('token')

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    });

    const errorLink = onError(
        ({graphQLErrors, networkError, forward, operation, response}) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({message, locations, path}) =>
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                );
            if (networkError) console.error(`[Network error]: ${networkError}`);
        }
    );

    const apolloLink = from(
        [errorLink, authLink.concat(httpLink)],
        // @ts-ignore
        createUploadLink()
    );
    const client = new ApolloClient({
        link: apolloLink,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <ReduxProvider store={store}>
                <BrowserRouter>
                    <UserContextProvider children={<Main/>}/>
                </BrowserRouter>
            </ReduxProvider>
        </ApolloProvider>
    );
}

export default App;
