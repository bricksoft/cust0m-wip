import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

import { version } from "./package.json";

const config: Configuration = {
    devtool: "cheap-module-source-map",
    context: path.join(__dirname, "src"),
    entry: {
        "cust0m.js": "./content/cust0m.ts",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]",
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: "ts-loader",
                exclude: "/node_modules/",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "../assets",
                    to: "assets",
                },
                {
                    from: "manifest.json",
                    to: "version.txt",
                    transform: () => {
                        return version;
                    },
                },
            ],
        }),
    ],
};
export default config;
