const fs = require("fs");
const chalk = require("chalk");

function getPasswordValidator(policyString) {
  const [, min, max, letter] = policyString.match(/(\d+)-(\d+)\s+([a-zA-Z]*)/);
  return (s) =>
    new RegExp(`^([^${letter}]*${letter}){${min},${max}}[^${letter}]*$`).test(
      s
    );
}

function getOtherPasswordValidator(policyString) {
  const [, posA, posB, letter] = policyString.match(
    /(\d+)-(\d+)\s+([a-zA-Z]*)/
  );

  return (s) => {
    let a = s.charAt(posA - 1);
    let b = s.charAt(posB - 1);

    return (a === letter && b !== letter) || (b === letter && a !== letter);
  };
}

const inputLines = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n");

// part 1
{
  const validPasswords = inputLines
    .map((line) => line.split(":").map((s) => s.trim()))
    .filter(([policy, password]) => getPasswordValidator(policy)(password));

  console.log(chalk.bgBlue.underline.black("part 1"));
  console.log(
    chalk`{blue number of valid passwords:} {green ${validPasswords.length}}`
  );
}

// part 2
{
  const validPasswords = inputLines
    .map((line) => line.split(":").map((s) => s.trim()))
    .filter(([policy, password]) =>
      getOtherPasswordValidator(policy)(password)
    );

  console.log(chalk.bgBlue.underline.black("part 2"));
  console.log(
    chalk`{blue number of valid passwords:} {green ${validPasswords.length}}`
  );
}

// exportsed for unit-tests
module.exports = { getPasswordValidator, getOtherPasswordValidator };
