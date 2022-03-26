import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

import { version } from "./package.json";

const config: Configuration = {
    context: path.join(__dirname, "src"),
    entry: {
        "cust0m.js": "./content/index.ts",
        "cust0m.css": "./content/index.scss",
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
            {
                test: /.scss$/,
                use: ["css-loader", "sass-loader"],
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
                    transform: () => version,
                },
            ],
        }),
    ],
};
export default config;
