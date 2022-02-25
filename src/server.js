const restify = require('restify');
const config = require('./config');

module.exports = function () {
  const server = restify.createServer();
  config.call(server);

  return server;
};
