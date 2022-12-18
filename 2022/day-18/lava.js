// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const { getEnabledCategories } = require("trace_events");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

const cubes = new Set();
const cubesArr = [];

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
  cubesArr.push(cube);
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

// Challenge two

// Get all our numbers from our cubes
const cubeNums = [];

// Getting the boundries of our cube
cubes.forEach((cube) => {
  cubeNums.push(cube[0], cube[1], cube[2]);
});

const min = Math.min(...cubeNums);
const max = Math.max(...cubeNums);

// Setup a DFS function for determining if each cube is exposed or not
const Dfs = (singleCube) => {
  let stack = [singleCube];
  let explored = new Set();

  // Checking if the cube already exists in our input
  cubes.forEach((cube) => {
    if (
      cube[0] === singleCube[0] &&
      cube[1] === singleCube[1] &&
      cube[2] == singleCube[2]
    ) {
      return false;
    }
  });

  // While we still have cubes in our stack, go through DFS
  while (stack.length > 0) {
    let cont = false;
    const pop = stack.pop();
    // Check if the cube that we got from end of our stack is already in our input
    cubes.forEach((cube) => {
      if (cube[0] === pop[0] && cube[1] === pop[1] && cube[2] == pop[2]) {
        cont = true;
      }
    });
    // If the cube is in our input, skip this cube
    if (cont) {
      continue;
    }
    // Check if the cube is outside of our boundaries, if it is, then it reached the edge
    for (let i = 0; i < pop.length; i++) {
      if (!(pop[i] >= min && pop[i] <= max)) {
        return true;
      }
    }
    // Check if the cube is already in our explored set, if it is skip the rest
    explored.forEach((expl) => {
      if (expl[0] === pop[0] && expl[1] === pop[1] && expl[2] == pop[2]) {
        cont = true;
      }
    });

    if (cont) {
      continue;
    }
    // Add the cube to our explored set
    explored.add(pop);

    /* Get all the neigbors of the cube and pass them through our Bfs 
    by adding them to our stack */
    let possibleNeigh = [
      [pop[0] + 1, pop[1], pop[2]],
      [pop[0], pop[1] + 1, pop[2]],
      [pop[0], pop[1], pop[2] + 1],
      [pop[0] - 1, pop[1], pop[2]],
      [pop[0], pop[1] - 1, pop[2]],
      [pop[0], pop[1], pop[2] - 1],
    ];
    stack.push(...possibleNeigh);
  }
  return false;
};

let extSurfaceArea = 0;

/* Go through each cube, get their nehgbors and pass them to our
bfs function, if we reach the edge, add one to our external surface area */
cubes.forEach((cube) => {
  let neigh = [
    [cube[0] + 1, cube[1], cube[2]],
    [cube[0], cube[1] + 1, cube[2]],
    [cube[0], cube[1], cube[2] + 1],
    [cube[0] - 1, cube[1], cube[2]],
    [cube[0], cube[1] - 1, cube[2]],
    [cube[0], cube[1], cube[2] - 1],
  ];

  for (let i = 0; i < neigh.length; i++) {
    if (Dfs(neigh[i])) {
      extSurfaceArea += 1;
    }
  }
});

console.log("Challenge two answer:", extSurfaceArea);
