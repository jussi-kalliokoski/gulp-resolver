"use strict";

/*jshint loopfunc:true */

module.exports = function (options) {
    var attributeLocators = options.attributes.map(function (attribute) {
        return new RegExp("(" + attribute + "=['\"])([^'\"]+)['\"]");
    });

    return function (string) {
        var locations = [];
        var index = 0;

        while ( index < string.length ) {
            var tagStart = string.indexOf("<" + options.tag, index);
            var tagEnd = string.indexOf(">", tagStart);

            if ( tagStart === -1 || tagEnd === -1 ) { break; }

            var tagString = string.substring(tagStart, tagEnd + 1);

            attributeLocators.forEach(function (attributeLocator) {
                var attributeStart = tagString.search(attributeLocator);
                if ( attributeStart !== -1 ) {
                    locations.push([
                        tagStart + attributeStart + RegExp.$1.length,
                        tagStart + attributeStart + RegExp.$1.length + RegExp.$2.length - 1
                    ]);
                }
            });

            index = tagEnd;
        }

        return locations;
    };
};
