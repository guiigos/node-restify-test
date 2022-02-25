const sinon = require('sinon');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('../../src/config');

describe('Config', function () {
  beforeEach(function () {
    sinon.stub(dotenv, 'config');
    sinon.stub(mongoose, 'connect');
  });

  it('should be configure service with consign', function () {
    const serverSpies = {
      on: sinon.spy(),
      use: sinon.spy(),
      get: sinon.spy(),
      post: sinon.spy(),
      patch: sinon.spy(),
      del: sinon.spy(),
    };

    config.call(serverSpies);

    sinon.assert.calledOnce(dotenv.config);
    sinon.assert.calledOnce(mongoose.connect);

    sinon.assert.callCount(serverSpies.on, 2);
    sinon.assert.callCount(serverSpies.use, 3);
    sinon.assert.callCount(serverSpies.get, 2);
    sinon.assert.callCount(serverSpies.post, 1);
    sinon.assert.callCount(serverSpies.patch, 1);
    sinon.assert.callCount(serverSpies.del, 1);
  });

  afterEach(function () {
    dotenv.config.restore();
    mongoose.connect.restore();
  });
});
