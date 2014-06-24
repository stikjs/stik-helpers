var gulp = require("gulp"),
    jasmine = require("gulp-jasmine"),
    header = require("gulp-header"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    pkg = require("./package.json");

var d = new Date();
var releaseDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()

var banner = "// Stik-helpers - Version: <%= pkg.version %> | From: <%= date %>\n";

gulp.task("test", function(){
  gulp.src("specs/*_spec.js")
      .pipe(jasmine());
});

var fileStack = [
  "src/helpers.js",
  "src/utils.js"
];

gulp.task("pack", function(){
  gulp.src(fileStack)
      .pipe(concat("stik-helpers.js"))
      .pipe(header(banner, { pkg: pkg, date: releaseDate }))
      .pipe(gulp.dest("dist"))
      .pipe(concat("stik-helpers.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("dist"));
});
