"use strict";

module.exports = function (callback) {
    return function (link) {
        var args = [].slice.call(arguments);
        var hasLeadingSlash = link[0] === "/";

        if ( hasLeadingSlash ) {
            link = link.substr(1);
        }

        args[0] = link;
        link = callback.apply(null, args);

        if ( hasLeadingSlash ) {
            link = "/" + link;
        }

        return link;
    };
};
