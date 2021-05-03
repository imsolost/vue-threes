function calculateScore (tiles) {
  let score = 0
  tiles.forEach(tile => {
    if (tile.number > 2) {
      score += 3 ** (Math.log2(tile.number / 3) + 1)
    }
  })
  return score
}

function highestNumber (tiles) {
  return tiles.reduce((accumulator, tile) => {
    return tile.number > accumulator ? tile.number : accumulator
  }, 0)
}

function getTileByPosition (x, y, tiles) {
  return tiles.find(tile => tile.x === x && tile.y === y)
}

function willThereBeSpaceInRow(rowNum, tiles) {
  const rowTiles = []
  let isEmptySpace = false

  for (let colNum = 1; colNum <= 4; colNum++) {
    rowTiles[colNum] = getTileByPosition(colNum, rowNum, tiles)
    if (!rowTiles[colNum]) isEmptySpace = true
  }

  if (isEmptySpace) return true

  for (let colNum = 1; colNum <= 3; colNum++) {
    const num1 = rowTiles[colNum].number
    const num2 = rowTiles[colNum + 1].number

    if ((num1 === num2 && num1 > 2) || (num1 + num2 === 3)) {
      return true
    }
  }

  return false
}

function willThereBeSpaceInCol(colNum, tiles) {
  const colTiles = []
  let isEmptySpace = false

  for (let rowNum = 1; rowNum <= 4; rowNum++) {
    colTiles[rowNum] = getTileByPosition(colNum, rowNum, tiles)
    if (!colTiles[rowNum]) isEmptySpace = true
  }

  if (isEmptySpace) return true

  for (let rowNum = 1; rowNum <= 3; rowNum++) {
    const num1 = colTiles[rowNum].number
    const num2 = colTiles[rowNum + 1].number

    if ((num1 === num2 && num1 > 2) || (num1 + num2 === 3)) {
      return true
    }
  }

  return false
}

function randomAvailbleRow(tiles) {
  const availableRows = []
  for (let rowNum = 1; rowNum <= 4; rowNum++) {
    if (willThereBeSpaceInRow(rowNum, tiles)) {
      availableRows.push(rowNum)
    }
  }

  if (availableRows.length === 0) return undefined

  const randomIndex = Math.floor(Math.random() * availableRows.length)

  return availableRows[randomIndex]
}

function randomAvailbleCol(tiles) {
  const availableCols = []
  for (let colNum = 1; colNum <= 4; colNum++) {
    if (willThereBeSpaceInCol(colNum, tiles)) {
      availableCols.push(colNum)
    }
  }

  if (availableCols.length === 0) return undefined

  const randomIndex = Math.floor(Math.random() * availableCols.length)

  return availableCols[randomIndex]
}

function isGameOver(tiles) {
  const availableCols = []
  const availableRows = []

  for (let colNum = 1; colNum <= 4; colNum++) {
    if (willThereBeSpaceInCol(colNum, tiles)) {
      availableCols.push(colNum)
    }
  }

  for (let rowNum = 1; rowNum <= 4; rowNum++) {
    if (willThereBeSpaceInRow(rowNum, tiles)) {
      availableRows.push(rowNum)
    }
  }

  return availableRows.length === 0 && availableCols.length === 0
}

function findScoreIfGameOver (tiles) {
  if ( isGameOver(tiles) ) {
    return calculateScore(tiles)
  }
}


export {
  highestNumber,
  getTileByPosition,
  willThereBeSpaceInRow,
  willThereBeSpaceInCol,
  randomAvailbleRow,
  randomAvailbleCol,
  findScoreIfGameOver
}
