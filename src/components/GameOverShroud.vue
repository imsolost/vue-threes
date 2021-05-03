<template>
  <div class="game-over-shroud">

    <div>
      Game Over
    </div>

    <div>
      Score: {{score}}
    </div>

    <div v-on:click="newGame" class="new-game-shroud-button">
      Try Again
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GameOverShroud',
    props: ['score','newGame']
  }
</script>

<style>

.game-over-shroud {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ddd;
  font-size: 30px;
  line-height: 60px;
  padding-top: 216px;
  z-index: 10;
}

.new-game-shroud-button {
  text-align: center;
  background-color: hsl(220, 8%, 30%);
  border-radius: 5px;
  border-bottom: 5px hsl(220, 8%, 12%) solid;
  position: absolute;
  top: 555px;
  font-size: 20px;
  line-height: 30px;
  padding: 4px 25px;
  cursor: pointer;
}

</style>
