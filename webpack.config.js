const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'drug-ui',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};
