const fs = require("fs");

const input = fs.readFileSync("input.txt").toString();

const passports = input.split("\n\n").map((p) => {
  return Object.fromEntries(p.split(/[\n ]+/).map((f) => f.split(":")));
});

/*
  UTILS
*/
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const checkRequiredFields = (passport) => {
  const fields = Object.keys(passport);
  return requiredFields.every((rf) => fields.includes(rf));
};

/*
  PART 1
*/
const validatePassport_p1 = (passport) => {
  return checkRequiredFields(passport);
};

let numValidPassports_p1 = passports.reduce(
  (acc, p) => (acc += validatePassport_p1(p) ? 1 : 0),
  0
);

console.log(`Part 1 answer: ${numValidPassports_p1}`);

/*
  PART 2
*/
const validateYear = (year, min, max) => {
  const yearNum = Number(year);
  return yearNum !== NaN && yearNum >= min && yearNum <= max;
};

const validateHeight = (height) => {
  const matches = height.match(/(\d+)(in|cm)/);

  if (!matches || matches.length != 3) return false;

  const unit = matches[2];
  const num = Number(matches[1]);

  switch (unit) {
    case "cm":
      return num >= 150 && num <= 193;
    case "in":
      return num >= 59 && num <= 76;
    default:
      return false;
  }
};

const validatePassport_p2 = (passport) => {
  if (!checkRequiredFields(passport)) return false;

  return (
    validateYear(passport.byr, 1920, 2002) &&
    validateYear(passport.iyr, 2010, 2020) &&
    validateYear(passport.eyr, 2020, 2030) &&
    validateHeight(passport.hgt) &&
    /#[0-9a-f]{6}/.test(passport.hcl) &&
    /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl) &&
    /^\d{9}$/.test(passport.pid)
  );
};

let numValidPassports_p2 = passports.reduce(
  (acc, p) => (acc += validatePassport_p2(p) ? 1 : 0),
  0
);

console.log(`Part 2 answer: ${numValidPassports_p2}`);
