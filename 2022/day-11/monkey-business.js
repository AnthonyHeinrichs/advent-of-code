/* In my last challenges I was manually parsing some 
of the data, but I am taking some time on this challenge
to understand how to parse the raw data from a txt file
to avoid manual parsing and human error */

// Built in node file system module to help with reading files
const fs = require("fs");
// Built in node path module to help with building file paths
const path = require("path");
// Get the relevant file path of our txt data file
const filePath = path.join(__dirname, "./data/input.txt");

// Read the data file from our saved file path above
const data = fs.readFileSync(filePath, "utf8");

// Challenge one

// Parse our data to an object that we can iterate through

// Split array on each new line
const parse = input => input.toString().split("\n\n")
/* Returning a new array, for each line we are splitting
the line on the colon (:) so we can remove unecessary data*/  

// Only return the data that occurs after the colon (:)
.map(group => group.split("\n").map(lines => lines.split(":")[1])
 
/* Map again and return an array that converts our strings to 
actual numbers and removes unecessary data*/
).map(([, items, operation, ...test]) => [
  // Split each number on the ',' and convert to number
  items.split(",").map(Number),
  // Spliting our operation on each space and only returning last 3
  operation.split(" ").slice(-3),
  // Splitting our test on each space and converting to number
  test.map(t => t.split(" ").map(Number).at(-1)),
])
// Map one last time and convert our array to an object
.map(([items, [...operation], [...test]]) => ({
  items,
  operation,
  divisible: test[0],
  true: test[1],
  false: test[2],
  inspectedCounter: 0
}));

/* For the second challenge we start working with very big numbers, eventually 
these numbers become to big for Javascript to handle them, they become 
'infinity'. Since we do not need exact numbers, we just need to make sure our 
division tests pass, we can reduce each number by a common divisor number. */

// Getting all our test divisor data from our input
const divisbleArray = []
const newObj = parse(data)

for (const monkey of newObj) {
  divisbleArray.push(monkey.divisible)
}

/* To get the divisor number for reducing our large integers, we multiply 
all our test 'divisible' numbers together */
const divisors = divisbleArray.reduce( (a, b) => a * b)

const run = (input, div, rounds) => {
  /* Evaluate the items being thrown by the monkeys for as many
  rounds as passed to our function */
  const data = parse(input)

  for (let i = 0; i < rounds; i++) {
    // Iterate over each monkey
    for (const monkey of data) {
      // Iterate over each item the monkey currently holds
      monkey.items.forEach(item => {
        /* For each of our items, determine our steps from our input data,
        determine if our operation uses the existing item number or a new one*/
        let num = (monkey.operation[2] == 'old' ? item : monkey.operation[2])
        // Update our worry level for that item by reading the operation in our input
        let worry = eval(`${item}${monkey.operation[1]}${num}`)
        /* Divide our item by the number passed to our function, 
        and reduce using our divisor */
        let evalItem = Math.trunc(worry / div) % divisors
        /* Check if our item with new worry level is divisible by the number passed
        in our inputs test, then throw item to new monkey based on input data*/
        if (evalItem % monkey.divisible == 0) {
          data[monkey.true].items.push(evalItem)
        } else {
          data[monkey.false].items.push(evalItem)
        }
        // Add an inspection to our monkey's inspection counter
        monkey.inspectedCounter++
      })
      monkey.items = []
    }
 }
  const inspections = []
  // Pushing each of our number of inspections to an array
  data.forEach(monkey => {
    inspections.push(monkey.inspectedCounter)
  })
  // Getting the highest inpsections number from our inspections array
  const num1 = Math.max(...inspections)
  const index = inspections.indexOf(num1)
  inspections.splice(index, 1)
  // Getting second highest inspections number 
  const num2 = Math.max(...inspections)
  // Returning the result of highest * second highest 
  return(num1 * num2)
}

console.log('Answer to challenge one:', run(data, 3, 20))

console.log('Answer to challenge two:', run(data, 1, 10000))


