const NOT_FOUND = 'NotFound';

module.exports = function (server) {
  server.on(NOT_FOUND, function (req, res, err, cb) {
    return cb();
  });
};
