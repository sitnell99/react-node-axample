const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    theme: String,
    content: String,
    category: String,
    authorId: String
});

module.exports = mongoose.model('Notes', notesSchema)