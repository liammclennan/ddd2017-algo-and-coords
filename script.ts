const fs = require("fs");
const path = require("path");
const Rp = require("request-promise");
const load = require("cheerio").load;
const badWords: string[] = require("./words.json").words;

var startURL = "";

if (process.argv[2]) {
    startURL = process.argv[2];
} else {
    startURL = "https://withouttheloop.com";
}

Rp({
    uri: startURL,
    transform: load
}).then(function ($: any) {
    var bodyText = $.text();
    var badWordsFound = [];

    for (var i = 0; i < badWords.length; i++) {
        var expression = new RegExp(`(\\W|^)${badWords[i]}(\\W|$)`, "i");
        if (expression.test(bodyText)) {
            badWordsFound.push(badWords[i]);
        }
    }

    if (badWordsFound.length === 0) {
        var message = startURL + " has rating A. 1 more required to level up";
        console.log(message);
        return;
    }

    if (badWordsFound.length > 100) {
        var message = startURL + " has rating F. " + 
            ((Number.MAX_SAFE_INTEGER - badWordsFound.length) + 1) + " more required to level up";
        console.log(message);
        if (badWordsFound.length % 2 === 1) {
            fs.writeFile(path.join(__dirname, "/odd.txt"), startURL, "utf8", (err: any) => {
                if (err) {throw err;}
            });
        }
        return;
    }

    if (badWordsFound.length > 30) {
        var message = startURL + " has rating E. " + 
            ((100 - badWordsFound.length) + 1) + " more required to level up";
        console.log(message);
        if (badWordsFound.length % 2 === 1) {
            fs.writeFile(path.join(__dirname, "/odd.txt"), startURL, "utf8", (err: any) => {
                if (err) {throw err;}
            });
        }
        return;
    }

    if (badWordsFound.length > 10) {
        var message = startURL + " has rating D. " + 
            ((30 - badWordsFound.length) + 1) + " more required to level up";
        console.log(message);
        if (badWordsFound.length % 2 === 1) {
            fs.writeFile(path.join(__dirname, "/odd.txt"), startURL, "utf8", (err: any) => {
                if (err) {throw err;}
            });
        }
        return;
    }

    if (badWordsFound.length > 1) {
        var message = startURL + " has rating C. " + 
            ((10 - badWordsFound.length) + 1) + " more required to level up";
        console.log(message);
        if (badWordsFound.length % 2 === 1) {
            fs.writeFile(path.join(__dirname, "/odd.txt"), startURL, "utf8", (err: any) => {
                if (err) {throw err;}
            });
        }
        return;
    }

    if (badWordsFound.length === 1) {
        var message = startURL + " has rating B. 1 more required to level up";
        console.log(message);
        fs.writeFile(path.join(__dirname, "/odd.txt"), startURL, "utf8", (err: any) => {
            if (err) {throw err;}
        });
        return;
    }

}).catch(function (error: any) {
    console.error(error);
});