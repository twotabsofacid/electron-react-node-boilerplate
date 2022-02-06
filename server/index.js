require('dotenv').config();
const express = require('express');
const http = require('http');
const Socket = require('socket.io');
const { componentExample } = require('./components/component-example');
// Constants
const port = process.env.SERVER_PORT || 6969;

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = Socket();
    this.setup();
    this.addListeners();
    this.start();
  }
  setup() {
    this.app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
  }
  addListeners() {
    this.io.on('connection', componentExample(this.app));
    this.io.attach(this.server, {
      pingTimeout: 30000
    });
  }
  start() {
    console.log('what is our port', port);
    this.server.listen(port, '127.0.0.1', () => {
      console.log(`Start Backend at Port ${port}`);
    });
  }
}

new Server();
