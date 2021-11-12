"use strict";

const {
	src,
	dest,
	parallel,
	watch
} = pkg;
import pkg from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import server from "browser-sync";
import scss from "gulp-dart-sass";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
import newer from "gulp-newer";
import minify from "gulp-jsmin";
import sourcemaps from "gulp-sourcemaps";

const pugfiles = () => {
	return src("src/*.pug")
		.pipe(plumber())
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(dest("./dist"));
};
const serve = () => {
	server.init({
		server: {
			baseDir: "./dist"
		},
		notify: false,
		online: true,
	});
};
const styles = () => {
	return src("src/scss/*.scss")
		.pipe(sourcemaps.init())
		.pipe(scss({
			otputeStyle: "compressed"
		}).on("error", scss.logError))
		// .pipe(autoprefixer())
		.pipe(concat("style.min.css"))
		.pipe(sourcemaps.write("../maps"))
		.pipe(dest("dist/css"))
		.pipe(server.stream());
};
const scripts = () => {
	return src("src/js/*.js")
		.pipe(plumber())
		.pipe(concat("app.min.js"))
		.pipe(minify())
		.pipe(dest("dist/js"));
};
const images = () => {
	return src("src/img/**/*")
		.pipe(newer("dist/img/"))
		.pipe(imagemin())
		.pipe(webp())
		.pipe(dest("dist/img"));
};
const watcher = () => {
	watch("src/**/*.pug", pugfiles).on("change", server.reload);
	watch("src/**/*.scss", styles);
	watch(["src/js/**/*.js", "!src/js/**/*.min.js"], scripts).on(
		"change",
		server.reload
	);
	watch("src/images/**/*", images);
};
export default parallel(pugfiles, serve, watcher, styles, scripts, images);