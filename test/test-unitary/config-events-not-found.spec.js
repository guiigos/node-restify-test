const sinon = require('sinon');
const event = require('../../src/config/events/404');

describe('Config :: Events :: NotFound', function () {
  it('should be implements not found callback', function () {
    const serverSpies = {
      on: sinon.spy(),
    };

    event(serverSpies);

    const callbackSpy = sinon.spy();
    serverSpies.on.args[0][1](undefined, undefined, undefined, callbackSpy);

    sinon.assert.calledOnce(callbackSpy);
    sinon.assert.calledOnce(serverSpies.on);
    sinon.assert.calledWith(serverSpies.on, 'NotFound');
  });
});
