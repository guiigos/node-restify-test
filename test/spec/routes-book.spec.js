const sinon = require('sinon');
const restifyMongoose = require('restify-mongoose');
const BookRoute = require('../../src/routes/book.route');

const query = sinon.spy();
const detail = sinon.spy();
const insert = sinon.spy();
const update = sinon.spy();
const remove = sinon.spy();

describe('Routes :: Book', function () {
  beforeEach(function () {
    sinon.stub(restifyMongoose, 'call').returns({
      query,
      detail,
      insert,
      update,
      remove,
    });
  });

  it('should be instance expected', function () {
    const get = sinon.spy();
    const post = sinon.spy();
    const patch = sinon.spy();
    const del = sinon.spy();

    BookRoute({
      get,
      post,
      patch,
      del
    });

    sinon.assert.calledTwice(get);
    sinon.assert.calledOnce(post);
    sinon.assert.calledOnce(patch);
    sinon.assert.calledOnce(del);

    sinon.assert.calledWith(get, '/book');
    sinon.assert.calledWith(get, '/book/:id');
    sinon.assert.calledWith(post, '/book');
    sinon.assert.calledWith(patch, '/book/:id');
    sinon.assert.calledWith(del, '/book/:id');

    sinon.assert.callOrder(get, get, post, patch, del);

    sinon.assert.calledOnce(query);
    sinon.assert.calledOnce(detail);
    sinon.assert.calledOnce(insert);
    sinon.assert.calledOnce(update);
    sinon.assert.calledOnce(remove);

    sinon.assert.callOrder(query, detail, insert, update, remove);
  });

  afterEach(function () {
    restifyMongoose.call.restore();
  });
});
