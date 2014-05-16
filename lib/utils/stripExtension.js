"use strict";

module.exports = function (basename, extname) {
    return basename.substr(0, basename.length - extname.length);
};
