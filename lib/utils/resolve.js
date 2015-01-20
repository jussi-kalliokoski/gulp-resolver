"use strict";

var path = require("path");
var _ = require("lodash");

var stripExtension = require("./stripExtension");

module.exports = function (link, availableFiles) {
    // strip query and fragment
    var linkName = link.replace(/(\?[^#]*)?(#.*)?$/, "");
    var query = RegExp.$1;
    var fragment = RegExp.$2;
    var extname = path.extname(linkName);
    var basename = stripExtension(path.basename(linkName), extname);
    var dirname = linkName.substr(0, linkName.length - basename.length - extname.length - query.length - fragment.length);

    var result = {
        original: link,
        originalDirname: dirname,
        originalBasename: basename,
        originalExtname: extname,
        query: query,
        fragment: fragment,
    };

    if ( !basename ) {
        return result;
    }

    var bestMatch = _.find(availableFiles, function (file) {
        return extname === path.extname(file) && path.basename(file).indexOf(basename) !== -1;
    });

    if ( !bestMatch ) {
        return result;
    }

    result.dirname = path.dirname(bestMatch);
    result.extname = path.extname(bestMatch);
    result.basename = stripExtension(path.basename(bestMatch), result.extname);

    return result;
};
