"use strict";

var path = require("path");
var _ = require("lodash");

var ignoringLeadingSlash = require("./ignoringLeadingSlash");
var stripExtension = require("./stripExtension");

module.exports = ignoringLeadingSlash(function (link, availableFiles) {
    var extname = path.extname(link);
    var basename = stripExtension(path.basename(link), extname);
    var bestMatch = _.find(availableFiles, function (file) {
        return extname === path.extname(file) && path.basename(file).indexOf(basename) !== -1;
    });

    if ( !bestMatch ) {
        return link;
    }

    return bestMatch;
});
