// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

// Splitting each line by new line, then by spaces
const data = input.split("\n").map((line) => line.split(" "));
// Initializing our map object
const map = {};
// Adding each line from our input to our map object
data.forEach((line) => {
  if (line.length == 2) {
    map[line[0].slice(0, -1)] = parseInt(line[1]);
  } else {
    map[line[0].slice(0, -1)] = [line[1], line[2], line[3]];
  }
});

/* Recursive function that finds the final number for root by
recursively passing the object name until a number is returned*/
const findRoot = (line) => {
  // If we get a number, return it
  if (!isNaN(map[line])) {
    return map[line];
  }
  /* If we do not get a number, find the next object instance to check
  and pass back through our function until we return a number */
  let left = findRoot(map[line][0]);
  let right = findRoot(map[line][2]);
  // Using eval to calculate our string (never use this in a production application)
  return eval(`${left}${map[line][1]}${right}`);
};

console.log("Answer to challenge one:", findRoot("root"));
