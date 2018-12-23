<template>
  <div id="app" >
    <p v-show="connecte"> {{this.utilisateur}} </p>
  <div class="text-xs-center">
 </div>


    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      connecte: false,
      utilisateur: '',
      id : ''
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
