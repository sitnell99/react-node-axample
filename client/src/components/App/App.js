import {ApolloClient, from, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from "@apollo/client/react";
import {BrowserRouter} from "react-router-dom";
import Main from "../Main";
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client/public/index";
import {setContext} from "@apollo/client/link/context";
window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = true

const httpLink = createUploadLink({
    uri: 'http://localhost:3005/graphql'
});

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: ''
        }
    };
});

const errorLink = onError(
    ({graphQLErrors, networkError, forward, operation, response}) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        if (networkError) console.error(`[Network error]: ${networkError}`);

        if (response) {
            const {errors} = response;
            errors.forEach(({ path}, index) => {
                response.errors[index] = null;
            });
        }
        forward(operation);
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

const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
