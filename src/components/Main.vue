<template>
  <div class="Main">
  <p> Hell be like </p>
    <v-img :src="'https://i.imgur.com/kHiOUcE.gif'" height="300" width="300" gradient="to bottom, rgba(0,0,0,0), rgba(255,0,0,1)"> </v-img>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mail: ''
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
