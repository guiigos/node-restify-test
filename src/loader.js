const dotenv = require('dotenv');
const consign = require('consign');
const connection = require('./database/connection');

module.exports = function () {
  dotenv.config();
  connection(this);

  consign({
    cwd: 'src',
    verbose: false,
  })
    .include('config')
    .then('routes')
    .into(this);
};
