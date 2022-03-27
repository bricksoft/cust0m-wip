import { mkdir, writeFile } from "fs/promises";
import { dest, parallel, src, TaskFunction } from "gulp";
import cleanCSS from "gulp-clean-css";
import gulpSass from "gulp-sass";
import typescript from "gulp-typescript";
import uglify from "gulp-uglify-es";
import path from "path";
import _sass from "sass";

import webpackConfig from "./webpack-cust0m.config";
import webpack from "webpack-stream";

const sass = gulpSass(_sass);

// content-style
const styleTask = () =>
    src("src/content/cust0m.scss", {})
        // build sass
        .pipe(sass.sync().on("error", sass.logError))
        // minify
        .pipe(cleanCSS())
        // output
        .pipe(dest("./dist"));

// content-script
const scriptTask = () =>
    src("src/content/cust0m.ts")
        // transpile
        .pipe(
            webpack({
                ...webpackConfig,
                mode: (process.env.NODE_ENV || "production") as
                    | "development"
                    | "production",
            })
        )
        // output
        .pipe(dest("./dist"));

// assets (images)
const assetsTask = () =>
    src("assets/*")
        // output
        .pipe(dest("./dist/assets"));

// version.txt
const versionTask: TaskFunction = async (cb) => {
    const distDir = path.join(__dirname, "dist");
    const { version } = await import("./package.json");
    try {
        await mkdir(distDir, { recursive: true });
        await writeFile(path.join(distDir, "version.txt"), version);

        cb();
    } catch (error: any) {
        cb(error);
    }
};

export default parallel(styleTask, scriptTask, assetsTask, versionTask);
