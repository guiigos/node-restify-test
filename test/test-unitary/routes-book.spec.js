const sinon = require('sinon');
const restifyMongoose = require('restify-mongoose');
const BookRoute = require('../../src/routes/book.route');

const restifyMongooseSpies = {
  query: sinon.spy(),
  detail: sinon.spy(),
  insert: sinon.spy(),
  update: sinon.spy(),
  remove: sinon.spy(),
};

describe('Routes :: Book', function () {
  beforeEach(function () {
    sinon.stub(restifyMongoose, 'call').returns(restifyMongooseSpies);
  });

  it('should be instance expected', function () {
    const serverSpies = {
      get: sinon.spy(),
      post: sinon.spy(),
      patch: sinon.spy(),
      del: sinon.spy(),
    };

    BookRoute(serverSpies);

    sinon.assert.calledTwice(serverSpies.get);
    sinon.assert.calledOnce(serverSpies.post);
    sinon.assert.calledOnce(serverSpies.patch);
    sinon.assert.calledOnce(serverSpies.del);

    sinon.assert.calledWith(serverSpies.get, '/book');
    sinon.assert.calledWith(serverSpies.get, '/book/:id');
    sinon.assert.calledWith(serverSpies.post, '/book');
    sinon.assert.calledWith(serverSpies.patch, '/book/:id');
    sinon.assert.calledWith(serverSpies.del, '/book/:id');

    sinon.assert.callOrder(
      serverSpies.get,
      serverSpies.get,
      serverSpies.post,
      serverSpies.patch,
      serverSpies.del,
    );

    sinon.assert.calledOnce(restifyMongooseSpies.query);
    sinon.assert.calledOnce(restifyMongooseSpies.detail);
    sinon.assert.calledOnce(restifyMongooseSpies.insert);
    sinon.assert.calledOnce(restifyMongooseSpies.update);
    sinon.assert.calledOnce(restifyMongooseSpies.remove);

    sinon.assert.callOrder(
      restifyMongooseSpies.query,
      restifyMongooseSpies.detail,
      restifyMongooseSpies.insert,
      restifyMongooseSpies.update,
      restifyMongooseSpies.remove,
    );
  });

  afterEach(function () {
    restifyMongoose.call.restore();
  });
});
