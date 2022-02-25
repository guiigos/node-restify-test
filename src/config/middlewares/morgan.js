const morgan = require('morgan');

module.exports = function (server) {
  server.use(morgan.call(morgan, 'dev'));
};
