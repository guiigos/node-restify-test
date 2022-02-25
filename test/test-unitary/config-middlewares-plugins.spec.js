const sinon = require('sinon');
const restify = require('restify');
const config = require('../../src/config/middlewares/plugins');

describe('Config :: Database :: Plugins', function () {
  beforeEach(function () {
    sinon.stub(restify.plugins, 'queryParser');
    sinon.stub(restify.plugins, 'bodyParser');
  });

  it('should be config plugins', function () {
    const serverSpies = {
      use: sinon.spy(),
    };

    config(serverSpies);

    sinon.assert.calledTwice(serverSpies.use);
    sinon.assert.calledOnce(restify.plugins.queryParser);
    sinon.assert.calledOnce(restify.plugins.bodyParser);
  });

  afterEach(function () {
    restify.plugins.queryParser.restore();
    restify.plugins.bodyParser.restore();
  });
});
