const restify = require('restify');
const loader = require('./loader');

module.exports = function () {
  const server = restify.createServer();
  loader.call(server);

  return server;
};
