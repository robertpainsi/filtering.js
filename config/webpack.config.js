const path = require('path')
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        'index.ui': './src/index.ui.ts',
        'index.core': './src/index.core.ts',
    },
    output: {
        path: path.resolve(__dirname, '../dist/umd'),
        filename: '[name].js',
        library: 'filteringjs',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [{
            test: /\.ts(x*)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader',
                options: {
                    configFile: 'config/tsconfig.umd.json',
                },
            },
        }],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {source: 'dist/umd/index.ui.js', destination: 'docs/assets/'},
                    ],
                },
            },
        })
    ],
}
