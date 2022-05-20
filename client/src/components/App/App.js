import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "react-apollo";
import Test from '../Test/test'

const client = new ApolloClient({
    uri: 'http://localhost:3005/graphql'
});

function App() {

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                </header>
                <Test/>
            </div>
        </ApolloProvider>
    );
}

export default App;
