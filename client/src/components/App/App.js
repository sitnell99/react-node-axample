import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from "@apollo/client/react";
import {BrowserRouter} from "react-router-dom";
import Main from "../Main";

const client = new ApolloClient({
    uri: 'http://localhost:3005/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
