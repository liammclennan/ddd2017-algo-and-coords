"use strict";
var Rp = require("request-promise");
var load = require("cheerio").load;
var badWords = require('./words.json').words;
var startURL = "";
if (process.argv[2]) {
    startURL = process.argv[2];
}
else {
    startURL = "https://withouttheloop.com";
}
Rp({
    startURL: startURL,
    transform: load
}).then(function ($) {
    var bodyText = $.text();
    var badWordsFound = [];
    for (var i = 0; i < badWords.length; i++) {
        var expression = new RegExp("(\\W|^)" + badWords[i] + "(\\W|$)", "i");
        if (expression.test(bodyText)) {
            badWordsFound.push(badWords[i]);
        }
    }
}).catch(function (error) {
    console.error(error);
});
