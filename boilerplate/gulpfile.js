var fs = require("fs");
var browserify = require("browserify");
var gulp = require("gulp");
var sass = require("gulp-sass");

const path = {
  MINIFIED_OUT: "static/build.min.js",
  ENTRY_POINT: "./client/index.js"
};

gulp.task("react", function(done) {
  browserify(path.ENTRY_POINT)
    .transform("babelify", { presets: ["env", "react"] })
    .bundle()
    .pipe(fs.createWriteStream(path.MINIFIED_OUT));
  done();
});

gulp.task("sass", function() {
  return gulp
    .src("./client/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./static/css"));
});

gulp.task("build", gulp.series("sass", "react"));
