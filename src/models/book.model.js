const { Schema, models, model } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  gender: String,
  summary: String,
  pages: Number,
  authors: [String],
});

module.exports = Book = models.Book || model('Book', bookSchema);
