const sinon = require('sinon');
const event = require('../../src/config/events/404');

describe('Config :: Events :: NotFound', function () {
  it('should be implements not found callback', function () {
    const callback = sinon.spy();
    const on = sinon.spy();

    event({ on });

    on.args[0][1](undefined, undefined, undefined, callback);

    sinon.assert.calledOnce(callback);
    sinon.assert.calledOnce(on);
    sinon.assert.calledWith(on, 'NotFound');
  });
});
