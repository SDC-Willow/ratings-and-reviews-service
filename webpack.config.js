const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client/dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      filename: 'bundle.js.gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      filename: 'bundle.js.br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
