const fs = require("fs");
const chalk = require("chalk");

const {
  passportToColorString,
  validatePassport,
  parsePassportsList,
} = require("./lib");

const passports = parsePassportsList(
  fs.readFileSync(`${__dirname}/input.txt`, "utf-8")
);

// part 1
{
  console.log(chalk.bgBlue.underline.black("part 1"));
  const expectedKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; // 'cid' is optional

  const numValidPassports = passports
    .map((p) => expectedKeys.every((key) => p[key] !== undefined))
    .reduce((n, isValid) => n + (isValid ? 1 : 0));

  console.log(chalk`{blue valid passports:} {green ${numValidPassports}}`);
}

// part 2
{
  console.log(chalk.bgBlue.underline.black("part 2"));

  let numValidPassports = 0;
  for (let p of passports) {
    const errors = validatePassport(p);
    if (errors.length > 0) {
      console.log("invalid passport: ", passportToColorString(p, errors));
    } else {
      numValidPassports++;
    }
  }

  console.log(chalk`{blue valid passports:} {green ${numValidPassports}}`);
}
