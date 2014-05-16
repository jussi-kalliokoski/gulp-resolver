"use strict";

var Q = require("q");
var glob = require("glob");

module.exports = Q.denodeify(glob);
