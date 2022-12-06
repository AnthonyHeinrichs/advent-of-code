// Pull in the rucksack data.
const rucksacks = require("./data/rucksacks-data.js");

// First challenge

// Setup our variables
const charMap = {};

const firstHalf = [];
const secondHalf = [];
const matchingElements = [];
let total = 0;

// Create a mapping for a-z (1-26) and A-Z (27-52).
for (let i = 65; i <= 90; i++) {
  let lowerCaseChar = String.fromCharCode(i).toLowerCase();
  charMap[lowerCaseChar] = [i] - 64;
  let upperCaseChar = String.fromCharCode(i);
  charMap[upperCaseChar] = [i] - 38;
}

for (let i = 0; i < rucksacks.length; i++) {
  // Split each array of strings in half and add to seperate variables.
  let eachCharSplit = rucksacks[i].split("");
  firstHalf.push(eachCharSplit.slice(0, eachCharSplit.length / 2));
  secondHalf.push(eachCharSplit.slice(eachCharSplit.length / 2));

  /* Compare each split array one by one to find out which value exists in both (filter)
  and push out that value from each array and add it to its own array */
  matchingElements.push(
    firstHalf[i].filter((el) => secondHalf[i].includes(el))
  );

  // Iterate over the values and use our map from earlier to determine the value of each
  let letter = matchingElements[i][0];

  // Assign the value, and add it up to a 'totals' variable
  total = parseInt(total + charMap[letter]);
}

console.log("Challenge one answer:", total);

// Second challenge

// Split the array of strings by each third array and add to an array of arrays
const sliceIntoThirds = (arr) => {
  const splitArr = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    const chunk = arr.slice(i, i + 3);
    splitArr.push(chunk);
  }
  return splitArr;
};

// Get results into variable by calling my slice method and passing the array
const rucksackInThirds = sliceIntoThirds(rucksacks)

// Push the unique element from the first two of a group into an array
const firstElf = []
const secondElf = []
const thirdElf = []
const firstAndSecondElf = []
const matchingEles = []
let secondChalTotal = []

for (let i = 0; i < rucksackInThirds.length; i++) {
  // Split up the characters so they can be filtered
  firstElf.push(rucksackInThirds[i][0].split(""));
  secondElf.push(rucksackInThirds[i][1].split(""));
  thirdElf.push(rucksackInThirds[i][2].split(""))

  // Compare the first elf rucksack with the second elf, push matching ele to new arr
  firstAndSecondElf.push(
    firstElf[i].filter((el) => secondElf[i].includes(el))
  );

  /* Then compare the matching elements from the first two elves to the third elf
  to get the final matching char */
  matchingEles.push(
    firstAndSecondElf[i].filter((el) => thirdElf[i].includes(el))
  );

  // Iterate over the values and use our map from earlier to determine the value of each
  let letter = matchingEles[i][0];

  // Assign the value, and add it up to a 'totals' variable
  secondChalTotal = parseInt(secondChalTotal + charMap[letter]);  
}

console.log("Challenge two answer:", secondChalTotal)
