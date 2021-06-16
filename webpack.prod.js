const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { Configuration: WebpackConfiguration } = require("webpack");

/** @type {WebpackConfiguration} */
module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.join(__dirname, "dist"), clean: true, library: {
            type: "umd",
        },
    },
    module: {
        rules: [
            {
                test: /.ts(x)?$/,
                loader: "ts-loader",
                include: path.join(__dirname, "src")
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./{src,test}/**/*.{ts,tsx,js,jsx}"
            }
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
        },
        ReactDOM: {
            commonjs: "react-dom",
            commonjs2: "react-dom",
        },
    },
};