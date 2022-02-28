const sinon = require('sinon');
const mongoose = require('mongoose');
const db = require('../../src/database/connection');

describe('Database :: Connection', function () {
  beforeEach(function () {
    sinon.stub(mongoose, 'connect');
  });

  it('should be open connection', function () {
    db();

    sinon.assert.calledOnce(mongoose.connect);
  });

  afterEach(function () {
    mongoose.connect.restore();
  });
});
