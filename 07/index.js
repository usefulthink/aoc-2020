const chalk = require('chalk');
const fs = require('fs');

// testing inputs

// const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.`;

// const input = `shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.`

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
// lets throw away some noise we dont need for parsing and split into rules
const lines = input.replace(/ *bags?\.? */g, '').split('\n');

// now parse the rules into an array of objects
/** @type {Array<{id: string, contents: Array<{count: number, id: string}>}>} */
const rules = lines.map(function (line) {
  const [id, childsStr] = line.split(/\s*contain\s*/);
  const childs = childsStr
    .split(/\s*,\s*/)
    .filter(s => s !== 'no other')
    .map(s => {
      if (s === 'no other') {
        return {};
      }
      const [, count, id] = s.match(/^(\d+) +(.*)$/);

      return {count: Number(count), id};
    });

  return {id, contents: childs};
});

// ...and find my bag
const myBag = rules.find(bag => bag.id === 'shiny gold');

// part 1: how many bags can contain my shiny gold one?
function* linearizeOuterBagIds(node) {
  yield node.id;

  const parents = rules.filter(parent =>
    parent.contents.some(pc => pc.id === node.id)
  );

  for (let p of parents) {
    yield* linearizeOuterBagIds(p);
  }
}

const outerBagCount = new Set(linearizeOuterBagIds(myBag)).size - 1;
console.log(
  chalk`{green there are {blue ${outerBagCount}} different types of bags that could contain my golden one}`
);

// part 2: summarize the number of bags required within my shiny golden one
/** @return Iterator<number> */
function* linearizeContainedBagCount(node, multiplier = 1) {
  for (let {count, id} of node.contents) {
    const totalCount = multiplier * count;

    yield totalCount;
    yield* linearizeContainedBagCount(
      rules.find(c => c.id === id),
      totalCount
    );
  }
}

console.log(
  chalk`{green in my shiny bag there are a total of {blue ${[
    ...linearizeContainedBagCount(myBag)
  ].reduce((a, b) => a + b)}} other bags}`
);
