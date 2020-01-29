const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config');

function resolve (dir) {
    return path.join(__dirname, dir);
}

function getIndexEntry () {
    const entry = {};
    glob.sync(resolve('src/pages/components/install/Install.tsx')).forEach(name => {
        entry.index = [resolve('src/App.tsx')];
    });
    return entry;
}

function getGettingStartedEntry () {
    const entry = {};
    glob.sync(resolve('src/pages/components/gettingStarted/GettingStarted.tsx')).forEach(name => {
        entry['getting-started'] = [resolve('src/App.tsx')];
    });
    return entry;
}

function getEntry (path) {
    const entry = {};
    glob.sync(resolve(path)).forEach(name => {
        const start = name.indexOf('src/') + 4;
        const end = name.length - 3;
        let n = name.slice(start, end).split('/');
        n = n[1].toLowerCase() + '/' + n[2].toLowerCase();
        entry[n] = [resolve('src/App.tsx')];
    });
    return entry;
}

const indexEntry  = getIndexEntry();
const gettingStartedEntry  = getGettingStartedEntry();
const componentsEntrys = getEntry('src/pages/components/**/Index.ts');
const apiEntrys = getEntry('src/pages/api/**/Index.ts');
const entry = Object.assign({}, indexEntry, gettingStartedEntry, componentsEntrys, apiEntrys);

module.exports = Object.assign({}, base, {
    mode: 'production',
    entry,
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[contenthash].js'
    },
    optimization: {
        namedChunks: true,
        moduleIds: 'hashed',
        splitChunks: {
            maxInitialRequests: 5,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    chunks: 'all',
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
});

const htmlArray = [];

Object.keys(entry).forEach(element =>{
    htmlArray.push({
        _html: element,
        chunks: ['commons', element]
    });
});

function getHtmlConfig (name, chunks) {
    return {
        template: resolve(`index.html`),
        filename: `${name}.html`,
        inject: true,
        hash: false,
        chunks
    }
}

//自动生成html模板
htmlArray.forEach(element =>{
    module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
});
