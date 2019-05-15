const socketIO = require('socket.io');
const log = require('../utils/log');

module.exports = class IOServer {
  constructor(app, server) {
    this.io = socketIO(
      server,
      {
        transports: ['polling', 'websocket'],
      },
    );
    this.namespace = {};
    this.handlers = {};
    this.app = app;
  }

  addNamespace(name, typeList) {
    const { namespace, io } = this;
    namespace[name] = io.of(`/${name}`);

    namespace[name].on('connection', (client) => {
      log(`${name} client connected ${client.id}`);

      const ctx = { io: this, client };
      this.callHandler(name, 'connection', ctx);

      typeList.forEach((type) => {
        client.on(type, async (...args) => {
          await this.callHandler(name, type, ctx, ...args);
        });
      });
    });
  }

  use(namespace, type, handler) {
    if (!this.handlers[namespace]) {
      this.handlers[namespace] = {};
    }
    if (!this.handlers[namespace][type]) {
      this.handlers[namespace][type] = [];
    }
    this.handlers[namespace][type].push(handler);
  }

  callHandler(name, type, ctx, ...args) {
    if (
      this.handlers[name] && this.handlers[name][type]
    ) {
      this.handlers[name][type].forEach((handler) => {
        handler.call(this, ctx, ...args);
      });
    }
  }
};
