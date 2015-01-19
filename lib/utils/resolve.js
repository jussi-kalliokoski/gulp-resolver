"use strict";

var path = require("path");
var _ = require("lodash");

var stripExtension = require("./stripExtension");

module.exports = function (link, availableFiles) {
    // strip fragment
    var linkName = link.replace(/([?#].*)?$/, "");
    var fragment = RegExp.$1;
    var extname = path.extname(linkName);
    var basename = stripExtension(path.basename(linkName), extname);
    var prefix = linkName.substr(0, linkName.length - path.basename(linkName).length);

    if ( !basename ) {
        return link;
    }

    var bestMatch = _.find(availableFiles, function (file) {
        return extname === path.extname(file) && path.basename(file).indexOf(basename) !== -1;
    });

    if ( !bestMatch ) {
        return link;
    }

    return prefix + path.basename(bestMatch) + fragment;
};
