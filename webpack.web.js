const path = require("path");
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: __dirname + '/docs/',
    filename: '[name]-[chunkhash].js',
    libraryTarget: 'commonjs2',
    publicPath: '/Order-Remind-List/'
  },
  resolve: {
    alias: {
      Config: __dirname + '/config.json'
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      // 壓縮JS
      new TerserPlugin({
        test: /\.js(x)?(\?.*)?$/i,
        exclude: /node_modules/,
        terserOptions: {
          compress: {
            warnings: false, // 當刪除沒有用處的代碼時，顯示警告
            drop_console: true // 刪除console.*函數
          },
          output: {
            beautify: false, // 是否美化輸出代碼
            comments: false // 保留所有註釋
          }
        }
      }),
      // 壓縮CSS
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/public', to: path.resolve(__dirname, "docs/"), noErrorOnMissing: true }]
    }),
  ],
});