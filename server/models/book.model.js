const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    title: String,
    genre: String,
    authorID: String
})

module.exports = model('Book', bookSchema)