const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    published: Date,
    title: String,
    content: String,
    authorId: String,
    authorName: String
});

module.exports = mongoose.model('Posts', postSchema)