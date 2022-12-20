// Pull in our data from our text file and parse it
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./data/input.txt");
const input = fs.readFileSync(filePath, "utf8");

const data = input.split("\n").map((num) => Number(num));

const nums = [];

for (let i = 0; i < data.length; i++) {
  nums.push([i, data[i]]);
}

const len = nums.length

const swapNums = (nums, a, b) => {
  let numA = nums[a]
  let numB = nums[b]

  if (a < 0) {
    numA = nums[len + a]
  }

  if (b < 0) {
    numB = nums[len + b]
  }

  if (a < 0) {
    nums[len + a] = numB
  } else {
    nums[a] = numB
  }

  if (b < 0) {
    nums[len + b] = numA
  } else {
    nums[b] = numA
  }

  return nums;
};

let swappedNums = nums

for (let i = 0; i < len; i++) {
  let xIndex = 0;
  for (let x = 0; x < len; x++) {
    if (swappedNums[x][0] == i) {
      break;
    }
    xIndex++;
  }

  const x = swappedNums[xIndex][1];

  if (x < 0) {
    let currentIndex = xIndex;
    for (let i = 0; i > x; i--) {
      swappedNums = swapNums(
        swappedNums,
        currentIndex,
        (currentIndex - 1) % len
      );
      currentIndex = (currentIndex - 1) % len;
    }
    continue;
  }

  if (x > 0) {
    let currentIndex = xIndex;
    for (let i = 0; i < x; i++) {
      swappedNums = swapNums(
        swappedNums,
        currentIndex,
        (currentIndex + 1) % len
      );
      currentIndex = (currentIndex + 1) % len;
    }
  }
}

const coordinates = [1000, 2000, 3000]

let startIndex = 0

let values = 0

for (let i = 0; i < len; i++) {
  if (swappedNums[i][1] == 0) {
    break
  }
  startIndex++
}

for (let i = 0; i < coordinates.length; i++) {
  values += swappedNums[(startIndex + coordinates[i]) % len][1]
}

console.log('Answer to challenge one:', values)