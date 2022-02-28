const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function () {
  const mongod = await MongoMemoryServer.create();

  mongoose.Promise = global.Promise;
  mongoose.connect(mongod.getUri());
  mongoose.connection.setMaxListeners(1);

  mongoose.connection.on('disconnected', async function () {
    await mongod.stop();
  });

  mongoose.connection.on('close', function () {
    mongoose.connection.removeAllListeners();
  });
};
