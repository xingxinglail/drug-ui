const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'drug-ui',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'svg'],
        alias: {
            '@drug-ui/core': path.resolve(__dirname, '../packages/drug-ui/src'),
            '@drug-ui/icons': path.resolve(__dirname, '../packages/drug-ui-icons/src')
        }
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
