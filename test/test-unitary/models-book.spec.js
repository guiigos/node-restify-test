const mongoose = require('mongoose');
const BookModel = require('../../src/models/book.model');

const { expect } = global;

describe('Models :: Book', function () {
  it('should be instance expected', function () {
    const book = new BookModel();

    expect(book).to.be.an.instanceof(BookModel);
    expect(book).to.be.an.instanceof(mongoose.Model);
    expect(book).to.be.an.instanceof(mongoose.Document);
  });

  it('should be invalid values', function () {
    const book = new BookModel();
    const { errors } = book.validateSync();

    expect(errors).to.have.own.keys('title');
  });
});
