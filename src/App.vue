<template>
  <div id="app">
    <div class="game-board">

      <NextTileCell :nextTileNumber="baseTileNumbers.slice(-1)[0]" />

      <div v-for="n in 4" class="row">
        <div v-for="n in 4" class="cell"></div>
      </div>

      <Tile v-for="tile in tiles" :tile="tile" />

    </div>

    <div v-on:click="newGame" class="new-game-button">
      New Game
    </div>

    <GameOverShroud v-show="score" :score="score" :newGame="newGame" />

  </div>
</template>

<script>
import GameOverShroud from './components/GameOverShroud.vue'
import NextTileCell from './components/NextTileCell.vue'
import Tile from './components/Tile.vue'
import {
  highestNumber,
  getTileByPosition,
  willThereBeSpaceInRow,
  willThereBeSpaceInCol,
  randomAvailbleRow,
  randomAvailbleCol,
  findScoreIfGameOver
} from './utilities.js'

const TRANSITION_INTERVAL = 200

export default {
  components: { GameOverShroud, NextTileCell, Tile },
  name: 'app',
  created: function () {
    this.newGame()
    window.addEventListener('keydown', this.move)
  },
  data: function () {
    return {
      tiles: [],
      score: 0,
      locked: false,
      baseTileNumbers: [],
      bigTileNumbers: [],
      test: false
    }
  },
  methods: {
    newGame() {
      this.initializeTiles()
      if(this.test) {
        this.tiles = [{x: 1, y: 1, number: 2, id: 2}, {x: 2, y: 1, number: 1, id: 1}]
      }
      this.score = 0
    },

    initializeTiles() {
      this.tiles = []

      this.resetBaseTileNumbers()

      const tileNumbers = this.baseTileNumbers.splice(3, 9)

      tileNumbers.forEach(number => {
        let x, y

        do {
          x = Math.floor(Math.random() * 4 + 1)
          y = Math.floor(Math.random() * 4 + 1)
        } while (this.tiles.find(tile => tile.x === x && tile.y === y))

        this.tiles.push({x, y, number, id: Math.random()})
      })
    },

    insertTile (side) {
      let targetRow, targetCol
      switch (side) {
        case 'left':
          targetRow = randomAvailbleRow(this.tiles)
          if (targetRow) {
            this.tiles.push({x: 0, y: targetRow, number: this.pickRandomTileNumber(), id: Math.random()})
          }
          break;
        case 'right':
          targetRow = randomAvailbleRow(this.tiles)
          if (targetRow) {
            this.tiles.push({x: 5, y: targetRow, number: this.pickRandomTileNumber(), id: Math.random()})
          }
          break;
        case 'top':
          targetCol = randomAvailbleCol(this.tiles)
          if (targetCol) {
            this.tiles.push({x: targetCol, y: 0, number: this.pickRandomTileNumber(), id: Math.random()})
          }
          break;
        case 'bottom':
          targetCol = randomAvailbleCol(this.tiles)
          if (targetCol) {
            this.tiles.push({x: targetCol, y: 5, number: this.pickRandomTileNumber(), id: Math.random()})
          }
          break;
        default:

      }
    },

    pickRandomTileNumber() {
      let randomTileNumber = this.baseTileNumbers.pop()

      if (this.baseTileNumbers.length === 0) {
        this.resetBaseTileNumbers()
      }

      const largestNumber = highestNumber(this.tiles)

      if (largestNumber >= 48) {

        for (let number = largestNumber / 8; number >= 6 ; number /= 2) {
          this.bigTileNumbers.push(number)
        }

        if (Math.random() < 1 / 21) {
          const randomIndex = Math.floor(Math.random() * this.bigTileNumbers.length)

          this.baseTileNumbers.push(this.bigTileNumbers[randomIndex])
        }

      }

      return randomTileNumber
    },

    resetBaseTileNumbers() {
      const unsortedNumbers = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]
      let randomIndex, randomNumber

      this.baseTileNumbers = []

      while (unsortedNumbers.length > 0) {
        randomIndex = Math.floor(Math.random() * unsortedNumbers.length)
        randomNumber = unsortedNumbers.splice(randomIndex, 1)[0]
        this.baseTileNumbers.push(randomNumber)
      }
    },

    move: function (event) {

      if (event.code === 'ArrowRight'
            || event.code === 'ArrowLeft'
            || event.code === 'ArrowUp'
            || event.code === 'ArrowDown'
            || event.code === 'Space') {
        event.preventDefault()
      }

      if (this.locked) return

      this.locked = true
      setTimeout(() => this.locked = false, TRANSITION_INTERVAL * 2)

      if (event.code === 'ArrowRight') {

        this.insertTile('left')
        setTimeout( () => {
          this.moveColumn(3, 'right')
          this.moveColumn(2, 'right')
          this.moveColumn(1, 'right')
          this.moveColumn(0, 'right')
          setTimeout(() => this.score = findScoreIfGameOver(this.tiles), TRANSITION_INTERVAL * 2 + 5)
        }, 15)

      } else if (event.code === 'ArrowLeft') {

        this.insertTile('right')
        setTimeout( () => {
          this.moveColumn(2, 'left')
          this.moveColumn(3, 'left')
          this.moveColumn(4, 'left')
          this.moveColumn(5, 'left')
          setTimeout(() => this.score = findScoreIfGameOver(this.tiles), TRANSITION_INTERVAL * 2 + 5)
        }, 15)

      } else if (event.code === 'ArrowUp') {

        this.insertTile('bottom')
        setTimeout( () => {
          this.moveRow(2, 'up')
          this.moveRow(3, 'up')
          this.moveRow(4, 'up')
          this.moveRow(5, 'up')
          setTimeout(() => this.score = findScoreIfGameOver(this.tiles), TRANSITION_INTERVAL * 2 + 5)
        }, 15)

      } else if (event.code === 'ArrowDown') {

        this.insertTile('top')
        setTimeout( () => {
          this.moveRow(3, 'down')
          this.moveRow(2, 'down')
          this.moveRow(1, 'down')
          this.moveRow(0, 'down')
          setTimeout(() => this.score = findScoreIfGameOver(this.tiles), TRANSITION_INTERVAL * 2 + 5)
        }, 15)
      } else if (event.code === 'Space') {

        this.newGame()
      }
    },

    combineIfPossible (movingTile, targetTile, increment, direction) {
      const num1 = movingTile.number
      const num2 = targetTile.number

      if ((num1 === num2 && num1 > 2) || (num1 + num2 === 3)) {

        if (direction === 'horizontal') {
          movingTile.top = true
          movingTile.x = movingTile.x + increment
        } else if (direction === 'vertical') {
          movingTile.top = true
          movingTile.y = movingTile.y + increment
        }

        setTimeout(() => {
            setTimeout(() => {
              this.tiles.splice(this.tiles.indexOf(targetTile), 1)
              movingTile.top = false
            }, TRANSITION_INTERVAL)
            movingTile.number = num1 + num2
          },
          TRANSITION_INTERVAL
        )
      }
    },

    moveColumn: function (colNum, direction) {
      const increment = direction === 'right' ? 1 : -1

      const tilesInCol = this.tiles.filter(tile => tile.x === colNum)

      tilesInCol.forEach(tile => {
        const targetTile = getTileByPosition(tile.x + increment, tile.y, this.tiles)
        if (!targetTile) {
          tile.x = tile.x + increment
        } else {
          this.combineIfPossible(tile, targetTile, increment, 'horizontal')
        }
      })
    },

    moveRow: function (rowNum, direction) {
      const increment = direction === 'down' ? 1 : -1

      const tilesInRow = this.tiles.filter(tile => tile.y === rowNum)

      tilesInRow.forEach(tile => {
        const targetTile = getTileByPosition(tile.x , tile.y + increment, this.tiles)
        if (!targetTile) {
          tile.y = tile.y + increment
        } else {
          this.combineIfPossible(tile, targetTile, increment, 'vertical')
        }
      })
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans+Condensed');

body {
  height: 100vh;
  width: 100vw;
  min-height: 625px;
}

#app {
  font-family: 'Fira Sans Condensed', sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%
}

.row {
  display: flex;
}

.cell {
  width: 56px;
  height: 86.90169943749474px;
  background-color: #bbd9d9;
  border-radius: 5px;
  margin: 5px;
}

.game-board {
  position: relative;
  margin-bottom: 21px;
  background-color: #cfe7e0;
  border-radius: 15px;
  padding: 5px;
  border-bottom: 7px #bbd9d9 solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.new-game-button {
  text-align: center;
  font-size: 20px;
  background-color: #777e8c;
  border-bottom: 5px #494766 solid;
  border-radius: 5px;
  color: white;
  margin-bottom: 25px;
  padding: 4px 15px;
  cursor: pointer;
}

</style>
