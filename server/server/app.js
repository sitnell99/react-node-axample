const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const dbConnect = mongoose.connection;
dbConnect.on('error', err => console.log(`Connection error: ${err}`));
dbConnect.once('open', () => console.log('Connection successful!'));

const portListen = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on ${PORT} port!`));
    } catch (error) {
        console.log(error);
    }
};

portListen();

