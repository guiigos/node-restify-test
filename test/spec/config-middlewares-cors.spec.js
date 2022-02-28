const sinon = require('sinon');
const proxyquire = require('proxyquire');

const cors = sinon.spy();

describe('Config :: Middlewares :: Cors', function () {
  it('should be config cors', function () {
    const use = sinon.spy();

    const config = proxyquire('../../src/config/middlewares/cors', {
      cors,
    });

    config({ use });

    sinon.assert.calledOnce(use);
    sinon.assert.calledOnce(cors);
  });
});
