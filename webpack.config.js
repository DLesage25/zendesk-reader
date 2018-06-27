module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: __dirname,
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
                // loader: 'json'
                loader: 'json-loader' // Change this
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
    }
};