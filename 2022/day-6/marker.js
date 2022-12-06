// Import data
const markerCode = require("./data/marker-data");

// Challenge one
// Set up a new function that takes an array
const findUnique = (arr, num, chall) => {
  // Loop through the array
  for (let i = 0; i < arr.length; i++) {
    // If length of unqiue values equals our passed num, return iteration value plus num
    if (new Set(arr.slice(i, i + num)).size == num) {
      return console.log(`Answer to challenge ${chall}:`, i + num);
    }
  }
};
findUnique(markerCode, 4, 1);

// Challenge two
// Updated above function to take in a num to check on for unique values
findUnique(markerCode, 14, 2);
