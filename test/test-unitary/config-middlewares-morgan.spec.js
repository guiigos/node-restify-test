const sinon = require('sinon');
const proxyquire = require('proxyquire');

const morgan = sinon.spy();

describe('Config :: Middlewares :: Morgan', function () {
  it('should be config morgan', function () {
    const serverSpies = {
      use: sinon.spy(),
    };

    const config = proxyquire('../../src/config/middlewares/morgan', {
      'morgan': morgan,
    });

    config(serverSpies);

    sinon.assert.calledOnce(morgan);
    sinon.assert.calledWith(morgan, 'dev');
  });
});
