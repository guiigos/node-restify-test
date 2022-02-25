const { plugins } = require('restify');

module.exports = function (server) {
  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
};
