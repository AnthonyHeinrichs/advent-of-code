// Import data
const markerCode = require("./data/marker-data");

// Challenge one

// Set up a new function that takes an array
const findUnique = (arr, num) => {
  // Loop through the array
  for (let i = 0; i < arr.length; i++) {
    /* Slice out the next four elements in our array, starting from 0 and increasing by 1 
    comparing if this slice of four elements is unique, if it is unique, 
    return our iteration value + 4 */
    if (new Set(arr.slice(i, i + num)).size == num) {
      return console.log(i + num);
    }
  }
};

console.log("Answer to first challenge:");
findUnique(markerCode, 4);

// Challenge two

/* All I had to do for this challenge was update my above function to take in a unique 
num that we reference for our unique char check */

console.log("Answer to second challenge:");
findUnique(markerCode, 14);