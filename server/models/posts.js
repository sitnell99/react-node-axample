const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: String,
    published: Date,
    content: String,
    authorId: String
});

module.exports = mongoose.model('Posts', postSchema)