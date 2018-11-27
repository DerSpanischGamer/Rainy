<template>
  <div class="Main">
  </div>
</template>

<script>
export default {
  name: 'vide',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    let myRef = db.ref("/communities")
    let cle = myRef.key

    let com = {
      posts: [],
      nom: "Chiens",
      description: "Des images des chiens",
      suit: [ "7tt0PkwvO5VC9wdOkaLYYd3vtIs1" ]
    }

    //myRef.push(com) ENLEVER LE COMMENTAIRE SI TU VEUX CREER UNE NOUVELLE COMMUNAUTE
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
