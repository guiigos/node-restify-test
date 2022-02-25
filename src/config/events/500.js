const INTERNAL_SERVER = 'InternalServer';

module.exports = function (server) {
  server.on(INTERNAL_SERVER, function (req, res, err, cb) {
    return cb();
  });
};
