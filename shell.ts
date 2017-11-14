import * as Core from "./core";
const Rp = require("request-promise");
const load = require("cheerio").load;

const startURL = process.argv[2] || "https://withouttheloop.com";

Core.find(startURL, URLToBody)
    .then(report)
    .catch(console.error);

function URLToBody(url: string) {
    return Rp({
        url,
        transform: load
    });
}

function report({ rating, toGo, writeFile }: Core.Report) {
    console.log(`${startURL} has rating ${rating}. ${toGo} more required to level up. Write file ${writeFile}`);
}
