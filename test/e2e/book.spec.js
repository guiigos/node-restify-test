const sinon = require("sinon");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { random } = require("faker");
const proxyquire = require("proxyquire");
const mock = require("../mocks/connection");

const { expect, request } = global;

const book = {
  title: random.word(),
};

const loader = proxyquire("../../src/loader", {
  "./database/connection": mock
});

const server = proxyquire("../../src/server", {
  "./loader": loader
});

let requester;

describe("Book", function () {
  before(async function () {
    this.timeout(60000);

    sinon.stub(dotenv, "config");

    await mock(); // força a conexão do mongodb-memory-server
    requester = request(server()).keepOpen();
  });
  // before(async function () {
  //   this.timeout(60000);

  //   sinon.stub(dotenv, "config");

  //   console.log("[test] iniciando server");
  //   requester = request(server()).keepOpen();

  //   const conn = mongoose.connection;
  //   console.log("[test] readyState inicial:", conn.readyState);

  //   if (conn.readyState === 1) {
  //     console.log("[test] mongo já conectado");
  //     return;
  //   }

  //   await new Promise((resolve, reject) => {
  //     conn.once("connected", () => {
  //       console.log("[test] evento connected recebido");
  //       resolve();
  //     });

  //     conn.once("error", (err) => {
  //       console.error("[test] evento error recebido:", err);
  //       reject(err);
  //     });

  //     setTimeout(() => {
  //       reject(new Error(`[test] conexão não abriu. readyState=${conn.readyState}`));
  //     }, 15000);
  //   });
  // });

  beforeEach(async function () {
    await new mongoose.models.Book(book).save();
  });

  it("get", async function () {
    const { status, body } = await requester.get(`/book`);

    expect(status).to.equal(200);
    expect(body).to.have.lengthOf(1);
    body.forEach(element => {
      expect(element).to.own.include(book);
    });
  });

  it("get/:id", async function () {
    const { _id } = await mongoose.models.Book.findOne(book);
    const { status, body } = await requester.get(`/book/${_id}`);

    expect(status).to.equal(200);
    expect(body).to.own.include(book);
  });

  it("post", async function () {
    const { status, body } = await requester.post(`/book`).send(book);

    expect(status).to.equal(201);
    expect(body).to.own.include(book);
  });

  it("patch/:id", async function () {
    const mock = {
      title: random.word(),
    };

    const { _id } = await mongoose.models.Book.findOne(book);
    const { status, body } = await requester.patch(`/book/${_id}`).send(mock);

    expect(status).to.equal(200);
    expect(body).to.own.include(mock);
  });

  it("delete/:id", async function () {
    const { _id } = await mongoose.models.Book.findOne(book);
    const { status, body } = await requester.delete(`/book/${_id}`);

    expect(status).to.equal(200);
    expect(body).to.own.include(book);
  });

  afterEach(async function () {
    await mongoose.models.Book.deleteMany({});
  });

  after(async function () {
    await mongoose.connection.close();
    await requester.close();

    dotenv.config.restore();
  });
});
