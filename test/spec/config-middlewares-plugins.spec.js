const sinon = require('sinon');
const restify = require('restify');
const config = require('../../src/config/middlewares/plugins');

describe('Config :: Middlewares :: Plugins', function () {
  beforeEach(function () {
    sinon.stub(restify.plugins, 'queryParser');
    sinon.stub(restify.plugins, 'bodyParser');
  });

  it('should be config plugins', function () {
    const use = sinon.spy();

    config({ use });

    sinon.assert.calledTwice(use);
    sinon.assert.calledOnce(restify.plugins.queryParser);
    sinon.assert.calledOnce(restify.plugins.bodyParser);
  });

  afterEach(function () {
    restify.plugins.queryParser.restore();
    restify.plugins.bodyParser.restore();
  });
});
