const sinon = require('sinon');
const callback = require('./mongoose-callback');

module.exports = function (data) {
  const model = {
    set: sinon.spy(),
    save: sinon.spy(callback(data)),
    remove: sinon.spy(callback(data)),
  };

  model.exec = sinon.spy(
    callback({
    ...data,
    ...model,
    })
  );

  return model;
};
