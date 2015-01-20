"use strict";

var through = require("through2");
var _ = require("lodash");

var globQ = require("./globQ");
var resolve = require("./resolve");
var mergeChunks = require("./mergeChunks");
var defaultCreateLink = require("./defaultCreateLink");

module.exports = function (findReferences) {
    return function Stream (options) {
        options = _.extend({
            assetsDir: ".",
            createLink: defaultCreateLink,
        }, options);

        var availableFiles = globQ("**/*", {
            cwd: options.assetsDir
        });

        var process = function (file, encoding, callback) {
            var self = this;
            var content = findReferences(file.contents.toString());

            availableFiles.then(function (files) {
                content.links = content.links.map(function (link) {
                    return options.createLink(resolve(link, files));
                });

                var replacedContent = mergeChunks(content);
                file.contents = new Buffer(replacedContent);
                self.push(file);
                callback();
            }).catch(this.emit.bind(this, "error"));
        };

        return through.obj(process);
    };
};
