const webpack = require('webpack');
const ip = require('ip');
const ipAddress = ip.address();

let devtoolServer;

class DevtoolPlugin {
  constructor(options = {}) {
    this.port = options.port || 12222;
    this.host = options.host || ipAddress || '127.0.0.1';
  }
  apply(compiler) {
    compiler.hooks.afterPlugins.tap('MegaloDevtoolPlugin', ( compiler ) => {
      compiler.options.plugins.push(
        new webpack.DefinePlugin({
          MEGALO_DEVTOOL_PORT: this.port,
          MEGALO_DEVTOOL_HOST: `'${this.host}'`
        }).apply(compiler)
      );
    });

    compiler.hooks.beforeCompile.tap('MegaloDevtoolPlugin', ( compiler ) => {
      devtoolServer = require('../server').start();
    });
  }
}

module.exports = DevtoolPlugin;