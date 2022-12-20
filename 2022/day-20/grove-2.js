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

let encryNums = []

nums.forEach(num => {
  encryNums.push([num[0], num[1] * 811589153])
})

for (let y = 0; y < 10; y++) {
  for (let i = 0; i < len; i++) {
    let xIndex2 = 0;
    for (let x = 0; x < len; x++) {
      if (encryNums[x][0] == i) {
        break;
      }
      xIndex2++;
    }

    let x = encryNums[xIndex2][1];
    x %= (len - 1)

    if (x < 0) {
      let currentIndex = xIndex2;
      for (let i = 0; i > x; i--) {
        encryNums = swapNums(
          encryNums,
          currentIndex,
          (currentIndex - 1) % len
        );
        currentIndex = (currentIndex - 1) % len;
      }
      continue;
    }
  
    if (x > 0) {
      let currentIndex = xIndex2;
      for (let i = 0; i < x; i++) {
        encryNums = swapNums(
          encryNums,
          currentIndex,
          (currentIndex + 1) % len
        );
        currentIndex = (currentIndex + 1) % len;
      }
    }
  }
}

let valuesChall2 = 0
let startIndex2 = 0
const coordinates = [1000, 2000, 3000]

for (let i = 0; i < len; i++) {
  if (encryNums[i][1] == 0) {
    break
  }
  startIndex2++
}

for (let i = 0; i < coordinates.length; i++) {
  valuesChall2 += encryNums[(startIndex2 + coordinates[i]) % len][1]
}

console.log('Answer to challenge two:', valuesChall2)