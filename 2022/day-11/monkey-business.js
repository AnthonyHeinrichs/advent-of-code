/* In my last challenges I was manually parsing some 
of the data, but I am taking some time on this challenge
to understand how to parse the raw data from a txt file
to avoid manual parsing and human error */

// Built in node file system module to help with reading files
const fs = require("fs");
// Built in node path module to help with building file paths
const path = require("path");
// Get the relevant file path of our txt data file
const filePath = path.join(__dirname, "./data/input.txt");

// Read the data file from our saved file path above
const data = fs.readFileSync(filePath, "utf8");

// Challenge one

// Parse our data to an array that we can iterate through

// Split array on each new line
const array = data.toString().split("\n\n")
/* Returning a new array, for each line we are splitting
the line on the colon (:) so we can remove unecessary data*/  

// Only return the data that occurs after the colon (:)
.map(group => group.split("\n").map(lines => lines.split(":")[1])
 
/* Map again and return an array that converts our strings to 
actual numbers and removes unecessary data*/
).map(([, items, operation, ...test]) => [
  // Split each number on the ',' and convert to number
  items.split(",").map(Number),
  // Spliting our operation on each space and only returning last 3
  operation.split(" ").slice(-3),
  // Splitting our test on each space and converting to number
  test.map(t => t.split(" ").map(Number).at(-1)),
])