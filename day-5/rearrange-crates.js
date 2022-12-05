const rearrangementData = require("./data/rearrangement-data");

const crateStacks = [
  ["V", "C", "D", "R", "Z", "G", "B", "W"],
  ["G", "W", "F", "C", "B", "S", "T", "V"],
  ["C", "B", "S", "N", "W"],
  ["Q", "G", "M", "N", "J", "V", "C", "P"],
  ["T", "S", "L", "F", "D", "H", "B"],
  ["J", "V", "T", "W", "M", "N"],
  ["P", "F", "L", "C", "S", "T", "G"],
  ["B", "D", "Z"],
  ["M", "N", "Z", "W"],
];

// Challenge one

/* Create a function that takes three inputs, the amount of crates to move, 
the index of the crate to move from, and the index of the crate to move to */
const moveCrates = (amount, start, end) => {
  // Create an itteration for the amount of times a crate must be moved
  for (let i = 0; i < amount; i++) {
    /* Determine the array of the crate stacks that the crate must be moved from 
    and remove the last element from the start crate, saving it in a variable */
    const removedCrate = crateStacks[start - 1].pop();
    // Add that element to the end of the crate we are moving it to
    crateStacks[end - 1].push(removedCrate);
  }
};

/* Update rearrangement data, and split on the ',' so it is easy to 
itterate over the data later */

const formattedData = [];

rearrangementData.forEach((arrangement) => {
  formattedData.push(arrangement.split(","));
});

// Itterate over the formatted data and run the moveCrates function to format the stacks
for (let i = 0; i < formattedData.length; i++) {
  moveCrates(
    parseInt(formattedData[i][0]),
    parseInt(formattedData[i][1]),
    parseInt(formattedData[i][2])
  );
}

// Get the answer by logging the first element of each array in the crate stacks
console.log('The answer to challenge one:')
for (let i = 0; i  < crateStacks.length; i++) {
  console.log(crateStacks[i].at(-1))
}

// Challenge two

const anotherCrateStack = [
  ["V", "C", "D", "R", "Z", "G", "B", "W"],
  ["G", "W", "F", "C", "B", "S", "T", "V"],
  ["C", "B", "S", "N", "W"],
  ["Q", "G", "M", "N", "J", "V", "C", "P"],
  ["T", "S", "L", "F", "D", "H", "B"],
  ["J", "V", "T", "W", "M", "N"],
  ["P", "F", "L", "C", "S", "T", "G"],
  ["B", "D", "Z"],
  ["M", "N", "Z", "W"],
];

const crateMover9001 = (amount, start, end) => {
  /* Determine the array of the crate stacks that the crate must be moved from 
  and slice off the amount of crates moved from the end, save it in a variable */
  let removedCrates = anotherCrateStack[start - 1].slice(-(amount));
  anotherCrateStack[start - 1].slice(-(amount));

  // Iterate over each removed crate from a stack and add it to the other stack in order
  for (let i = 0; i < removedCrates.length; i++) {
    /* Remove the amount of crates being moved from the end of the array where the 
    crates are being moved from */
    anotherCrateStack[start - 1].pop()
    // Move to new stack
    anotherCrateStack[end - 1].push(removedCrates[i])
  }
};

for (let i = 0; i < formattedData.length; i++) {
  crateMover9001(
    parseInt(formattedData[i][0]),
    parseInt(formattedData[i][1]),
    parseInt(formattedData[i][2])
  );
}

// Get the answer by logging the first element of each array in the crate stacks
console.log('The answer to challenge two:')
for (let i = 0; i  < anotherCrateStack.length; i++) {
  console.log(anotherCrateStack[i].at(-1))
}
