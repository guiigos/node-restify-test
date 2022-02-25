module.exports = function (...args) {
  return function (callback) {
    callback(undefined, ...args);
  }
};
