"use strict";

var path = require("path");
var _ = require("lodash");

var stripExtension = require("./stripExtension");

module.exports = function (link, availableFiles) {
    var extname = path.extname(link);
    var basename = stripExtension(path.basename(link), extname);
    var prefix = link.substr(0, link.length - path.basename(link).length);

    // strip fragment
    extname = extname.replace(/(\??(?:#.*)?)$/, "");
    var fragment = RegExp.$1;

    var bestMatch = _.find(availableFiles, function (file) {
        return extname === path.extname(file) && path.basename(file).indexOf(basename) !== -1;
    });

    if ( !bestMatch ) {
        return link;
    }

    return prefix + path.basename(bestMatch) + fragment;
};
