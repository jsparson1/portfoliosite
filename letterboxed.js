

function isValid(ch, s) {
    const unused = new Set();
    for (let i = 0; i < ch.length; i++) {
        for (let j = 0; j < ch[i].length; j++) {
            unused.add(ch[i][j]);
        }
    }

    let r = -1;
    let ind = 0;
    for (let i = 0; i < 4; i++) {
        if (r !== i) {
            for (let j = 0; j < 3; j++) {
                if (ind < s.length) {
                    if (ch[i][j] === s[ind]) {
                        unused.delete(s[ind]);
                        ind++;
                        r = i;
                        i = 0;
                        j = 0;
                    }
                    if (ind < s.length && ch[i][j] === s[ind]) {
                        unused.delete(s[ind]);
                        ind++;
                        r = i;
                        i = 0;
                        j = 0;
                    }
                }
            }
        }
    }

    return unused.size === 0 && ind >= s.length - 1;
}

async function solve(ch) {
    const unused = new Set();
    for (let i = 0; i < ch.length; i++) {
        for (let j = 0; j < ch[i].length; j++) {
            unused.add(ch[i][j]);
        }
    }

    return await getValidWords(ch, unused);
}

async function getValidWords(ch, unused) {
    const validWords = [];
    const dict = await readFileToList(unused);

    for (let i = 0; i < dict.length; i++) {
        if (isValid(ch, dict[i])) {
            validWords.push(dict[i]);
        }
    }

    //console.log(dict.length);

    for (let i = 0; i < dict.length; i++) {
        for (let j = dict.length - 1; j > i; j--) {
            const s1 = dict[i];
            const s2 = dict[j];

            if (s1.length + s2.length >= 13 && s1[s1.length - 1] === s2[0]) {
                const s3 = s1.slice(0, s1.length - 1) + s2;

                if (isValid(ch, s3)) {
                    validWords.push(" " + s1 + "--->" + s2);
                    //validWords.push(s2);
                }
            }
        }
    }
    if (validWords.length == 0) {
        validWords.push("There are no valid 1 or 2 word solutions")
    }
    return validWords;
}

async function readFileToList(unused) {
    try {
        const response = await fetch('lbdict.txt');
        const data = await response.text();
        const fileLines = data.split('\n');
        const lines = [];

        for (const line of fileLines) {
            let isValid = true;

            for (let i = 0; i < line.length; i++) {
                if (!unused.has(line[i])) {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                lines.push(line);
            }
        }
        return lines;
    } catch (err) {
        console.error(err);
        return [];
    }
}
function createHashSetFromString(str) {
    const hashSet = new Set();
    for (let char of str) {
        if (char !== ' ') {
            hashSet.add(char);
        }
    }
    return hashSet;
}

function calculateTotalUniqueCharacters(...strings) {
    let combinedString = '';
    strings.forEach(str => {
        combinedString += str.toLowerCase();
    });

    const hashSet = createHashSetFromString(combinedString);
    return hashSet.size;
}
export async function main(s1, s2, s3, s4) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    s3 = s3.toLowerCase();
    s4 = s4.toLowerCase();
    if (s1.length != 3) {
        return "The first side must be of length 3"
    }
    if (s2.length != 3) {
        return "The second side must be of length 3"
    }
    if (s3.length != 3) {
        return "The third side must be of length 3"
    }
    if (s4.length != 3) {
        return "The fourth side must be of length 3"
    }
    if (calculateTotalUniqueCharacters(s1, s2, s3, s4) != 12) {
        return "There can be no duplicate letters"
    };


    const charList2D = [s1.split(""), s2.split(""), s3.split(""), s4.split("")];
    const ls = await solve(charList2D);
    //console.log(ls);
    return ls
}
//console.log(await main("hec", "ngt", "akz", "iow"));