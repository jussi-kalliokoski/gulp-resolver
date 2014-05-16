"use strict";

var createReferenceFinder = require("../../utils/createReferenceFinder");
var createTagFinder = require("./createTagFinder");

module.exports = createReferenceFinder([{
    description: "Script tag",
    finder: createTagFinder({
        tag: "script",
        attributes: ["src"]
    })
}, {
    description: "Link tag",
    finder: createTagFinder({
        tag: "link",
        attributes: ["href"]
    })
}, {
    description: "Image tag",
    finder: createTagFinder({
        tag: "img",
        attributes: ["src"]
    })
}, {
    description: "Video tag",
    finder: createTagFinder({
        tag: "video",
        attributes: ["src", "poster"]
    })
}, {
    description: "Anchor tag",
    finder: createTagFinder({
        tag: "a",
        attributes: ["href"]
    })
}, {
    description: "Meta tag",
    finder: createTagFinder({
        tag: "meta",
        attributes: ["content"]
    })
}]);
