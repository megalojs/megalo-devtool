import io from 'socket.io-client';

export default class IOClient {
  constructor(url, store) {
    this.url = url;
    this.store = store;
    this.socket = io(
      url,
      {
        transports: ['websocket'],
      },
    );

    this.socket
      .on('connect', () => {
        console.log(`connected to ${url}`);
      })
      .on('disconnect', () => {
        console.log(`disconnect to ${url}`);
      });
  }

  use(eventName, callback) {
    const { store, socket } = this;
    socket.on(eventName, async (data) => {
      await callback.call(this, data, store);
    });
    return this;
  }

  applyApi(apis) {
    Object.keys(apis).forEach((name) => {
      if (IOClient.prototype[name]) {
        console.warn(`duplicated api name ${name}`);
      }
      IOClient.prototype[name] = async (...args) => {
        const res = await apis[name].call(this, ...args);
        return res;
      };
    });
    return this;
  }
}
