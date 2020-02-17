const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const base = require('./webpack.config');

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

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

const indexEntry = getIndexEntry();
const componentsEntrys = getEntry('src/pages/components/**/Index.ts');
const apiEntrys = getEntry('src/pages/api/**/Index.ts');
const gettingStartedEntrys = getEntry('src/pages/getting-started/**/Index.ts');
const entry = Object.assign({}, indexEntry, componentsEntrys, apiEntrys, gettingStartedEntrys);
const OUTPUT_DIR = 'dist';
module.exports = Object.assign({}, base, {
    mode: 'production',
    entry: {
        app: './src/App.tsx'
    },
    output: {
        publicPath: '/',
        path: resolve('dist'),
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].[contenthash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('./index.html')
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('./static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: resolve('./src/sw.js'),
                to: '',
                ignore: ['.*']
            }
        ]),
        new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, 'dist'),
            // Required - Routes to render.
            routes: Object.keys(entry).reduce((prev, cur) => {
                prev.push(cur === 'index' ? '/' : `/${ cur }`);
                return prev;
            }, []),
            postProcess (renderedRoute) {
                renderedRoute.html = renderedRoute.html.replace(
                    /(<script[^<>]*src=\")((?!http|https)[^<>\"]*)(\"[^<>]*>[^<>]*<\/script>)/ig,
                    `$1/drug-ui$2$3`
                );
                return renderedRoute;
            },
            // renderer: new Renderer({
            //     // Optional - Wait to render until a certain amount of time has passed.
            //     // NOT RECOMMENDED
            //     renderAfterTime: 1500000, // Wait 5 seconds.
            //
            //     // Other puppeteer options.
            //     // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
            //     headless: false // Display the browser window when rendering. Useful for debugging.
            // })
        })
    ]
});

if (process.env.NODE_ENV === 'report') {
    module.exports.plugins.push(new BundleAnalyzerPlugin());
}
