const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LimitChunkCountPlugin } = require('webpack').optimize;

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true
  },
  mode: 'development',
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new LimitChunkCountPlugin({ maxChunks: 1 })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      // ✅ Ensure single Three.js instance
      'three$': path.resolve(__dirname, 'node_modules/three/build/three.module.js'),
      // ✅ Alias examples directory to prevent duplication
      'three/examples/jsm': path.resolve(__dirname, 'node_modules/three/examples/jsm')
    },
    extensions: ['.js']
  },
  optimization: {
    splitChunks: false,       // Disable all chunk splitting
    runtimeChunk: false       // Inline the runtime
  },
  target: ['web']
};