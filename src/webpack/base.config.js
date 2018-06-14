module.exports = {
    entry : [
        'babel-polyfill',
        './src/index.js'
    ],
    module : {
        rules : [
            {
            exclude : /node_modules/,
            loader  : 'babel-loader',
            query   : { 
                presets : [
                    'react',
                    'babel-preset-env'
                ] 
            }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};