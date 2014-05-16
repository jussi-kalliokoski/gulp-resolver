"use strict";

var gulp = require("gulp");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");

gulp.task("test", function (callback) {
    gulp.src(["lib/**/*.js", "index.js"])
        .pipe(istanbul())
        .on("finish", function () {
            gulp.src(["test/_setup.js", "test/e2e/spec.js"])
                .pipe(mocha({
                    reporter: "spec"
                }))
                .pipe(istanbul.writeReports())
                .on("end", callback);
        });
});
