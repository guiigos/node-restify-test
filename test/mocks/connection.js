const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let _ready;

const connection = async function () {
  _ready = (async () => {
    const mongod = await MongoMemoryServer.create();

    mongoose.Promise = global.Promise;
    await mongoose.connect(mongod.getUri());

    mongoose.connection.on("disconnected", async function () {
      await mongod.stop();
    });

    mongoose.connection.on("close", function () {
      mongoose.connection.removeAllListeners();
    });
  })();

  await _ready;
};

connection.ready = () => _ready;

module.exports = connection;
