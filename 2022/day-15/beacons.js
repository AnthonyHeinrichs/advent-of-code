// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

// Parsing our data. Splitting bynew line and then by each space
const data = input.split("\n").map((line) => line.split(" "));

// Challenge one

// Storing all of our sensors and beacons in an array
const sensors = [];
const beacons = [];

// Storing our row for checking beacon locations
const intersection = 2000000;

// Pushing our sensor and beacon numbers into our variables
data.forEach((line) => {
  let xSensor = parseInt(line[2].slice(2));
  let ySensor = parseInt(line[3].slice(2));
  let xBeacon = parseInt(line[8].slice(2));
  let yBeacon = parseInt(line[9].slice(2));

  sensors.push([xSensor, ySensor]);
  beacons.push([xBeacon, yBeacon]);
});

/* Setup a function that will compute our manhattan distance
manhattan distance equation is |x₁ - x₂| + |y₁ - y₂|  */
const manDist = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

// Variable for the manhattan distances for all our senor & beacon pairs
const distances = [];

// Get the manhattan distances betwene each of our sensors and beacons
for (let i = 0; i < sensors.length; i++) {
  distances.push(manDist(sensors[i], beacons[i]));
}

let positions = [];

for (let i = 0; i < sensors.length; i++) {
  /* We need to get the remaining x dif by taking our distances
  and subtracting the abs value of our y dif minues our 
  interesction (2000000) */
  const distX = distances[i] - Math.abs(sensors[i][1] - intersection);

  // If the x dif is less than 0, than this area can contain a beacon
  if (distX <= 0) {
    continue;
  }

  // If the x dif is greater than 0, we can push it to our pos list
  positions.push([sensors[i][0] - distX, sensors[i][0] + distX]);
}

/* We need to get the minimum and max x dif from our positions list
because it is possible that these may overlap */
const left = [];
const right = [];

for (let i = 0; i < positions.length; i++) {
  left.push(positions[i][0]);
  right.push(positions[i][1]);
}

const min = Math.min(...left);
const max = Math.max(...right);

// Check for any overlaps
const overlap = [];

for (let i = 0; i < beacons.length; i++) {
  if (beacons[i][1] == intersection) {
    overlap.push(beacons[i][0]);
  }
}

let cannotContainBeacon = 0;

// Iterating over our range of our min x dif, and max x dif
for (let x = min; x <= max; x++) {
  // If x is included in our overlaps, skip next check.
  if (overlap.includes(x)) {
    continue;
  }
  // If the position is within our range, it cannot contain beacon
  for (let i = 0; positions.length; i++) {
    if (positions[i][0] <= x && x <= positions[i][1]) {
      cannotContainBeacon += 1;
      break;
    }
  }
}

console.log("Answer to challenge one:", cannotContainBeacon);
