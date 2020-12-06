const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf-8');

// browser-console alternative:
// const input = await (await fetch('https://adventofcode.com/2020/day/6/input')).text();

// part 1
console.log(
  'part 1 – sum of all different answers:',
  input
    .split('\n\n')
    .map(s => new Set([...s.replace(/\W/g, '')]))
    .reduce((sum, set) => sum + set.size, 0)
);

// part 2, codegolfed to oblivion
console.log(
  'part 2 - sum of all common answers:',
  input
    // split into groups
    .split('\n\n')
    // split group into one set per line
    .map(g => g.split('\n').map(s => new Set([...s])))
    // intersect all sets in group
    .map(g => new Set([...g[0]].filter(i => g.every(s => s.has(i)))))
    // sum together
    .reduce((sum, s) => sum + s.size, 0)
);
