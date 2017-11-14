const badWords: string[] = require('./words.json').words;

export interface Report {
    rating: string;
    toGo: number;
    writeFile: boolean;
}

export async function find(
            url: string, 
            URLToBody: (url: string) => any
        ) {
    const $ = await URLToBody(url);
    const badWords = findBadWord($.text());
    return rate(badWords);
}

function findBadWord(text: string) {
    const badWordsFound = badWords.filter((word) => {
        return new RegExp(`(?:\\W|^)(${word})(?:\\W|$)`, "i").test(text)
    });
    return badWordsFound;
}

function rate(words: string[]) : Report {
    const badWordCountIsOdd = words.length % 2 === 1;

    const getGradeAndToGo = (numberOfWords: number) => {
        const ranges = [
            {from: 0, to: 0, rating: "A"},
            {from: 1, to: 1, rating: "B"},
            {from: 2, to: 10, rating: "C"},
            {from: 11, to: 30, rating: "D"},
            {from: 31, to: 100, rating: "E"},
            {from: 101, to: Number.MAX_SAFE_INTEGER, rating: "F"}
        ];
        const range = ranges.find((r) => r.from <= numberOfWords && r.to >= numberOfWords);
        if (!range) { 
            throw new Error(`Number of bad words ${numberOfWords} does not map to a grade`);
        }
        return { rating: range.rating, toGo: (range.to - numberOfWords) + 1 }
    };

    return {
        ...getGradeAndToGo(words.length),
        writeFile: badWordCountIsOdd
    }
}