<template>
  <div class="Vide">
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'Vide',
  data () {
    return {
      msg: 'Faire les tests ici',
      posts: []
    }
  },
  created() {
    let com_ = db.ref("/communities")
    let cle = com_.key

    let com = {
      posts: { "id": "id" },
      nom: "Chiens",
      description: "Des images des chiens",
      suit: { "id": "id" }
    }

    //com_.push(com) ENLEVER LE COMMENTAIRE SI TU VEUX CREER UNE NOUVELLE COMMUNAUTE

    let commun = '-LSLz8rGF-jWOBgNokJD'
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
