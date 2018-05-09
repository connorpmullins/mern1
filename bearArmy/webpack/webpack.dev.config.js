var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
  entry: [
    path.join(parentDir, 'index.js')
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    },{
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
// tell our webpack where to output our bundle.js
  output: {
    path: parentDir + '/dist',
    filename: 'bundle.js'
  },
// provide options for our dev server
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true
  }
}