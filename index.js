const server = require('./src/server')();

server.listen(Number(process.env.PORT));
