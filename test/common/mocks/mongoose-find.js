const sinon = require('sinon');
const callback = require('./mongoose-callback');

module.exports = function (data) {
  return {
    skip: sinon.spy(),
    limit: sinon.spy(),
    exec: sinon.spy(callback([data])),
    countDocuments: sinon.spy(callback(0)),
  };
};
