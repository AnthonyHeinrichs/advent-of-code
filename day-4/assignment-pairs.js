// Import our assignment pairs data
const assignmentPairs = require('./data/assignment-pairs-data')

// Challenge one

// Split up our array data and add each pair into their own array
const pairArray = []
let overlaps = 0

assignmentPairs.forEach(pair => {
  pairArray.push(pair.split(','))
})

// Remove the dash ( - ) from the range and push to their own range array
for (let i = 0; i < pairArray.length; i++) {

  const firstElf = pairArray[i][0].split('-')
  const secondElf = pairArray[i][1].split('-')
  // Convert the two numbers of each range from string to integer
  const firstNumOne = parseInt(firstElf[0])
  const firstNumTwo = parseInt(firstElf[1])
  const secondNumOne = parseInt(secondElf[0])
  const secondNumTwo = parseInt(secondElf[1])

  // If an overlap occurs in any of the pairs, add one to our overlap counter
  if (firstNumOne >= secondNumOne && firstNumTwo <= secondNumTwo || 
    secondNumOne >= firstNumOne && secondNumTwo <= firstNumTwo) {
    overlaps++
  }
}

console.log('Answer to first challenge', overlaps)