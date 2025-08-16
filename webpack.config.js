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
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'  
    }),
    new LimitChunkCountPlugin({ maxChunks: 1 }),
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
      three: path.resolve(__dirname, 'node_modules/three'),
      'three/examples/jsm': path.resolve(__dirname, 'node_modules/three/examples/jsm')
    },
    extensions: ['.js']
  },
  optimization: {
    splitChunks: false,       // Disable all chunk splitting
    runtimeChunk: false,      // Inline the runtime
    // Prevent duplicate modules
    providedExports: true,
    usedExports: true,
    sideEffects: false
  },
  target: ['web']
};