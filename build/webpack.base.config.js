const path = require('path');
const fs = require("fs");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};

// const PAGES_DIR = PATHS.src;
// const PAGES = fs
//     .readdirSync(PAGES_DIR)
//     .filter(fileName => fileName.endsWith(".html"));
const PAGES = fs.readdirSync(PATHS.src).filter(fileName => fileName.endsWith('.html'))


module.exports = {

    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    // devServer: {
    //     overlay: true
    // },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: "vue-style-loader!css-loader!sass-loader"
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    }, {
                        loader: "postcss-loader",
                        options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),

        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: '', },
        ]),
        // ...PAGES.map(
        //     page =>
        //     new HtmlWebpackPlugin({
        //         template: `${PAGES_DIR}/${page}`,
        //         filename: `./${page}`
        //     })
        // )
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PATHS.src}/${page}`,
            filename: `./${page}`
        })),
    ]
};