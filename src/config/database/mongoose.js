const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(process.env.CONNECTION);
};
