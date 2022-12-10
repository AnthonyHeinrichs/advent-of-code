const commands = require("./data/program-cycles");

// Challenge one

let cycle = 0;
let x = 1;
let total = 0;

const checkCycle = () => {
  /* If cycle counter is (20, 60, 100, 140, 180, 220), then we take the current x amount
  and times it by the current cycle and add it to our total*/
  switch (cycle) {
    case 20:
      total += 20 * x;
      break;
    case 60:
      total += 60 * x;
      break;
    case 100:
      total += 100 * x;
      break;
    case 140:
      total += 140 * x;
      break;
    case 180:
      total += 180 * x;
      break;
    case 220:
      total += 220 * x;
      break;
  }
};

for (let i = 0; i < commands.length; i++) {
  // If cycle command is noop, then we add one cycle to our cycle counter, don't update x
  if (commands[i] == "noop") {
    cycle++;
    checkCycle();
  } else {
    // If cycle command is 'addx', then we add two cycles to our cycle counter and update x
    let num = parseInt(commands[i].match(/(\d|-)+/g).pop());
    cycle++;
    // Check the cycle each time we add one to counter
    checkCycle();
    cycle++;
    checkCycle();
    x += num;
  }
}

console.log("Answer to challenge one:", total);

// Challenge two

const pixels = [[], [], [], [], [], []];

let xx = 1;
let cyc = 0;

/* Checking if there is a lit pixel at our current cycle num.
I know this is ugly, but it's early and I am tired :) */
const checkPixel = () => {
  if (cyc >= 1 && cyc <= 40) {
    rowCyc = cyc - 1;
    if (rowCyc == xx || rowCyc + 1 == xx || rowCyc - 1 == xx) {
      pixels[0].push("#");
    } else {
      pixels[0].push(" ");
    }
  } else if (cyc >= 41 && cyc <= 80) {
    rowCyc = cyc - 41;
    if (rowCyc == xx || rowCyc + 1 == xx || rowCyc - 1 == xx) {
      pixels[1].push("#");
    } else {
      pixels[1].push(" ");
    }
  } else if (cyc >= 81 && cyc <= 120) {
    rowCyc = cyc - 81;
    if (rowCyc == xx || rowCyc + 1 == xx || rowCyc - 1 == xx) {
      pixels[2].push("#");
    } else {
      pixels[2].push(" ");
    }
  } else if (cyc >= 121 && cyc <= 160) {
    rowCyc = cyc - 121;
    if (rowCyc == xx || rowCyc + 1 == xx || rowCyc - 1 == xx) {
      pixels[3].push("#");
    } else {
      pixels[3].push(" ");
    }
  } else if (cyc >= 161 && cyc <= 200) {
    rowCyc = cyc - 161;
    if (rowCyc == xx || rowCyc + 1 == xx || rowCyc - 1 == xx) {
      pixels[4].push("#");
    } else {
      pixels[4].push(" ");
    }
  } else if (cyc >= 201 && cyc <= 240) {
    rowCyc = cyc - 201;
    if (rowCyc == xx || rowCyc + 1 == xx || rowCyc - 1 == xx) {
      pixels[5].push("#");
    } else {
      pixels[5].push(" ");
    }
  }
};

checkPixel();

for (let i = 0; i < commands.length; i++) {
  if (commands[i] == "noop") {
    cyc++;
    // Check if a pixel exists at current cycle
    checkPixel();
  } else {
    // Get the number from the commands
    let num = parseInt(commands[i].match(/(\d|-)+/g).pop());
    cyc++;
    // Check if a pixel exists at current cycle
    checkPixel();
    cyc++;
    // Check if a pixel exists at current cycle
    checkPixel();
    // Update our x number
    xx += num;
  }
}

// Log out each pixel array to get our letters
console.log("Answer to challenge two:");
for (let i = 0; i < pixels.length; i++) {
  console.log(...pixels[i]);
}
