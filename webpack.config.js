const path = require('path')
CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [
                    'react',
                    'babel-preset-env'
                ]
            }
        }],
        loaders: [{
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins : [ 
        new CopyWebpackPlugin([
            { from: './index.html', to: '../public/index.html' },
            { from: './assets', to: '../public/assets' },
            { from: './style', to: '../public/style' }
          ]),
    ]
};