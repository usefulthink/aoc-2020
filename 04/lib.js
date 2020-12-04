function parsePassport(p) {
  return Object.fromEntries(p.split(/\s+/).map((e) => e.split(":")));
}

function parsePassportsList(input) {
  return input.split("\n\n").map((p) => parsePassport(p));
}

const isInRange = (min, max) => (n) =>
  n !== undefined && parseInt(n, 10) >= min && parseInt(n, 10) <= max;

/**
 * @type {Object<string, function(string):boolean>}
 */
const validators = {
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  byr: isInRange(1920, 2002),
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  iyr: isInRange(2010, 2020),
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  eyr: isInRange(2020, 2030),

  // hgt (Height) - a number followed by either cm or in:
  // - If cm, the number must be at least 150 and at most 193.
  // - If in, the number must be at least 59 and at most 76.
  hgt: (hgt) =>
    (hgt.endsWith("cm") && isInRange(150, 193)(hgt)) ||
    (hgt.endsWith("in") && isInRange(59, 76)(hgt)),

  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  hcl: (hcl) => /^#[0-9a-f]{6}$/.test(hcl),
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  ecl: (ecl) => "amb blu brn gry grn hzl oth".split(" ").includes(ecl),
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  pid: (pid) => /^[0-9]{9}$/.test(pid),
};

function validatePassport(passport) {
  let errors = [];
  for (let [key, validator] of Object.entries(validators)) {
    if (!passport[key]) {
      errors.push({ type: "missing key", key });
      continue;
    }

    if (!validator(passport[key])) {
      errors.push({
        type: "validation failed",
        key,
        value: passport[key],
      });
    }
  }

  return errors;
}

const expectedKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; // 'cid' is optional
function passportToColorString(passport, errors = []) {
  const errorMap = Object.fromEntries(errors.map((err) => [err.key, err.type]));
  const missingKeys = errors
    .filter((err) => err.type === "missing key")
    .map((err) => err.key);

  return [
    ...Object.entries(passport).map(([key, value]) => {
      if (errorMap[key]) {
        return chalk.red(`${key}:${value}`);
      }
      if (expectedKeys.includes(key)) {
        return chalk.green(`${key}:${value}`);
      }
      return chalk.grey(`${key}:${value}`);
    }),
    ...missingKeys.map((key) => chalk.yellow(`[${key}: MISSING]`)),
  ].join(" ");
}

module.exports = {
  parsePassport,
  parsePassportsList,
  validatePassport,
  passportToColorString,
};
