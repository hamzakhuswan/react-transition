const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { Configuration: WebpackConfiguration } = require("webpack");

/** @type {WebpackConfiguration} */
module.exports = {
    mode: "development",
    entry: "./test/index.tsx",
    module: {
        rules: [
            {
                test: /.ts(x)?$/,
                loader: "ts-loader",
                include: path.join(__dirname, "./test")
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./test/index.html" }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./{src,test}/**/*.{ts,tsx,js,jsx}"
            }
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "inline-source-map",
    devServer: {
        port: 3000,
    },
};
