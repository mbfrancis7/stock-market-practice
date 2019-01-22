const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-class-properties"]
              ] 
        }
      },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
      }
      
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  devServer: {
    contentBase: path.join(__dirname, "client/public/"),
    port: 8000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}