const fs = require("fs");

const input = fs.readFileSync("input.txt").toString().split("\n");

const calcPos = (code, max, lowerCode) => {
  let min = 0;
  for (const r of code) {
    const diff = Math.ceil((max - min) / 2);
    if (r === lowerCode) {
      max -= diff;
    } else {
      min += diff;
    }
  }
  return min;
};

const getBoardingPass = (seatCode) => {
  const rowCode = seatCode.substr(0, 7);
  const colCode = seatCode.substr(7);

  const row = calcPos(rowCode, 127, "F");
  const col = calcPos(colCode, 7, "L");

  const seatId = row * 8 + col;

  return { row, col, seatId };
};

const boardingPasses = input
  .map((i) => getBoardingPass(i))
  .sort((a, b) => b.seatId - a.seatId);

/*
  PART 1
*/
console.log(`Part 1 answer: ${boardingPasses[0].seatId}`);

/*
  PART 2
*/
boardingPasses.sort((a, b) => a.seatId - b.seatId);

let mySeatId,
  i = 1;
while (!mySeatId && i < 127) {
  const row = boardingPasses.filter((b) => b.row === i);

  if (row.length !== 8 && row.length > 1) {
    for (let p = 0; p < row.length - 1; p++) {
      const currentPass = row[p];
      const nextPass = row[p + 1];

      if (currentPass.seatId + 1 !== nextPass.seatId) {
        mySeatId = currentPass.seatId + 1;
        break;
      }
    }
  }

  i++;
}

console.log(`Part 2 answer: ${mySeatId}`);
