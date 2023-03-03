//webpack.config.js
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "production",
    target: "web",
    // devtool: "inline-source-map",
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "index.js",
        libraryTarget: "umd",
        globalObject: "this",
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    }
};
