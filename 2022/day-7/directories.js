const terminalData = require("./data/terminal-data");

// Setup our variables that we will reference for past and present directory
let pastDirectory = "directory1";
let currentDirectory = "directory1";
let touchedDir = ["directory1"];
let total = 0;

/* Setup a object that will hold all the directories we enter, and add up the totals
of those directories */
const directories = {
  directory1: {
    totals: 0,
  },
};

// Use a switch statement to determine if we are passing a command or just directory data
for (let i = 0; i < terminalData.length; i++) {
  switch (true) {
    // If the first char passed is a $, then we know it is a command
    case /\$ cd/.test(terminalData[i]):
      // If the command includes '.', then we are leaving the directory
      if (/\./.test(terminalData[i])) {
        // Set the past directory to the last child created
        pastDirectory = touchedDir.at(-1);
        // Set the current directory to the parent before the last child directory created
        currentDirectory = touchedDir.at(-2);
        // If we are going back up to a parent directory, add up all the child directory totals
        directories[`${currentDirectory}`].totals +=
          directories[`${pastDirectory}`].totals;
        /* Remove the last child created from our touchedDir array as we have taken the totals 
        from that directory already */
        touchedDir.pop();
      } else {
        // Set out past diretory to our current directory, which is the parent directory
        pastDirectory = currentDirectory;
        // Create the child object key and values so we can reference it later
        currentDirectory = `directory${i}`;
        directories[`directory${i}`] = {
          parent: pastDirectory,
          totals: 0,
        };
        // Push the last child created to our touchedDir array
        touchedDir.push(currentDirectory);
      }
      break;
    // If the first char passed is a string of a num, then we know it is data
    case /\d/.test(terminalData[i]):
      // Getting only the numbers from the matching string, and parsing to integer
      let num = parseInt(terminalData[i].match(/\d+/).join(""));
      // Adding the data size to the totals for our current directory
      directories[`${currentDirectory}`].totals += num;
      break;
  }
}

// Itterating over each directory we touched
Object.keys(directories).forEach((key) => {
  // If the total is less than or equal to 100k, we add it up to our final total
  if (directories[key].totals <= 100000) {
    total += directories[key].totals;
  }
});

console.log('Answer to challenge one:', total);
