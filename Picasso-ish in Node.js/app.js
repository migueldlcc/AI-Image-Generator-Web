require('dotenv').config();
const Server = require('./Server/index');
const server = new Server();

server.listen();