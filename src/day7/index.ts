import * as fs from "fs";

class TreeNode {
  value: number;
  parent: TreeNode;
  name: string;
  val: number;
  roots: { [key: string]: TreeNode };

  constructor(name: string, parent?: TreeNode, value?: number) {
    this.value = value;
    this.name = name;
    this.roots = null;
    this.parent = parent;
    this.roots = {};
  }
}

function createTree(lines: string[]) {
  const root = new TreeNode("/", null, 0);
  let currentNode = root;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const items = line.split(" ");
    if (items[0] === "$") {
      if (items[1] === "cd") {
        if (items[2] === "..") {
          currentNode = currentNode.parent;
        } else {
          currentNode = currentNode.roots[items[2]];
        }
      }
    } else {
      // console.log(items);
      if (items[0] === "dir") {
        currentNode.roots[items[1]] = new TreeNode(items[1], currentNode, 0);
      } else {
        // console.log("Setting files", items);
        currentNode.roots[items[1]] = new TreeNode(
          items[1],
          currentNode,
          parseInt(items[0])
        );
      }
    }
  }

  return root;
}

function run() {
  const lines = fs.readFileSync("./input.txt", "utf-8").split("\n");
  const root = createTree(lines);
  const sums: number[] = [];
  function parseTree(root: TreeNode) {
    let sum = 0;
    sum += root.value;
    const keyTotals = Object.keys(root.roots).reduce((total, el) => {
      // console.log(total);
      total += parseTree(root.roots[el]);
      // console.log(total);
      return total;
    }, 0);
    sum += keyTotals;
    if (root.value === 0) {
      sums.push(sum);
      console.log(root.name, sum);
    }
    return sum;
  }
  parseTree(root);

  const max = Math.max(...sums);
  let val = Infinity;
  sums.forEach((sum) => {
    console.log(70000000 + sum - max);
    if (70000000 + sum - max > 30000000 && sum < val) {
      console.log(sum);
      val = sum;
    }
  });
  console.log(val);
  return val;
}

run();
