const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: '[name].bundle.js',
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
    })
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
    splitChunks: {
      cacheGroups: {
        three: {
          test: /[\\/]node_modules[\\/]three[\\/]/,
          name: 'vendors-three',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  target: ['web']
};