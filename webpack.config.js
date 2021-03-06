const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
 entry: { main: './src/pages/index.js' },
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'index.js',
  publicPath: '',
 },
 devServer: {
  static: {
   directory: path.join(__dirname, './dist'),
  },
  compress: true,
  port: 8080,
  open: true,
 },
 module: {
  rules: [
   {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: '/node_modules/',
   },
   {
    test: /\.css$/,
    use: [
     MiniCssExtractPlugin.loader,
     {
      loader: 'css-loader',
      options: {
       importLoaders: 1,
      },
     },
     'postcss-loader',
    ],
   },
   {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    type: 'asset/resource',
    generator: {
     filename: 'images/[hash][ext][query]',
    },
   },
   {
    test: /\.(woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
     filename: 'fonts/[hash][ext][query]',
    },
   },
  ],
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: './src/index.html',
  }),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
 ],
};
