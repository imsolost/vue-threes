<template>

  <div  :key="tile.id"
        :style="{
          top: `${ (tile.y-1) * (86.90169943749474 + 10) + 10 + 104.7}px`,
          left: `${ (tile.x - 1) * (56 + 10) + 13}px`
          }"
        :class="
          (tile.number === 1 ? 'tile-one tile' :
          tile.number === 2 ? 'tile-two tile' : 'tile')
          .concat(tile.top ? ' top' : '') ">
    {{tile.number}}
  </div>

</template>

<script>
  export default {
    name: 'Tile',
    props: ['tile']
  }
</script>

<style>

.top {
  z-index: 5;
}

.tile {
  width: 50px;
  height: 75.90169943749474px;
  border-bottom: 5px #ffcc66 solid;
  border-radius: 7px;
  position: absolute;
  text-align: center;
  font-size: 35px;
  font-style: bold;
  line-height: 80.90169943749474px;
  background-color: white;
  transition: 200ms;
  font-family: 'Fira Sans Condensed', sans-serif;
}

.tile-one {
  background-color: #72caf2;
  color: white;
  border-color: #6ba6da;
}

.tile-two {
  background-color: #f16780;
  color: white;
  border-color: #cd537c;
}

</style>
