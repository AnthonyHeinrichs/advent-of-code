const nums = require("./data/calories-data.js");

// First challenge

let totals = []

const highest = []
  
nums.forEach(numList => {
  totals.push(numList.reduce((partialSum, a) => partialSum + a, 0))
})

// Second challenge

const secondHighest = []
const thirdHighest = []

highest.push(Math.max(...totals))

totals = totals.filter(a => a !== highest[0])

secondHighest.push(Math.max(...totals))

totals = totals.filter(a => a !== secondHighest[0])

thirdHighest.push(Math.max(...totals))

const addUpTopThree = (a,b,c) => {
  return a + b + c
}

const total = addUpTopThree(highest[0], secondHighest[0], thirdHighest[0])
console.log('First challenge result:', highest[0])
console.log('Second challenge result:', total)