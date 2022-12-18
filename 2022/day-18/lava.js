// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

const cubes = new Set();

/* Splitting the input by line, and then returning an array 
of our in put split by comma */
const data = input.split("\n").map((line) => {
  return line.split(",");
});

// For each line, converting to number and adding to our Set
data.forEach((line) => {
  const cube = [];
  cube.push(Number(line[0]));
  cube.push(Number(line[1]));
  cube.push(Number(line[2]));
  cubes.add(cube);
});

let sides = 0;

// For each cube in our set, we want to check if the sides are covered
cubes.forEach((cube) => {
  let coveredSides = 0;

  // Determine the possible sides of the current cube (1,0,0 or 0,1,0 or 0,0,1 etc.)
  let possibleNeigh = [
    [cube[0] + 1, cube[1], cube[2]],
    [cube[0], cube[1] + 1, cube[2]],
    [cube[0], cube[1], cube[2] + 1],
    [cube[0] - 1, cube[1], cube[2]],
    [cube[0], cube[1] - 1, cube[2]],
    [cube[0], cube[1], cube[2] - 1],
  ];
  
  // For each potential side, check if that side exists in our set of cubes
  for (let i = 0; i < possibleNeigh.length; i++) {
    cubes.forEach((combi) => {
      if (
        combi[0] == possibleNeigh[i][0] &&
        combi[1] == possibleNeigh[i][1] &&
        combi[2] == possibleNeigh[i][2]
      ) {
        // If the side exists, add it to our covered sides counter
        coveredSides += 1;
      }
    });
  }
  // For this current cube, take all possible sides and reduce by covered sides
  sides += 6 - coveredSides;
});

console.log("Answer to challenge one", sides);
