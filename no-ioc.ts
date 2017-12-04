const stats = require("stats-lite");
const _ = require("underscore");

/*
    Query not depending on computation
    - Standard deviation of test scores
*/
function calculateStdDev(testScores: number[]) {
    return stats.stdev(testScores);
}

// console.log(calculateStdDev([34,77,81,3,0,99,101,32,23]));

// ====================================================

/*
    Query depending upon computation
    - Youngest person with score above the median
*/
function youngestAboveMedian(testScores: number[], getPeopleWithScoreAbove: any) {
    const median = stats.median(testScores);
    const aboveMedian = getPeopleWithScoreAbove(median);
    return _.min(aboveMedian, (p: any) => p.age);
}

// console.log(youngestAboveMedian([34,77,81,3,0,99,101,32,23], (score: number) => {
//     const people = [
//         { name: "Bill", score: 44, age: 89 },
//         { name: "Anne", score: 83, age: 9 },
//         { name: "Jill", score: 90, age: 25 },
//         { name: "Poiter", score: 2, age: 44 },
//         { name: "Donald", score: 11, age: 99 }
//     ];
//     return people.filter((p) => p.score > score);
// }));


// =================================================

/*
    Output
    - write to log
*/

function youngestAboveMedianWithLogging(testScores: number[], getPeopleWithScoreAbove: any) {
    const median = stats.median(testScores);
    const aboveMedian = getPeopleWithScoreAbove(median);
    return {
        person: _.min(aboveMedian, (p: any) => p.age),
        log: `People above median ${JSON.stringify(aboveMedian)}` 
    };
}

// console.log(youngestAboveMedianWithLogging([34,77,81,3,0,99,101,32,23], (score: number) => {
//     const people = [
//         { name: "Bill", score: 44, age: 89 },
//         { name: "Anne", score: 83, age: 9 },
//         { name: "Jill", score: 90, age: 25 },
//         { name: "Poiter", score: 2, age: 44 },
//         { name: "Donald", score: 11, age: 99 }
//     ];
//     return people.filter((p) => p.score > score);
// }));
