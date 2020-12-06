const chalk = require('chalk');
const fs = require('fs');

// originally just hacked into the browser console

const data = await (
  await fetch('https://adventofcode.com/2020/day/5/input')
).text();

const data = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const seatIds = await (await fetch('https://adventofcode.com/2020/day/5/input'))
  .text()
  .trim()
  .replace(/([LF])|./g, (_, z) => +!!z)
  .split('\n')
  .map(s => +('0b' + s));
console.log(Math.max(...seatIds));
console.log(
  [...Array(Math.max(...seatIds)).keys()].filter(
    id =>
      !seatIds.includes(id) &&
      seatIds.includes(id - 1) &&
      seatIds.includes(id + 1)
  )[0]
);

console.log(chalk.bgBlue.underline.black('part 1'));
console.log(chalk`{blue highest seat-id:} {green ${Math.max(...seatIds)}}`);

// part 2
console.log(chalk.bgBlue.underline.black('part 2'));
console.log(
  chalk`{blue my seat-id:} {green ${
    [...Array(Math.max(...seatIds)).keys()].filter(
      id =>
        !seatIds.includes(id) &&
        seatIds.includes(id - 1) &&
        seatIds.includes(id + 1)
    )[0]
  }}`
);
