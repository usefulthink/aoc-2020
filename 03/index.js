const fs = require("fs");
const chalk = require("chalk");

const lines = fs.readFileSync(`${__dirname}/input.txt`, "utf-8").split("\n");
const data = lines.map((line) => line.split(""));

function countTrees(stepY, stepX) {
  let x = 0;
  let treeCount = 0;
  for (let y = 0; y < data.length; y += stepY) {
    if (data[y][x] === "#") {
      treeCount++;
    }

    x = (x + stepX) % data[y].length;
  }
  return treeCount;
}

// part 1
{
  console.log(chalk.bgBlue.underline.black("part 1"));
  console.log(chalk`{blue number of trees:} {green ${countTrees(1, 3)}}`);
}

// part 2
{
  console.log(chalk.bgBlue.underline.black("part 2"));
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const numTrees = slopes.map(([x, y]) => countTrees(y, x));

  console.log(chalk`{blue number of trees:} {green ${numTrees}}`);
  console.log(
    chalk`{blue product:} {green ${numTrees.reduce((p, v) => p * v)}}`
  );
}
