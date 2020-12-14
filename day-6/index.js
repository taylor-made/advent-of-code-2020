const fs = require("fs");

const groups = fs.readFileSync("input.txt").toString().split("\n\n");

const getYesAnswers = (people) => {
  const yesAnswers = {};

  people.forEach((personAnswers) => {
    for (answer of personAnswers) {
      const answerCount = yesAnswers[answer] || 0;
      yesAnswers[answer] = answerCount + 1;
    }
  });

  return yesAnswers;
};

/*
  PART 1
*/
const calcYesAnswers_p1 = (group) => {
  const people = group.split("\n");

  const yesAnswers = getYesAnswers(people);

  return Object.keys(yesAnswers).length;
};

const totalYesAnswers_p1 = groups.reduce(
  (acc, g) => (acc += calcYesAnswers_p1(g)),
  0
);

console.log(`Part 1 answer: ${totalYesAnswers_p1}`);

/*
  PART 2
*/
const calcYesAnswers_p2 = (group) => {
  const people = group.split("\n");

  const yesAnswers = getYesAnswers(people);

  let groupYesAnswers = Object.entries(yesAnswers).reduce(
    (acc, [_question, answerCount]) =>
      acc + (answerCount === people.length ? 1 : 0),
    0
  );

  return groupYesAnswers;
};

const totalYesAnswers_p2 = groups.reduce(
  (acc, g) => (acc += calcYesAnswers_p2(g)),
  0
);

console.log(`Part 2 answer: ${totalYesAnswers_p2}`);
