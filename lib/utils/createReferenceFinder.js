"use strict";

module.exports = function (finders) {
    return function (string) {
        var result = {
            chunks: [],
            links: []
        };

        var locations = finders.reduce(function (locations, finder) {
            return locations.concat(finder.finder(string));
        }, []);

        locations.sort(function (a, b) {
            return a[0] - b[0];
        });

        var index = 0;
        locations.forEach(function (location) {
            result.links.push(string.substring(location[0], location[1] + 1));
            result.chunks.push(string.substring(index, location[0]));
            index = location[1] + 1;
        });
        result.chunks.push(string.substr(index));

        return result;
    };
};
