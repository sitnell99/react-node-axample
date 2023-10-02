const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    token: String,
    firstname: String,
    lastname: String,
    birthdate: Date,
    phone: {type: String, unique: true},
    password: String,
});

module.exports = mongoose.model('Users', userSchema)