// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

const structure = [];

// Splitting the data on (->) to get pairs
const data = input.split(/\n/).map((line) => line.split("->"));

/* I found this handy filter technique on stack overflow to remove
any duplicate data */
const numbers = [].filter((a) => !(2 - (this[a] = ++this[a] | 0)));

/* Splitting each side by the comma and parsing to integer then
adding it back together*/
for (let i = 0; i < data.length; i++) {
  let arr = [];
  for (let y = 0; y < data[i].length; y++) {
    let split = data[i][y].split(",");
    arr.push([parseInt(split[0]), parseInt(split[1])]);
  }
  numbers.push(arr);
}

/* Checking each pair to create our map structure*/
for (let i = 0; i < numbers.length; i++) {
  for (let x = 1; x < numbers[i].length; x++) {
    let start = numbers[i][x - 1];
    let end = numbers[i][x];

    if (start[1] < end[1]) {
      for (let y = 0; y < end[1] - start[1]; y++) {
        let arr = [start[0], start[1] + y];
        structure.push(arr);
      }
    }

    if (start[1] > end[1]) {
      for (let y = 0; y < start[1] - end[1]; y++) {
        let arr = [start[0], start[1] - y];
        structure.push(arr);
      }
    }

    if (start[0] > end[0]) {
      for (let y = 0; y < start[0] - end[0] + 1; y++) {
        let arr = [start[0] - y, start[1]];
        structure.push(arr);
      }
    }

    if (start[0] < end[0]) {
      for (let y = 0; y < end[0] - start[0] + 1; y++) {
        let arr = [start[0] + y, start[1]];
        structure.push(arr);
      }
    }

    let arr = [end[0], end[1]];
    structure.push(arr);
  }
}

// Here is our final map with our structures

const map = structure.filter(((t = {}), (a) => !(t[a] = a in t)));

// X-Coordinates = 457 lowest, 520 highest (X length 63)
// Y-Coordinates = 13 lowest, 161 highest (Y length 148)

// Start at (500, 0)

const exists = (x, y) => {
  const checkMap = JSON.stringify(map);
  const coordinates = JSON.stringify([x, y]);

  if (checkMap.includes(coordinates)) {
    return true;
  } else {
    return false;
  }
};

// Drop our sand down the map
const dropSand = () => {
  /* While the y coordinates never go higher than 161,
  if they do, we know the sand fell off the side of the map*/
  let sand = 0;
  let x = 500;
  let y = 0;

  while (y <= 161) {
    y++;
    // If we find an existing node
    if (exists(x, y)) {
      // If left side and right side exists, add sand above and start over
      if (exists(x - 1, y) && exists(x + 1, y)) {
        map.push([x, y - 1]);
        sand++;
        x = 500;
        y = 0;
        continue;
      }
      // If left side does not exist
      if (!exists(x - 1, y)) {
        // Go one step down and to the left
        x--;
        continue
      }
      // If left side does exist
      if (exists(x - 1, y)) {
        // Go one step down and to the right
        x++;
        continue
      }
    }
  }
  return sand;
};

console.log('Answer to challenge one:', dropSand());

// Challenge two (Takes way to long to run, I need to come back to this challenge and optmize it)

const chall2Map = structure.filter(((t = {}), (a) => !(t[a] = a in t)));
for (let i = 0; i < 1000; i++) {
  chall2Map.push([i, 164])
}

const chall2Exists = (x, y) => {
  const checkMap = JSON.stringify(chall2Map);
  const coordinates = JSON.stringify([x, y]);

  if (checkMap.includes(coordinates)) {
    return true;
  } else {
    return false;
  }
};

// Drop our sand down the map
const dropSandWithFloor = () => {
  /* While the y coordinates never go higher than 161,
  if they do, we know the sand fell off the side of the map*/
  let sand = 0;
  let x = 500;
  let y = 0;
  let top = false

  while (!top) {
    y++;
    // If we find an existing node
    if (chall2Exists(x, y)) {
      // If left side and right side exists, add sand above and start over
      if (chall2Exists(x - 1, y) && chall2Exists(x + 1, y)) {
        chall2Map.push([x, y - 1]);
        sand++;

        console.log([x, y - 1])

        if ((chall2Exists(1, 500))) {
          top = true;
          continue
        } else {
          x = 500;
          y = 0;
          continue;
        }
      }
      // If left side does not exist
      if (!chall2Exists(x - 1, y)) {
        // Go one step down and to the left
        x--;
        continue
      }
      // If left side does exist
      if (chall2Exists(x - 1, y)) {
        // Go one step down and to the right
        x++;
        continue
      }
    }
  }
  return sand;
};

console.log('Answer to two:', dropSandWithFloor());