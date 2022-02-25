const dotenv = require('dotenv');
const consign = require('consign');

module.exports = function () {
  dotenv.config();

  consign({
    cwd: 'src',
    verbose: false,
  })
    .include('config')
    .then('routes')
    .into(this);
};
