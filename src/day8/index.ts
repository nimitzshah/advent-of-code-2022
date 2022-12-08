import * as fs from "fs";

function buildGrid(): number[][][] {
  const lines = fs.readFileSync("./input.txt", "utf-8").split("\n");
  const grid: number[][] = [];
  const emptyGrid: number[][] = [];
  lines.forEach((line) => {
    const gridLine: number[] = [];
    const emptyGridLine: number[] = [];
    line.split("").forEach((el) => {
      gridLine.push(parseInt(el));
      emptyGridLine.push(0);
    });
    grid.push(gridLine);
    emptyGrid.push(emptyGridLine);
  });
  return [grid, emptyGrid];
}

function run() {
  const [grid, emptyGrid] = buildGrid();
  const columnLength = grid[0].length;

  function updateGrid(i: number, j: number, type: string) {
    if (type === "row") {
      emptyGrid[i][j] += 1;
    } else {
      emptyGrid[j][i] += 1;
    }
  }

  function checkLine(line: number[], index: number, type: string) {
    // Left
    let maxLeft = -1;
    for (let j = 0; j < line.length; j++) {
      const prev = line[j - 1] === undefined ? -1 : line[j - 1];
      const el = line[j];
      console.log("checking", el, prev, maxLeft);
      if (el > prev && el > maxLeft) {
        updateGrid(index, j, type);
        maxLeft = el;
      }
    }

    // Right
    let maxRight = -1;
    for (let j = line.length - 1; j >= 0; j--) {
      const prev = line[j + 1] === undefined ? -1 : line[j + 1];
      const el = line[j];
      if (el > prev && el > maxRight) {
        updateGrid(index, j, type);
        maxRight = el;
      }
    }
  }

  function getTotalVisible(): number {
    let total = 0;
    for (let i = 0; i < emptyGrid.length; i++) {
      for (let j = 0; j < columnLength; j++) {
        if (emptyGrid[i][j] > 0) {
          total += 1;
          console.log(i, j, emptyGrid[i][j], total);
        }
      }
    }
    return total;
  }

  // Rows
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    checkLine(line, i, "row");
  }

  // Columns
  for (let i = 0; i < columnLength; i++) {
    const line: number[] = [];
    for (let j = 0; j < grid.length; j++) {
      line.push(grid[j][i]);
    }
    console.log("line", line);
    checkLine(line, i, "col");
    console.log("empty Grid", emptyGrid);
  }

  console.log(getTotalVisible());
}

run();
