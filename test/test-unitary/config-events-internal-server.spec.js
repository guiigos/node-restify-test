const sinon = require('sinon');
const event = require('../../src/config/events/500');

describe('Config :: Events :: InternalServer', function () {
  it('should be implements internal server callback', function () {
    const serverSpies = {
      on: sinon.spy(),
    };

    event(serverSpies);

    const callbackSpy = sinon.spy();
    serverSpies.on.args[0][1](undefined, undefined, undefined, callbackSpy);

    sinon.assert.calledOnce(callbackSpy);
    sinon.assert.calledOnce(serverSpies.on);
    sinon.assert.calledWith(serverSpies.on, 'InternalServer');
  });
});
