import { src, dest, parallel } from "gulp";
import _sass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import typescript from "gulp-typescript";

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

export default parallel(styleTask, scriptTask, assetsTask);
