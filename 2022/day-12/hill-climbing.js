// Pull in our data from our text file and parse it
const fs = require('fs');
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, 'utf8');

// Identify all possible moves from our node
const moves = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function shortestPath(input, challenge) {
  /* We  need to get our starting position by finding the 'S' in the
  input data, and end position by finding the 'E' */
  const startPosition = [];

  /* We will parse our input data and get the applicable values of the
  characters for each char in our map*/

  // Split the input data by each line, 
  const map = input.split('\n').map((line, x) =>
    // and then by '' to get each char
    line.split('').map((char, y) => {
      /* For the first challenge we are searching for the 'S' for our
      starting node, for the second we check any char with the value a */
      if (char === 'S' || (challenge === 2 && char === 'a')) {
        // Our elevation for the starting node should always be 0
        ele = 0;
        startPosition.push([x, y]);
      } else if (char === 'E') {
        // Our elevation for the ending node should always be 25
        ele = 25;
        end = [x, y];
      } else {
        // Get the elevation value of the rest of our nodes by using char codes
        ele = char.charCodeAt(0) - 97;
      }
      // Return our elevation numbers
      return ele;
    })
  );
  
  // Start by creating our start node object and adding this node to our queue
  const queue = startPosition.map((start) => ({ pos: start, steps: 0 }));
  const visited = [];

  /* While nodes exist in our queue, get the nodes position and record amount
  of steps it has taken to get to the current node in our queue*/
  while (queue.length > 0) {
    const {
      pos: [x, y],
      steps,
    } = queue.shift();

    // Check to make sure we have not already visited this node
    if (visited[x]?.[y]) {
      continue;
    }

    /* If the current node we are visiting is the same as our 'end' node at 'E',
    return the steps taken to get ot this node*/
    if (x === end[0] && y === end[1]) {
      return steps;
    }

    for (const [mx, my] of moves) {
      if (
        /* Here we want to compare our current node to the 
        restraints determined in the challenge */

        // The node can only move one space up, left, down, or right
        map[x + mx]?.[y + my] === undefined ||
        /* The value of the next node cannot be greater than + 1 of the 
        current node */
        map[x + mx][y + my] > map[x][y] + 1 ||
        // Check if we have already visited this node before
        visited[x + mx]?.[y + my]
      ) {
        /* Any nodes that don't get filtered by our restraints gets 
        pushed to our queue*/
        continue;
      }
      // Push the new neighbor node to our queue and add 1 to our steps
      queue.push({ pos: [x + mx, y + my], steps: steps + 1 });
    }
    // Track the nodes we visited
    visited[x] = visited[x] ?? [];
    visited[x][y] = 1;
  }
}

//Challenge one

console.log('Answer to challenge one:', shortestPath(input, 1));

// Challenge two

console.log('Answer to challenge two:', shortestPath(input, 2));