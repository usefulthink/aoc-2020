const fs = require('fs');
const chalk = require('chalk');

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
// const input = `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576`;

function* pairs(list) {
  for (let a = 0; a < list.length - 1; a++) {
    for (let b = a + 1; b < list.length; b++) {
      yield [list[a], list[b]];
    }
  }
}

function* pairSums(list) {
  for (let [a, b] of pairs(list)) {
    yield a + b;
  }
}

const numbers = input.split('\n').map(s => Number(s));
const window = 25;

let invalidNumber = undefined;
for (let i = window; i < numbers.length; i++) {
  const slice = numbers.slice(i - window, i);
  const sums = new Set(pairSums(slice));

  if (!sums.has(numbers[i])) {
    console.log(`maybe ${numbers[i]} is what you're looking for`);
    invalidNumber = numbers[i];
    break;
  }
}

// fuckit, lets get this done.
outer: for (let i = 0; i < numbers.length; i++) {
  let sum = 0;
  for (let j = i; j < numbers.length; j++) {
    sum += numbers[j];
    if (sum > invalidNumber) {
      break;
    }

    if (sum === invalidNumber) {
      const slice = numbers.slice(i, j + 1);
      const min = Math.min(...slice);
      const max = Math.max(...slice);

      console.log('encryption weakness found:', min + max);

      break outer;
    }
  }
}
