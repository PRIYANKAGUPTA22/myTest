var path = require('path');
 var webpack = require('webpack');
//  var APP_DIR = path.resolve(__dirname, './public/src/js');
     
 module.exports = {
     entry: './public/src/js/index.js',
     output: {
         path: path.resolve(__dirname, './public/build'),
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
