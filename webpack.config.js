const path = require('path');

module.exports = function (env) {
  return {
    mode: env === 'dev' ? 'dev' : 'production',
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'piepe',
      libraryTarget: 'umd',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
          { test: /\.ts$/, loader: 'ts-loader', include: [__dirname] }
      ]
    }
  };
};