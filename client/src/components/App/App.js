import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from "@apollo/client/react";
import Test from '../Test/test'

const client = new ApolloClient({
    uri: 'http://localhost:3005/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Test/>
        </ApolloProvider>
    );
}

export default App;
