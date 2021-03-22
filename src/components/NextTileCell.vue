<template>

  <div class="next-tile-cell">
    <div :class=" nextTileNumber === 1
      ? 'tile-one next-tile'
        : nextTileNumber === 2
        ? 'tile-two next-tile'
          : 'next-tile' ">
    </div>
    <div>
      Next
    </div>
  </div>

</template>

<script>
  export default {
    name: 'NextTileCell',
    props: ['nextTileNumber']
  }
</script>

<style>

.next-tile {
  width: 25px;
  height: 36.45px;
  border-bottom: 5px #ffcc66 solid;
  border-radius: 4px;
  border-bottom-width: 4px;
  position: relative;
  font-size: 18px;
  text-align: center;
  font-style: bold;
  line-height: 36.45px;
  background-color: white;
  margin-bottom: 5px;
  transition: 200ms;
  font-family: 'Fira Sans Condensed', sans-serif;
}

.next-tile-cell {
  padding: 5px;
  width: 30px;
  background-color: #bbd9d9;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
