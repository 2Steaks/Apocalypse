const path = require('path');
const webpack = require('webpack');
const packageJosn = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        modules: [path.resolve('./src/js'), 'node_modules'],
        alias: {
            Context: path.resolve(__dirname, './src/js/core/Context.js'),
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    entry: {
        vendor: [
            'jquery',
            'sizzle',
            'vue'
        ],
        apocalypse: './src/js/entry.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'assets/js/[name].bundle.js',
        chunkFilename: 'assets/js/[name].bundle.js'
    },
    module: {
        rules: [{
            enforce: "pre",
            test: /\.(js|vue)$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'runtime']
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
            minChunkSize: 1000
        }),
        new CleanWebpackPlugin('dist/assets'),
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: JSON.stringify(packageJosn.version)
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
} else {
    module.exports.devServer = {
        contentBase: './dist',
        publicPath: '/',
        filename: '[name].bundle.js',
        stats: 'errors-only'
    };
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                DEBUG: true
            }
        })
    ]);
}