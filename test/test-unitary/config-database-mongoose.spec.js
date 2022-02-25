const sinon = require('sinon');
const mongoose = require('mongoose');
const config = require('../../src/config/database/mongoose');

describe('Config :: Database :: Mongoose', function () {
  beforeEach(function () {
    sinon.stub(mongoose, 'connect');
  });

  it('should be open connection', function () {
    config();

    sinon.assert.calledOnce(mongoose.connect);
  });

  afterEach(function () {
    mongoose.connect.restore();
  });
});
