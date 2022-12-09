const data = require("./data/string-data");

/* Parsing our data so it is an array of two elements, first is move direction,
second is amount of times we move in that direction as an integer*/
const moves = data
  .map((move) => move.split(" "))
  .map((move) => [move[0], parseInt(move[1])]);

// Set the starting node position for our rope 'head'
const head = [0, 0];
// Set the starting node position for our rope 'tail'
const tail = [0, 0];

/* Create a set for our tails visited node so that we do not add
any duplicated nodes to our set */
const visitedNodes = new Set();

// Create a map of the different moves we can expect from our input
const possibleMoves = {
  R: [1, 0],
  U: [0, 1],
  L: [-1, 0],
  D: [0, -1],
};

/* Check if the head and tail are touching by making sure that the absolute value
of the differences is no more than 1*/
const isTouching = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
};

for (const move of moves) {
  let moveDirection = possibleMoves[move[0]];

  for (let i = 0; i < move[1]; i++) {
    // Update our heads position by moving in our move direction
    head[0] += moveDirection[0];
    head[1] += moveDirection[1];

    // If head and tail are not touching eachother, than we should update the tail
    if (!isTouching(head[0], head[1], tail[0], tail[1])) {
      let tailX = null;
      let tailY = null;
      // If the tail is already in the same column, we don't move rows
      if (head[0] == tail[0]) {
        tailX = 0;
        // Else, we need to move the column the difference between the head and the tail
      } else {
        tailX = (head[0] - tail[0]) / Math.abs(head[0] - tail[0]);
      }
      // If the tail is already in the same row, we don't move rows
      if (head[1] == tail[1]) {
        tailY = 0;
        // Else, we need to move the row the difference between the head and the tail
      } else {
        tailY = (head[1] - tail[1]) / Math.abs(head[1] - tail[1]);
      }

      // Update our current tail position
      tail[0] += tailX;
      tail[1] += tailY;
    }
    /* Add our tail position to our visited nodes as JSON so that JS will be able
    to read each and only save the unique touched nodes*/
    visitedNodes.add(JSON.stringify([tail[0], tail[1]]));
  }
}
// Since it is a Set, we must check 'size' instead of 'length' for our answer
console.log("Answer to first challenge:", visitedNodes.size);
