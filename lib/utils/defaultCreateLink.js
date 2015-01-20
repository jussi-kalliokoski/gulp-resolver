"use strict";

module.exports = function defaultCreateLink (options) {
    if ( !options.basename ) { return options.original; }

    return options.originalDirname + options.basename + options.extname + options.query + options.fragment;
};
