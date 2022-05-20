const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://Valentyn:FLATRONW2042S@graphql.whsz3.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const dbConnect = mongoose.connection;
dbConnect.on('error', err => console.log(`Connection error: ${err}`));
dbConnect.once('open', () => console.log('Connection successful!'))

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});