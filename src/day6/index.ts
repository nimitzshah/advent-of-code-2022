import * as fs from "fs";

function runDay6() {
  const deviceStr = fs.readFileSync("./input.txt", "utf-8").split("");
  const map: { [key: string]: number } = {};
  const letters = [];
  let idx = 0;
  while (Object.keys(map).length < 14 && idx < deviceStr.length) {
    const letter = deviceStr[idx];
    // Adding
    if (map[letter]) {
      map[letter] += 1;
    } else {
      map[letter] = 1;
    }
    letters.push(letter);

    // Removing
    if (letters.length === 15) {
      const poppedLetter = letters.shift();
      map[poppedLetter] -= 1;
      if (map[poppedLetter] === 0) {
        delete map[poppedLetter];
      }
    }
    console.log(letter, map, letters);
    idx += 1;
  }

  console.log(idx);
}

console.log(runDay6());
