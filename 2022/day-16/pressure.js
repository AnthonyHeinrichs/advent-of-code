// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

const data = input.split("\n").map((line) => line.split(" "));

const map = new Map();

const addNode = (valve, value) => {
  map.set(valve, { rate: value, edges: [] } )
}

const addEdge = (origin, [...destination]) => {
  for (let i = 0; i < destination.length; i++) {
    map.get(origin).edges.push(destination[i])
  }
}

data.forEach((line) => {
  let flowRate = parseInt(line[4].slice(5))
  let node = line[1]
  addNode(node, flowRate)
});

data.forEach(line => {
  let len = line.length - 9;
  let node = line[1]  
  let dest = []  

  // Add edges
  for (let i = 0; i < len; i++) {
    if (line[9 + i].includes(',')) {
      dest.push(line[9 + i].slice(0, -1));
    } else {
      dest.push(line[9 + i]);
    }
  }
  addEdge(node, dest)
});

console.log(map)



