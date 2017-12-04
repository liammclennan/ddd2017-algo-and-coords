const stats = require("stats-lite");
const _ = require("underscore");
/*
    Query not depending on computation
    - Standard deviation of test scores
*/
function calculateStdDev(repository: any) {
    const testScores = repository.getScores();
    return stats.stdev(testScores);
}

var repositoryMock = {
    getScores: function() {
        return [34,77,81,3,0,99,101,32,23];
    },

    getPeopleWithScoreAbove: function (score: number) {
        const people = [
            { name: "Bill", score: 44, age: 89 },
            { name: "Anne", score: 83, age: 9 },
            { name: "Jill", score: 90, age: 25 },
            { name: "Poiter", score: 2, age: 44 },
            { name: "Donald", score: 11, age: 99 }
        ];
        return people.filter((p) => p.score > score);
    },

    writeLog: function (message: string) {
        // write to a file, send to a log server or...
        console.log(message);
    }
};

// console.log(calculateStdDev(repositoryMock));

// ====================================================

/*
    Query depending upon computation
    - Youngest person with score above the median
*/
function youngestAboveMedian(repository: any) {
    const median = stats.median(repositoryMock.getScores());
    const aboveMedian = repository.getPeopleWithScoreAbove(median);
    return _.min(aboveMedian, (p: any) => p.age);
}

// console.log(youngestAboveMedian(repositoryMock));

// =================================================

/*
    Output
    - write to log
*/

function youngestAboveMedianWithLogging(repository: any) {
    const median = stats.median(repositoryMock.getScores());
    const aboveMedian = repository.getPeopleWithScoreAbove(median);
    repository.writeLog(`People above median ${JSON.stringify(aboveMedian)}`);
    return _.min(aboveMedian, (p: any) => p.age);
}

// console.log(youngestAboveMedianWithLogging(repositoryMock));

