module.exports = {
  outputDir: '../server/public',
  devServer: {
    proxy: 'http://localhost:12222',
  },
};
