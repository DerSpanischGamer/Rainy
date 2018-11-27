<template>
  <div class="Main"
  <p v-show="connecte"> {{this.utilisateur}} </p>
  
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      utilisateur: 'rien',
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
      // MONTRER EN HAUT DROITE LOGIN
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
