"use strict";

var createReferenceFinder = require("../../utils/createReferenceFinder");

module.exports = createReferenceFinder([{
    description: "url functions",
    finder: function (string) {
        var locations = [];

        var index = 0;
        while ( index < string.length ) {
            var substring = string.substr(index);
            var referenceStart = substring.search(/(url\((['"]?))/, index);

            if ( referenceStart === -1 ) { break; }
            referenceStart += index;

            var endCharacter = RegExp.$2 || ")";
            var referenceEnd = string.indexOf(endCharacter, referenceStart + RegExp.$1.length);

            if ( referenceEnd === -1 ) { break; }

            locations.push([
                referenceStart + RegExp.$1.length,
                referenceEnd - 1
            ]);

            index = referenceEnd;
        }

        return locations;
    }
}]);
