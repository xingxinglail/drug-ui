const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config');

module.exports = Object.assign({}, base, {
    mode: 'production',
    entry: {
        index: './src/App.tsx'
    },
    // externals: {
    //     react: {
    //         commonjs: 'react',
    //         commonjs2: 'react',
    //         amd: 'react',
    //         root: 'React'
    //     },
    //     'react-dom': {
    //         commonjs: 'react-dom',
    //         commonjs2: 'react-dom',
    //         amd: 'react-dom',
    //         root: 'ReactDOM'
    //     }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'drug-ui'
        })
    ]
});
