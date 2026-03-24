const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let _ready;

const connection = async function () {
  console.log("[mock] connection() foi chamada");

  _ready = (async () => {
    console.log("[mock] criando MongoMemoryServer");
    const mongod = await MongoMemoryServer.create();

    console.log("[mock] conectando mongoose");
    mongoose.Promise = global.Promise;
    await mongoose.connect(mongod.getUri());
    console.log("[mock] mongoose conectado");
  })();

  await _ready;
};

connection.ready = () => _ready;

module.exports = connection;
