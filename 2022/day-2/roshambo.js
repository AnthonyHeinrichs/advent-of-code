const roshambo = require("./data/tournament-data");

// First challenge

let convertedArr = []

const convertResults = (arr) => {
  let newArr = []

  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].split(" "))
  }

  return newArr
}

convertedArr = convertResults(roshambo)

const calculateTournamentResults = (arr) => {
  let roundScore = 0
  let chosenWeaponScore = 0
  let totalScore = 0

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == 'A') {
      if (arr[i][1] == 'X') {
        roundScore = 3
        chosenWeaponScore = 1
      } else if (arr[i][1] == 'Y') {
        roundScore = 6
        chosenWeaponScore = 2
      } else if (arr[i][1] == 'Z') {
        roundScore = 0
        chosenWeaponScore = 3
      }
    } else if (arr[i][0] == 'B') {
      if (arr[i][1] == 'X') {
        roundScore = 0
        chosenWeaponScore = 1
      } else if (arr[i][1] == 'Y') {
        roundScore = 3
        chosenWeaponScore = 2
      } else if (arr[i][1] == 'Z') {
        roundScore = 6
        chosenWeaponScore = 3
      }
    } else if (arr[i][0] == 'C') {
      if (arr[i][1] == 'X') {
        roundScore = 6
        chosenWeaponScore = 1
      } else if (arr[i][1] == 'Y') {
        roundScore = 0
        chosenWeaponScore = 2
      } else if (arr[i][1] == 'Z') {
        roundScore = 3
        chosenWeaponScore = 3
      }
    }
    totalScore += roundScore + chosenWeaponScore
  }
  return totalScore
}

console.log('First challenge reuslts', calculateTournamentResults(convertedArr))

// Second challenge

const calculateTournamentResultsAgain = (arr) => {
  let roundScore = 0
  let chosenWeaponScore = 0
  let totalScore = 0

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] == 'X') {
      if (arr[i][0] == 'A') {
        roundScore = 0
        chosenWeaponScore = 3
      } else if (arr[i][0] == 'B') {
        roundScore = 0
        chosenWeaponScore = 1
      } else if (arr[i][0] == 'C') {
        roundScore = 0
        chosenWeaponScore = 2
      }
    } else if (arr[i][1] == 'Y') {
      if (arr[i][0] == 'A') {
        roundScore = 3
        chosenWeaponScore = 1
      } else if (arr[i][0] == 'B') {
        roundScore = 3
        chosenWeaponScore = 2
      } else if (arr[i][0] == 'C') {
        roundScore = 3
        chosenWeaponScore = 3
      }
    } else if (arr[i][1] == 'Z') {
      if (arr[i][0] == 'A') {
        roundScore = 6
        chosenWeaponScore = 2
      } else if (arr[i][0] == 'B') {
        roundScore = 6
        chosenWeaponScore = 3
      } else if (arr[i][0] == 'C') {
        roundScore = 6
        chosenWeaponScore = 1
      }
    }
    totalScore += roundScore + chosenWeaponScore
  }
  return totalScore
}

console.log('Second challenge reuslts', calculateTournamentResultsAgain(convertedArr))