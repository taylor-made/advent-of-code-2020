const fs = require("fs");

const input = fs.readFileSync("input.txt").toString().split("\n");

const traverseMap = (xShift, yShift) => {
  let numOfTrees = 0;
  let x = 0;

  for (let i = yShift; i < input.length; i += yShift) {
    x += xShift;

    const mapLine = input[i];

    const pos = x % mapLine.length;

    if (mapLine[pos] === "#") {
      numOfTrees++;
    }
  }

  return numOfTrees;
};

/*
  PART 1
*/
const numOfTrees_p1 = traverseMap(3, 1);

console.log(`Part 1 answer: ${numOfTrees_p1}`);

/*
  PART 2
*/
const instructions = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const numOfTrees_p2 = instructions.reduce((acc, i) => {
  return acc * traverseMap(i.right, i.down);
}, 1);

console.log(`Part 2 answer: ${numOfTrees_p2}`);
