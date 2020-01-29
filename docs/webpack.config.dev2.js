const path = require('path');
const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, base, {
    mode: 'development',
    entry: {
        index: './src/App.tsx'
    },
    output: {
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'drug-ui'
        })
    ]
});
