const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, base, {
    mode: 'development',
    entry: {
        index: './example/App.tsx'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html',
            title: 'drug-ui'
        })
    ]
});
