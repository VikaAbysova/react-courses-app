const path = require('path');
const devServerWebpack = {
  static: path.resolve(__dirname, 'src'),
  port: 3000,
  open: true,
  hot: true,
};

module.exports = devServerWebpack;
