// Import our assignment pairs data
const assignmentPairs = require("./data/assignment-pairs-data");

// Challenge one

// Split up our array data and add each pair into their own array
const pairArray = [];
let overlaps = 0;

assignmentPairs.forEach((pair) => {
  pairArray.push(pair.split(","));
});

// Remove the dash ( - ) from the range and push to their own range array
for (let i = 0; i < pairArray.length; i++) {
  const firstElf = pairArray[i][0].split("-");
  const secondElf = pairArray[i][1].split("-");

  // If an overlap occurs in any of the pairs, add one to our overlap counter
  if (
    (parseInt(firstElf[0]) >= parseInt(secondElf[0]) &&
      parseInt(firstElf[1]) <= parseInt(secondElf[1])) ||
    (parseInt(secondElf[0]) >= parseInt(firstElf[0]) &&
      parseInt(secondElf[1]) <= parseInt(firstElf[1]))
  ) {
    overlaps++;
  }
}

console.log("Answer to first challenge", overlaps);

// Challenge two
