import * as fs from "fs";

function setupCrates(stacksString: string) {
  const stackArr = stacksString.split("\n");
  const crates: string[][] = [];
  let positions = 0;
  stackArr
    .pop()
    .split(" ")
    .reduce((arr, position) => {
      if (parseInt(position)) {
        positions += 1;
        crates.push([]);
      }
      return arr;
    }, []);

  while (stackArr.length > 0) {
    const stack = stackArr.pop();
    let letterIdx = 1;
    for (let i = 0; i < positions; i++) {
      const crate = stack[letterIdx];
      if (crate !== " ") {
        crates[i].push(stack[letterIdx]);
      }
      letterIdx += 4;
    }
  }

  return crates;
}

function setupDirections(directionString: string) {
  const directionArr: string[] = directionString.split("\n");
  const directions: number[][] = [];
  directionArr.forEach((direction) => {
    directions.push(
      direction.split(" ").reduce((arr, el) => {
        if (parseInt(el)) {
          arr.push(el);
        }
        return arr;
      }, [])
    );
  });

  return directions;
}

function getTopLayer(crates: string[][]) {
  return crates.reduce((acc, crate) => {
    acc += crate.pop();
    return acc;
  }, "");
}

function run() {
  const [stacks, directionString] = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n\n");
  const crates = setupCrates(stacks);
  const directions = setupDirections(directionString);
  directions.forEach((direction) => {
    console.log(crates, direction);
    for (let moves = 0; moves < direction[0]; moves++) {
      crates[direction[2] - 1].push(crates[direction[1] - 1].pop());
    }
  });

  console.log(getTopLayer(crates));
}

function run2() {
  const [stacks, directionString] = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n\n");
  const crates = setupCrates(stacks);
  const directions = setupDirections(directionString);
  directions.forEach((direction) => {
    console.log(crates, direction);
    const tmp: string[] = [];
    for (let moves = 0; moves < direction[0]; moves++) {
      tmp.push(crates[direction[1] - 1].pop());
      crates[direction[2] - 1].push();
    }
    while (tmp.length > 0) {
      crates[direction[2] - 1].push(tmp.pop());
    }
  });
  console.log(crates);

  console.log(getTopLayer(crates));
}

console.log(run2());
