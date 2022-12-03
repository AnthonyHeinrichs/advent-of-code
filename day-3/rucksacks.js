// Pull in the rucksack data.
const rucksacks = require("./data/rucksacks-data.js");

// First challenge 

// Setup our variables
const charMap = {
}

const firstHalf = []
const secondHalf = []
const matchingElements = []
let total = 0

// Create a mapping for a-z (1-26) and A-Z (27-52).
for (let i = 65; i <= 90; i++) {
  let lowerCaseChar = String.fromCharCode(i).toLowerCase()
  charMap[lowerCaseChar] = [i] - 64
  let upperCaseChar = String.fromCharCode(i)
  charMap[upperCaseChar] = [i] - 38
}

for (let i = 0; i < rucksacks.length; i++) {
  // Split each array of strings in half and add to seperate variables.
  let eachCharSplit = rucksacks[i].split("")
  firstHalf.push(eachCharSplit.slice(0, eachCharSplit.length / 2))
  secondHalf.push(eachCharSplit.slice(eachCharSplit.length / 2))

  /* Compare each split array one by one to find out which value exists in both (filter)
  and push out that value from each array and add it to its own array */
  matchingElements.push(firstHalf[i].filter(el => secondHalf[i].includes(el)))

  // Iterate over the values and use our map from earlier to determine the value of each
  let letter = matchingElements[i][0]

  // Assign the value, and add it up to a 'totals' variable
  total = total + charMap[letter]
}

console.log('Challenge one answer:', total)

// Second challenge