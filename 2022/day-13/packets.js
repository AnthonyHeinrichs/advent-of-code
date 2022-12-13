// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

/* Parsing our input data so we are getting an array of pairs*/
const data = input
  .split(/\r?\n\r?\n/)
  .map(line => line.split(/\r?\n/).map(part => JSON.parse(part)))

/* I have only used recursive functions a handful of times, so for this 
solution I needed some help from some other solutions online.*/
const comparePair = ([left, right]) => {
  /* Take in a pair of data, check the first element on the left and the
  first element on right, if both are integers, compare the values*/
  if ([left, right].every(Number.isInteger)) {
    if (left < right) return true
    if (left > right) return false
    return
  }
   /* Take in a pair of data, check the first element on the left and the
  first element on right, if both are arrays, recursively call our compare function
  on the elements inside the left array and right array*/
  if ([left, right].every(Array.isArray)) {

    /* There might be more elements in the left side, or right side, so make sure we
    iterate over each Element, but not a null element, we use the pair 
    with the min length for our iteration case*/
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      // Recursively call our compare function, passing the destructured pair
      const res = comparePair([left[i], right[i]])
      /* If we get 'undefined' from our pairs check, then we know one side has a length
      that is greater than the other, we will then compare the lengths of each */
      if (res != null) return res
    }
    // Recursively call the compare function again, this time passing our pair lengths
    return comparePair([left.length, right.length])
  }
  /* If any of our pairs are mixed types (one is a list, other array), descructure (flatten) 
  each pair and retry by recursively calling our compare function */
  return comparePair([[left].flat(), [right].flat()])
}

// Challenge one

/* Reducing each pair down. If the comparePair method checking our
pairs returns true, then we add the index to our accumulator (totalIndex) */
const total = data.reduce((totalIndex, pair, index) => {
    return totalIndex + (comparePair(pair) ? index + 1 : 0)
  }, 0)

console.log('Challenge one answer:', total)

// Challenge two

// For part two we have to add our dividers to our arrays 
const dividers = [[[2]], [[6]]]

// Adding our dividers to our pair data, and sorting by value
const sorted = [...data.flat(), ...dividers].sort((a, b) => comparePair([b, a]) - comparePair([a, b]))

// Finding the index of our dividers, and multiplying them together
const totalChal2 = sorted.reduce(
  (totalIndex, pair, index) => ((dividers).includes(pair) ? totalIndex * (index + 1) : totalIndex),
  1
)

console.log('Challenge two answer:', totalChal2)