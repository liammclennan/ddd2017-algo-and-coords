import * as Core from "./core";
import * as Fs from "fs";
import * as Path from "path";
const Rp = require("request-promise");
const load = require("cheerio").load;

const startURL = process.argv[2] || "https://withouttheloop.com";

Core.find(startURL, URLToBody)
    .then(report)
    .then(write)
    .catch(console.error);

function URLToBody(url: string) {
    return Rp({
        url,
        transform: load
    });
}

function report({ rating, toGo, writeFile }: Core.Report) {
    console.log(`${startURL} has rating ${rating}. ${toGo} more required to level up. Write file ${writeFile}`);
    return writeFile;
}

function write(writeFile: boolean) {
    if (writeFile) {
        Fs.writeFile(Path.join(__dirname, "/odd.txt"), startURL, "utf8", (err: any) => {
            if (err) {throw err;}
        });
    }
}