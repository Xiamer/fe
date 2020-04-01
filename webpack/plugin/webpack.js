const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MergeAtom = require('./plugin/MergeAtom');
const getWxml = require('./config/getWxml');

module.exports = {
  mode: 'development',
  devServer: {
    noInfo: true,
  },
  entry: {
    ...getWxml,
  },
  module: {
    rules: [
      {
        test: /\.wxml$/,
        use: {
          loader: path.resolve(__dirname, './loader/atom.js'),
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new MergeAtom()],
};
