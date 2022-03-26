import { src, dest, parallel, TaskFunction } from "gulp";
import _sass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import typescript from "gulp-typescript";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const sass = gulpSass(_sass);

// content-style
const styleTask = () =>
    src("src/content/index.scss", {})
        // rename first, else output will be in multiple files
        .pipe(rename("cust0m.css"))
        // build sass
        .pipe(sass.sync().on("error", sass.logError))
        // minify
        .pipe(cleanCSS())
        // output
        .pipe(dest("./dist"));

// content-script
const scriptTask = () =>
    src("src/content/index.ts")
        // transpile
        .pipe(typescript())
        // rename
        .pipe(rename("cust0m.js"))
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
