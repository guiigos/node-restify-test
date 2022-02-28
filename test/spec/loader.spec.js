const sinon = require('sinon');
const dotenv = require('dotenv');
const proxyquire = require('proxyquire');

describe('Loader', function () {
  beforeEach(function () {
    sinon.stub(dotenv, 'config');
  });

  it('should be configure service with consign', function () {
    const consign = require('../mocks/consign')();
    const config = proxyquire('../../src/config', {
      consign,
    });

    config();

    sinon.assert.calledOnce(dotenv.config);

    sinon.assert.calledOnce(consign);
    sinon.assert.calledWith(consign, {
      cwd: 'src',
      verbose: false,
    });

    const {
      include,
      then,
      into,
    } = consign.getCall(0).returnValue;

    sinon.assert.calledOnce(include);
    sinon.assert.calledWith(include, 'config');

    sinon.assert.calledOnce(then);
    sinon.assert.calledWith(then, 'routes');

    sinon.assert.calledOnce(into);
  });

  afterEach(function () {
    dotenv.config.restore();
  });
});
