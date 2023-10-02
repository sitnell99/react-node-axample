import {ApolloClient, from, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from "@apollo/client/react";
import {BrowserRouter} from "react-router-dom";
import Main from "../Main";
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";
import UserContextProvider from "../../context/UserContext";

window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = true;
const PORT = process.env.PORT || 5001;

const App = () => {

    const httpLink = createUploadLink({
        uri: `http://localhost:${PORT}/graphql`
    });

    const token = localStorage.getItem('token')

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
        createUploadLink()
    );
    const client = new ApolloClient({
        link: apolloLink,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <UserContextProvider children={<Main/>}/>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
