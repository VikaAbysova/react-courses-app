const path = require('path');
const resolveWebpack = {
  extensions: ['.js', '.jsx'],
  alias: {
    root: __dirname,
    src: path.resolve(__dirname, 'src'),
  },
};

module.exports = resolveWebpack;