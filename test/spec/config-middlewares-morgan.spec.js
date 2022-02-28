const sinon = require('sinon');
const proxyquire = require('proxyquire');

const morgan = sinon.spy();

describe('Config :: Middlewares :: Mongoose', function () {
  it('should be config morgan', function () {
    const use = sinon.spy();

    const config = proxyquire('../../src/config/middlewares/morgan', {
      morgan,
    });

    config({ use });

    sinon.assert.calledOnce(use);
    sinon.assert.calledOnce(morgan);
    sinon.assert.calledWith(morgan, 'dev');
  });
});
