const sinon = require('sinon');

module.exports = function () {
  function Consign() {
    return this;
  }

  Consign.prototype.include = sinon.spy(function () {
    return this;
  });

  Consign.prototype.exclude = sinon.spy(function () {
    return this;
  });

  Consign.prototype.then = sinon.spy(function () {
    return this;
  });

  Consign.prototype.into = sinon.spy(function () {
    return this;
  });

  return sinon.spy(function () {
    return new Consign();
  });
};
