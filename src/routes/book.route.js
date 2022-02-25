const restifyMongoose = require('restify-mongoose');
const BookModel = require('../models/book.model');

module.exports = function (server) {
  const book = restifyMongoose.call(restifyMongoose, BookModel);

  server.get('/book', book.query());
  server.get('/book/:id', book.detail());
  server.post('/book', book.insert());
  server.patch('/book/:id', book.update());
  server.del('/book/:id', book.remove());
};
