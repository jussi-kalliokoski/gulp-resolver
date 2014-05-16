# gulp-resolver

[![Build Status](https://travis-ci.org/jussi-kalliokoski/gulp-resolver.png?branch=master)](https://travis-ci.org/jussi-kalliokoski/gulp-resolver)
[![Coverage Status](https://img.shields.io/coveralls/jussi-kalliokoski/gulp-resolver.svg)](https://coveralls.io/r/jussi-kalliokoski/gulp-resolver)

This [gulp](http://gulpjs.com/) plugin provides one of [grunt-usemin](https://github.com/yeoman/grunt-usemin)'s many features for gulp: replacing links in HTML and CSS files to their minified / revved versions.

## Installation

You can install gulp-resolver via npm:

```bash
$ npm install --save-dev gulp-resolver
```

## Usage

Include the plugin:

```javascript
var resolver = require("gulp-resolver");
```

This will give you two functions, `html()` and `css()` to use respectively for what kind of file you're replacing the references in.

## Options

* `assetsDir` (defaults to `.`) a string that determines the path where to seek the replaced references from.

## Examples

```javascript
var resolver = require("gulp-resolver");

gulp.task("html", function () {
    return gulp.src("./assets/index.html")
        .pipe(resolver.html({
            assetsDir: "./assets/"
        }))
        .pipe(gulp.dest("./public/"))
});
```

This will read all the references (`link`, `a`, `script`, `img`, etc., tags) and attempt to resolve those to their modified versions.
