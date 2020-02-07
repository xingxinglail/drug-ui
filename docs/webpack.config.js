const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'svg'],
        alias: {
            '@drug-ui/core': path.resolve(__dirname, '../packages/drug-ui/src'),
            '@drug-ui/styles': path.resolve(__dirname, '../packages/drug-ui-styles/src'),
            '@drug-ui/icons': path.resolve(__dirname, '../packages/drug-ui-icons/src'),
            '@drug-ui/hooks': path.resolve(__dirname, '../packages/drug-ui-hooks/src')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.md$/,
                loader: 'raw-loader',
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    }
};
