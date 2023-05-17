//webpack.config.js
import path from 'path';
import {fileURLToPath} from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'production',
    target: 'web',
    devtool: 'source-map',
    entry: {
        index: './src/index.ts',
        'example-style': './examples/style/index.scss',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: ['filteringjs'],
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.(s(a|c)ss)$/,
            use: [/*'style-loader'*/ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
};
