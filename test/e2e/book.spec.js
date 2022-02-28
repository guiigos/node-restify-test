const sinon = require('sinon');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { random } = require('faker');
const proxyquire = require('proxyquire');
const mock = require('../mocks/connection');

const { expect, request } = global;

const loader = proxyquire('../../src/loader', {
  './database/connection': mock
});

const server = proxyquire('../../src/server', {
  './loader': loader
});

const book = {
  title: random.word(),
};

let requester;

describe.only('Book', function () {
  before(function () {
    sinon.stub(dotenv, 'config');
    requester = request(server()).keepOpen();
  });

  beforeEach(async function () {
    await new mongoose.models.Book(book).save();
  });

  it('get', async function () {
    const { status, body } = await requester.get(`/book`);

    expect(status).to.equal(200);
    expect(body).to.have.lengthOf(1);
    body.forEach(element => {
      expect(element).to.own.include(book);
    });
  });

  it('get/:id', async function () {
    const { _id } = await mongoose.models.Book.findOne(book);
    const { status, body } = await requester.get(`/book/${_id}`);

    expect(status).to.equal(200);
    expect(body).to.own.include(book);
  });

  it('post', async function () {
    const { status, body } = await requester.post(`/book`).send(book);

    expect(status).to.equal(201);
    expect(body).to.own.include(book);
  });

  it('patch/:id', async function () {
    const mock = {
      title: random.word(),
    };

    const { _id } = await mongoose.models.Book.findOne(book);
    const { status, body } = await requester.patch(`/book/${_id}`).send(mock);

    expect(status).to.equal(200);
    expect(body).to.own.include(mock);
  });

  it('delete/:id', async function () {
    const { _id } = await mongoose.models.Book.findOne(book);
    const { status, body } = await requester.delete(`/book/${_id}`);

    expect(status).to.equal(200);
    expect(body).to.own.include(mock);
  });

  afterEach(async function () {
    await mongoose.models.Book.deleteMany({});
  });

  after(function () {
    requester.close();
    dotenv.config.restore();
  });
});
