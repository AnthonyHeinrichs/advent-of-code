// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

const data = input.split("\n").map((line) => line.split(" "));

console.log(data);

const map = {};

data.forEach((line) => {
  let len = line.length - 9;

  map[line[1]] = {
    flowRate: parseInt(line[4].slice(5)),
    neighbors: [],
  };

  for (let i = 0; i < len; i++) {
    map[line[1]].neighbors.push(line[9 + i]);
  }
});
