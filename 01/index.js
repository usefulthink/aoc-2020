const fs = require("fs");
const chalk = require("chalk");

// find the a) two b) three entries that sum to 2020
// and then multiply those two numbers together.

const numbers = new Set(
  fs.readFileSync("./input.txt", "utf8").split("\n").map(Number)
);

function findEntriesWithSum(target, numEntries = 2) {
  if (numEntries === 1) {
    return numbers.has(target) ? [target] : [];
  }

  for (let n of numbers) {
    const tuple = findEntriesWithSum(target - n, numEntries - 1);

    if (tuple.length !== 0) {
      return [n, ...tuple];
    }
  }

  return [];
}

// part 1
{
  console.log(chalk.bgBlue.black("part 1"));
  const [a, b] = findEntriesWithSum(2020, 2);
  console.log({ a, b });
  console.log(chalk.blue("a * b = "), chalk.green(a * b));
}

// part 2
{
  console.log(chalk.bgBlue.black("part 2"));
  const [a, b, c] = findEntriesWithSum(2020, 3);
  console.log({ a, b, c });
  console.log(chalk.blue("a * b * c ="), chalk.greenBright(a * b * c));
}
