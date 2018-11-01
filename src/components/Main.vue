<template>
  <div class="Main">
  <p> Hell be like </p>
  <p v-show="connecte"> {{this.utilisateur}} </p>
    <v-img :src="'https://i.imgur.com/kHiOUcE.gif'" height="300" width="300" gradient="to bottom, rgba(0,0,0,0), rgba(255,0,0,1)"> </v-img>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      utilisateur: 'fsdfsdf',
      connecte: false
    }
  },
  created () {
    let uti = app.auth().currentUser

    if (uti != null) { // CA C'EST A TOI NICOLY DE VOIR POURQUOI CA NE MARCHE PAS
      this.connecte = true
      this.utilisateur = uti.displayName
      console.log("yay")
      console.log(this.connecte)
    } else {
      console.log("ljknfgjkb")
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
