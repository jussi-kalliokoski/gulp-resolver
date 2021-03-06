"use strict";

var fs = require("fs");
var path = require("path");
var gulp = require("gulp");

var resolver = require("../../index.js");

var attempt = function (done, callback) {
    return function () {
        try {
            callback.apply(this, arguments);
            done();
        } catch (error) {
            done(error);
        }
    };
};

var verifyBuild = function (type, name, createLink) {
    var options = {};

    options.assetsDir = "./test/e2e/fixtures/" + name + "/";
    if ( createLink ) { options.createLink = createLink; }

    var expected = gulp.src(path.join("./test/e2e/expected", name, "index." + type));
    var actual = gulp.src("./test/e2e/fixtures/" + name + "/index." + type)
        .pipe(resolver[type](options));
    return actual.should.produce.sameFilesAs(expected);
};

var buildVerifier = function (type, name, createLink) {
    return function () {
        return verifyBuild(type, type + "-" + name, createLink);
    };
};

describe("gulp-resolver", function () {
    describe(".html()", function () {
        it("should resolve references to modified javascript files in html", buildVerifier("html", "script-references"));
        it("should resolve references to modified linked files in html", buildVerifier("html", "link-references"));
        it("should resolve references to modified image files in html", buildVerifier("html", "img-references"));
        it("should resolve references to modified video posters and sources in html", buildVerifier("html", "video-references"));
        it("should resolve references to modified anchor-linked files in html", buildVerifier("html", "anchor-references"));
        it("should resolve references to modified meta content files in html", buildVerifier("html", "meta-references"));
        it("should preserve leading slashes in the references", buildVerifier("html", "leading-slash"));
        it("should not add leading slashes to references that don't have it", buildVerifier("html", "no-leading-slash"));
        it("should not modify tags that don't have the specified attributes", buildVerifier("html", "tags-with-no-attributes"));
        it("should not modify unresolved links", buildVerifier("html", "unresolved-references"));
        it("should ignore directories", buildVerifier("html", "ignore-directories"));
    });

    describe(".css()", function () {
        it("should resolve references in url functions in css", buildVerifier("css", "url-functions"));
        it("should preserve leading slashes in the references", buildVerifier("css", "leading-slash"));
        it("should not add leading slashes to references that don't have it", buildVerifier("css", "no-leading-slash"));
        it("should not modify unresolved links", buildVerifier("css", "unresolved-references"));
        it("should not get stuck in case of unclosed url functions", buildVerifier("css", "unclosed-url-functions"));
        it("should understand double-quoted url functions", buildVerifier("css", "double-quoted-url-functions"));
        it("should understand single-quoted url functions", buildVerifier("css", "single-quoted-url-functions"));
        it("should understand non-quoted url functions", buildVerifier("css", "non-quoted-url-functions"));
        it("should ignore fragments in URLs", buildVerifier("css", "fragments-in-urls"));
        it("should handle dots in query parameters", buildVerifier("css", "query-parameters-with-dots-in-urls"));
        it("should empty search query string in URLs", buildVerifier("css", "empty-search-in-urls"));
        it("should preserve relative paths", buildVerifier("css", "relative-path"));
        it("should allow custom link post-processing", buildVerifier("css", "custom-link-processing", function (link) {
            return path.join("/foo/", link.dirname, link.basename.replace(/^c/, "r") + link.extname.replace(/jp/, "pn") +
                link.query.replace(/\d/g, "1") + link.fragment.replace(/o/g, "a"));
        }));
    });
});
