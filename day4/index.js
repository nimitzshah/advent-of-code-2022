const fs = require('fs')

function extractPair(pair) {
  const [left, right] = pair.split(',')
  const [leftLower, leftUpper] = left.split('-').map((el) => parseInt(el));
  const [rightLower, rightUpper] = right.split('-').map((el) => parseInt(el));

  return {leftLower, leftUpper,rightLower,rightUpper}
}

function run() {
  const pairs = fs.readFileSync('./input.txt', 'utf-8').split('\n');
  let overlaps = 0;

  pairs.forEach((pair) => {
    const numbers = extractPair(pair)
    const {leftLower, leftUpper, rightLower, rightUpper} = numbers;
    if(leftLower <= rightLower && leftUpper >= rightUpper){
      overlaps += 1
      console.log(numbers)
      return;
    }
    else if(rightLower <= leftLower && rightUpper >= leftUpper){
      overlaps += 1;
      console.log(numbers)
      return;
    }
  })

  console.log(overlaps)
}

function run2() {
  const pairs = fs.readFileSync('./input.txt', 'utf-8').split('\n');
  let overlaps = 0;

  pairs.forEach((pair) => {
    const numbers = extractPair(pair)
    const {leftLower, leftUpper, rightLower, rightUpper} = numbers;
    if(leftLower <= rightLower && leftUpper >= rightLower){
      overlaps += 1
      console.log(numbers)
      return;
    }
    else if(rightLower <= leftLower && rightUpper >= leftLower){
      overlaps += 1;
      console.log(numbers)
      return;
    }
  })

  console.log(overlaps)
}

console.log(run2())

