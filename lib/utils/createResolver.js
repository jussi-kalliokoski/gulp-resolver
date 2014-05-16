"use strict";

var through = require("through2");
var _ = require("lodash");

var globQ = require("./globQ");
var resolve = require("./resolve");
var mergeChunks = require("./mergeChunks");

module.exports = function (findReferences) {
    return function Stream (options) {
        options = _.extend({
            assetsDir: "."
        }, options);

        var availableFiles = globQ("**/*", {
            cwd: options.assetsDir
        });

        var process = function (file, encoding, callback) {
            var self = this;
            var content = findReferences(file.contents.toString());

            availableFiles.then(function (files) {
                content.links = content.links.map(function (link) {
                    return resolve(link, files);
                });

                var replacedContent = mergeChunks(content);
                file.contents = new Buffer(replacedContent);
                self.push(file);
                callback();
            });
        };

        return through.obj(process);
    };
};
