// Import data
const markerCode = require("./data/marker-data");

// Challenge one

// Set up a new function that takes an array
const findUnique = (arr) => {
  // Loop through the array
  for (let i = 0; i < arr.length; i++) {
    /* Slice out the next four elements in our array, starting from 0 and increasing by 1 
    comparing if this slice of four elements is unique, if it is unique, 
    return our iteration value + 4 */
    if (new Set(arr.slice(i, i + 4)).size == arr.slice(i, i + 4).length) {
      return console.log(i + 4);
    }
  }
};

findUnique("Solution to challenge one:", markerCode);
