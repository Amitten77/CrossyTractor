let startingGameBoard = [[0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]

const ROW_COUNT = 3
const COLUMN_COUNT = 7

function getRandomInt(min, max) {
    // Ensure that min and max are integers (in case they are passed as floats)
    min = Math.floor(min);
    max = Math.floor(max);
  
    // Swap min and max if necessary
    if (min > max) {
      [min, max] = [max, min];
    }
  
    // Calculate the range and generate a random number within that range
    const range = max - min + 1;
    const randomFloat = Math.random() * range;
  
    // Return the final random integer
    return Math.floor(randomFloat) + min;
  }

function isSpotEmpty(row, col) {
    if (startingGameBoard[row][col]==0) {
      return true
    }
}


function obstaclePlacement() {
    const obstaclePlacementNumForListIndex = getRandomInt(0, 2)
    if (isSpotEmpty(obstaclePlacementNumForListIndex, 6)) {
      startingGameBoard[obstaclePlacementNumForListIndex][6] = 1
    }
}
  
function cornPlacement() {
    const cornPlacementNumForListIndex = getRandomInt(0,2)
    if (isSpotEmpty(cornPlacementNumForListIndex, 6)) {
      startingGameBoard[cornPlacementNumForListIndex][6] = 2
    }
}

cornPlacement()
console.log(startingGameBoard)


function updateLocationOfPieces() {
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        if (startingGameBoard[row][col] != 0 && startingGameBoard[row][col] != 3) {
          if (col != 0) {
            if (startingGameBoard[row][col] == 1) {
              startingGameBoard[row][col-1] = 1
              startingGameBoard[row][col] = 0
            } else if (startingGameBoard[row][col] == 2) {
              startingGameBoard[row][col-1] = 2
              startingGameBoard[row][col] = 0
            }
          } else {
            startingGameBoard[row][col] = 0
          }
        }
      }
    }
  }

updateLocationOfPieces()
console.log(startingGameBoard)