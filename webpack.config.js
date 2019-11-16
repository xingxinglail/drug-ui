const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist/core'),
        library: 'drug-ui',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'svg'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
