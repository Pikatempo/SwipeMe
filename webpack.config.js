const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'), // the bundle output path
    filename: 'bundle.js', // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    // },
    historyApiFallback: true,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(mp4|webm)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: 'url-loader',
        options: { limit: false },
      },
    ],
  },
};
