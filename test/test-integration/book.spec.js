const sinon = require('sinon');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { random } = require('faker');
const server = require('../../src/server');

const mongooseFind = require('../common/mocks/mongoose-find');
const mongooseFindOne = require('../common/mocks/mongoose-find-one');
const mongooseCallback = require('../common/mocks/mongoose-callback');

const { expect, request } = global;

const book = {
  title: random.word(),
};

let requester, mockFind, mockFindOne;

describe('Book', function () {
  beforeEach(function () {
    mockFind = mongooseFind(book);
    mockFindOne = mongooseFindOne(book);

    sinon.stub(dotenv, 'config');

    sinon.stub(mongoose, 'connect');
    sinon.stub(mongoose.Query.prototype, 'find').returns(mockFind);
    sinon.stub(mongoose.Query.prototype, 'findOne').returns(mockFindOne);
    sinon.stub(mongoose.Model.prototype, 'save').callsFake(mongooseCallback(book));

    requester = request(server()).keepOpen();
  });

  it('query', async function () {
    const { status, body } = await requester.get('/book');

    sinon.assert.calledOnce(mockFind.skip);
    sinon.assert.calledOnce(mockFind.limit);
    sinon.assert.calledOnce(mockFind.exec);
    sinon.assert.calledOnce(mockFind.countDocuments);

    expect(status).to.equal(200);
    expect(body).to.have.lengthOf(1);
    expect(body).to.deep.include(book);
  });

  it('detail', async function () {
    const { status, body } = await requester.get('/book/id');

    sinon.assert.calledOnce(mockFindOne.exec);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(book);
  });

  it('insert', async function () {
    const { status, body } = await requester.post('/book').send(book);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(book);
  });

  it('update', async function () {
    const { status, body } = await requester.patch('/book/id').send(book);

    sinon.assert.calledOnce(mockFindOne.set);
    sinon.assert.calledOnce(mockFindOne.save);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(book);
  });

  it('remove', async function () {
    const { status, body } = await requester.delete('/book/id');

    sinon.assert.calledOnce(mockFindOne.remove);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(book);
  });

  afterEach(function () {
    dotenv.config.restore();

    mongoose.connect.restore();
    mongoose.Query.prototype.find.restore();
    mongoose.Query.prototype.findOne.restore();
    mongoose.Model.prototype.save.restore();

    requester.close();
  });
});
