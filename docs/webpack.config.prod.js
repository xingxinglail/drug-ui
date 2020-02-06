const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = require('./webpack.config');

function resolve (dir) {
    return path.join(__dirname, dir);
}

function getIndexEntry () {
    const entry = {};
    glob.sync(resolve('src/pages/Index.tsx')).forEach(name => {
        entry.index = [resolve('src/App.tsx')];
    });
    return entry;
}

function getEntry (path) {
    const entry = {};
    glob.sync(resolve(path)).forEach(name => {
        const start = name.indexOf('src/') + 4;
        const end = name.length - 3;
        let n = name.slice(start, end).split('/');
        n = n[1] + '/' + n[2];
        entry[n] = [resolve('src/App.tsx')];
    });
    return entry;
}

const indexEntry  = getIndexEntry();
const componentsEntrys = getEntry('src/pages/components/**/Index.ts');
const apiEntrys = getEntry('src/pages/api/**/Index.ts');
const gettingStartedEntrys = getEntry('src/pages/getting-started/**/Index.ts');
const entry = Object.assign({}, indexEntry, componentsEntrys, apiEntrys, gettingStartedEntrys);

module.exports = Object.assign({}, base, {
    mode: 'production',
    entry,
    output: {
        path: resolve('dist'),
        publicPath: '/drug-ui/',
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].[contenthash].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // 哪些块进行优化，"initial"|"all"|"async"(默认) (string function)
            minSize: 30000, // 要生成的块的最小大小，默认30000(30k)
            minChunks: 2, // 分割前必须共享模块的最小块数，默认1
            name: true, // 拆分快的名称，默认true(function true string)
            cacheGroups: {
                // 缓存组，可以继承和/或覆盖任何选项
                // priority: 0,                   // 缓存组的优先级，默认0
                // test: null,                    // 控制此缓存组选择的模块，默认空(function RegExp string)
                // reuseExistingChunk: true,      // 如果当前块包含已从主束拆分的模块，是否重用它。
                vendors: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    name: 'common',
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    // optimization: {
    //     namedChunks: true,
    //     moduleIds: 'hashed',
    //     splitChunks: {
    //         cacheGroups: {
    //             default: {
    //                 name: 'common',
    //                 minChunks: 2,
    //                 chunks: 'initial',
    //                 priority: -20
    //             },
    //             vendors: {  //拆分第三方库（通过npm|yarn安装的库）
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendor',
    //                 chunks: 'initial',
    //                 priority: -10
    //             }
    //         }
    //     }
    // },
    plugins: [
        new CleanWebpackPlugin()
    ]
});

const htmlArray = [];

Object.keys(entry).forEach(element =>{
    htmlArray.push({
        _html: element,
        chunks: ['vendor', 'common', element]
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

if (process.env.NODE_ENV === 'report') {
    module.exports.plugins.push(new BundleAnalyzerPlugin());
}
