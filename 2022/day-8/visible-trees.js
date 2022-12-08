const treeData = require("./data/tree-data");

const splitTrees = [];

// Create a grid from our input data and push it to our split trees array
treeData.forEach((treeLine) => {
  splitTrees.push(treeLine.split(""));
});

// Challenge one

// Setting up our counter for visible trees
let visibleTrees = 0;

// Iterate through each grid in our grid array
for (let y = 0; y < splitTrees.length; y++) {
  // Iterate through each individual node in our current grid
  for (let x = 0; x < splitTrees[y].length; x++) {
    /* Set up an array of either 1 (true) or 0 (false) for our checks
    and set these checks to true for the time being */
    let checkArr = [1, 1, 1, 1, 1];

    /* Check first if the node we are currently iterating is on the 
    edge of the grid, either top, bottom, left or right */
    if (
      y !== 0 ||
      x !== 0 ||
      y !== splitTrees.length - 1 ||
      x !== splitTrees[y].length - 1
    ) {
      // If the node is not on the edge, set our first check to false
      checkArr[0] = 0;
    }

    /* Now check each individual node left of our node, if any 
    are greater set our next check to false */ 
    for (let i = 0; i < y; i++) {
      if (splitTrees[x][i] >= splitTrees[x][y]) {
        checkArr[1] = 0;
        break;
      }
    }

    /* Now check each individual node right of our node, if any 
    are greater set our next check to false */ 
    for (let i = splitTrees.length - 1; i > y; i--) {
      if (splitTrees[x][i] >= splitTrees[x][y]) {
        checkArr[2] = 0;
        break;
      }
    }

    /* Now check each individual node above our node, if any 
    are greater set our next check to false */ 
    for (let i = 0; i < x; i++) {
      if (splitTrees[i][y] >= splitTrees[x][y]) {
        checkArr[3] = 0;
        break;
      }
    }

    /* Now check each individual node below our node, if any 
    are greater set our next check to false */ 
    for (let i = splitTrees.length - 1; i > x; i--) {
      if (splitTrees[i][y] >= splitTrees[x][y]) {
        checkArr[4] = 0;
        break;
      }
    }
    /* If any checks are still true for this individual node, 
    add one tree to our visible tree count */
    if (checkArr.includes(1)) {
      visibleTrees++;
    }
  }
}

console.log('Answer to first challenge:', visibleTrees);

// Challenge two