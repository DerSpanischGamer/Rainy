<template>
  <div class="Vide">
    <v-text-field
    v-model="nom"
    label="Nom"
    required> </v-text-field>
    <v-text-field
    v-model="description"
    label="Description"
    required> </v-text-field>
    <v-btn @click="nouvelleCom"> Creer une nouvelle communaute </v-btn>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'Vide',
  data () {
    return {
      msg: 'Faire les tests ici',
      nom: '',
      description: ''
    }
  },
  created () {
    let user = app.auth().currentUser

    console.log(admin.auth().getUser(uid))
    //TODO: uncomment pour quand on lance le site
    /*if (user != null) {
      if (user.role != "admin") { router.push('/') }
    } else { router.push('/') } */
  },
  methods: {
    nouvelleCom: function () {
        let com_ = db.ref("/communities")
        let cle = com_.key

        let com = {
          description: "Des images des filles chat",
          nom: "Filles chat",
          posts: { "id": "id" },
          suit: { "id": "id" }
        }

        com_.push(com)
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
