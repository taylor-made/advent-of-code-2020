const fs = require("fs");

const input = fs.readFileSync("input.txt").toString().split("\n");

/*
  PART 1
*/
const isPasswordValid_p1 = (line) => {
  const [policy, password] = line.split(": ");
  const [policyRange, policyChar] = policy.split(" ");
  const [min, max] = policyRange.split("-").map((v) => Number(v));

  const charMatches = (password.match(new RegExp(policyChar, "g")) || [])
    .length;

  return charMatches >= min && charMatches <= max;
};

const numValidPasswords_p1 = input.reduce(
  (acc, l) => (acc += isPasswordValid_p1(l) ? 1 : 0),
  0
);

console.log(`Part 1 answer: ${numValidPasswords_p1}`);

/*
  PART 2
*/
const isPasswordValid_p2 = (line) => {
  const [policy, password] = line.split(": ");
  const [positions, policyChar] = policy.split(" ");

  const posMatches = positions
    .split("-")
    .filter((p) => password[Number(p) - 1] === policyChar);

  return posMatches.length === 1;
};

const numValidPasswords_p2 = input.reduce(
  (acc, l) => (acc += isPasswordValid_p2(l) ? 1 : 0),
  0
);

console.log(`Part 2 answer: ${numValidPasswords_p2}`);
