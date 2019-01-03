<template>
  <div class="Vide">
    <v-layout row wrap class="pt-5" justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-text-field
        v-model="nom"
        label="Nom"
        > </v-text-field>
        <v-text-field
        v-model="description"
        label="Description"
        > </v-text-field>
        <v-btn @click="nouvelleCom"> Creer une nouvelle communaute </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Vide',
  data () {
    return {
      msg: 'Faire les tests ici',
      // Variables
      nom: '', // le nom de la communaute
      description: '' // la description de la communaute
    }
  },
  created () {
    let user = app.auth().currentUser

    if (user == null || !user.emailVerified) { router.push('/'); return }
    db.ref('users/' + user.uid).once('value')
    .then((data) => {
      if (data.val().role != 'admin') { return }
    })
    .catch(function(error) {
      router.push('/')
      return
    })
  },
  methods: {
    nouvelleCom: function () {
      let com_ = db.ref('communities/')

      let com = {
        description: this.description,
        nom: this.nom,
        posts: { "id": "id" },
        suit: { "id": "id" }
      }

      com_.push(com)
      .then((snap) => {
        const key = snap.key
        console.log(key)

        db.ref('communities/index').once('value')
        .then((data) => {
          const obj = data.val()

          obj[key] = com.nom

          db.ref('communities/index').set(obj)
        })
      })
    }
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
