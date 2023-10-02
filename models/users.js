const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    token: String,
    firstname: String,
    lastname: String,
    birthdate: Date,
    phone: String,
    password: String,
});

module.exports = mongoose.model('Users', userSchema)