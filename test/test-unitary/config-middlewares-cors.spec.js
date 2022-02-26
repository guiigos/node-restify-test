const sinon = require('sinon');
const proxyquire = require('proxyquire');

const cors = sinon.spy();

describe('Config :: Database :: Cors', function () {
  it('should be config cors', function () {
    const serverSpies = {
      use: sinon.spy(),
    };

    const config = proxyquire('../../src/config/middlewares/cors', {
      'cors': cors,
    });

    config(serverSpies);

    sinon.assert.calledOnce(cors);
  });
});
