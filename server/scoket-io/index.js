const IOServer = require('./IOServer');
const devHandlers = require('../handlers/dev');
const uiHandlers = require('../handlers/ui');

function install(app, server) {
  const ioserver = new IOServer(app, server);

  ioserver.addNamespace('dev', ['message']);
  ioserver.addNamespace('ui', ['message', 'manualRefresh']);

  ioserver.use('dev', 'message', devHandlers.message);
  ioserver.use('ui', 'manualRefresh', uiHandlers.manualRefresh);

  Object.assign(app, { io: ioserver });
}

module.exports = {
  install,
};
