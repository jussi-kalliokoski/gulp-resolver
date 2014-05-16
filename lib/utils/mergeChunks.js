"use strict";

module.exports = function (options) {
    var lastChunk = options.chunks.pop();
    return options.chunks.map(function (chunk, index) {
        return chunk + options.links[index];
    }).join("") + lastChunk;
};
