import * as Core from "./core";
import * as Assert from "assert";
const load = require("cheerio").load;

/*
Feature: Rate the offensiveness of a web page's language
    In order to prequalify the offensiveness of a web page's language
    I want to calculate a rating for the web page
    And report how many more bad words are required to reach the next grade
    And save the url in a text file if the number of bad words found is odd
*/

var web: { [index:string]: string } = 
{
    "http://cleanwebpage.madeupdomain":     `<html><body>There are no 
                                            bad words in this content.</body></html>`,
    "http://abitdodgy.madeupdomain":        `<html><body>flipping the bird 
                                            bad words in this masochist fart.</body></html>`
};

function URLToBody(url: string) {
    return Promise.resolve(load(web[url]));
}

[
    /*
        Scenario: Clean web page
            Given a url for a web page that contains no bad words
            When rating the page
            Then the rating should be A
            And toGo should be 1
            And odd.txt should not be written
    */
    async function cleanPage() {
        const report = await Core.find("http://cleanwebpage.madeupdomain", URLToBody);
        Assert.deepEqual(report, { rating: 'A', toGo: 1, writeFile: false });
    },

    /*
    Scenario: Slightly dodgy web page
        Given a url for a web page that contains a small odd number of bad words
        When rating the page
        Then the rating should be A
        And toGo should be 1
        And odd.txt should not be written
    */
    async function slightlyDodgyPage() {
        const report = await Core.find("http://abitdodgy.madeupdomain", URLToBody);
        Assert.deepEqual(report, { rating: 'C', toGo: 8, writeFile: true });
    },
    
    /*
    Scenario: Utterly filthy web page
        Given a url for a web page that contains a preponderance of bad words
        When rating the page
        Then the rating should be F
    */
    // TODO
].forEach(async (f) => { await f(); });
