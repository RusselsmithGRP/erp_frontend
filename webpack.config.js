const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: './style.css'
});
const Dotenv = require('dotenv-webpack');
 

module.exports = {
    entry: "./index.js",
    mode: 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
      },
    output: {
        // CHANGED LINE        
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
        contentBase: path.resolve(__dirname, 'public/assets'),
        stats: 'errors-only',
        open: true,
        port: 8080,
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        extractPlugin,
        new Dotenv(),
    ],
    module: {
        rules: [{
            test: /\.(jpeg|jpg|png|gif|svg)$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './assets/',
                }
            }]
        },
        {
        test: /\.(scss|css)$/,
            use: extractPlugin.extract({
             use: ["css-loader", "sass-loader", "postcss-loader"],
             fallback: 'style-loader'
            })
        },
        {
         test: /\.(js|jsx)$/,
         exclude: /(node_modules|bower_components)/,
         use: {
          loader: 'babel-loader',
          options: {
           presets: ['@babel/preset-env', "@babel/react"],
           plugins: ['@babel/proposal-class-properties']
          }
         }
        }]
    }
}
