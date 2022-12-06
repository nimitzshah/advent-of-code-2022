const fs = require('fs')

function cost(letter) {
  const initialCost = letter.charCodeAt(0);
  if(initialCost > 95) {
    return initialCost - 96;
  } else {
    return initialCost - 38;
  }
}

function run() {
  const gifts = fs.readFileSync('./input.txt', 'utf-8');
  const repeats = [];
  

  gifts.split('\n').map((gift) => {
    const leftMap = {};
    console.log(gift);
    const length = gift.length
    gift.slice(0, length/2).split('').forEach((el) => {
      leftMap[el] = 1;
    })
    const repeat = gift.slice(length/2, length).split('').find((el) => {
      return leftMap[el]
    })
    repeats.push(repeat)
  })
  console.log(repeats);
  console.log(repeats.reduce((acc, el) => {
    console.log(el, acc)
    return acc + cost(el)
  }, 0))
}


function run2() {
  const gifts = fs.readFileSync('./input.txt', 'utf-8');
  let leftMap = {};
  const repeats = []
  gifts.split('\n').map((gift, index) => {
    console.log(gift);
    const els = gift.split('')
    for(let el of els) {
      if(leftMap[el] && (leftMap[el] % 3) === (index % 3)){
        leftMap[el] += 1
        if(leftMap[el] === 3){
          repeats.push(el)
          console.log(leftMap)
          leftMap = {};
          console.log('meep ')
          return;
        }
      } else if(leftMap[el] === undefined && index % 3 === 0) {
        leftMap[el] = 1
      }
    }
  })
  console.log(leftMap)
  console.log(repeats);
  console.log(repeats.reduce((acc, el) => {
    console.log(el, acc)
    return acc + cost(el)
  }, 0))
}

run2()