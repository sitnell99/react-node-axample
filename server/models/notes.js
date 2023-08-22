const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    authorId: String,
    theme: String,
    content: String,
    category: String,
});

module.exports = mongoose.model('Notes', notesSchema)