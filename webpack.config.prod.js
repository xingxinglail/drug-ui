const base = require('./webpack.config');

module.exports = Object.assign({}, base, {
    mode: 'production',
    entry: {
        index: './components/index.tsx'
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
        }
    }
});
