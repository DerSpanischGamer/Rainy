<template>
  <div class="Monter">
    <v-app>
      <h1> Post une image de ton animal de compagnie </h1>
      <v-layout row wrap class="pt-5" justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
            v-model="titre"
            label="Titre"
            required
            ></v-text-field>
            <v-text-field
            v-model="image"
            label="Image"
            required
            ></v-text-field>
            <v-text-field
            v-model="description"
            label="Description"
            required
            ></v-text-field>
            <h2> Ici il faudrait ajouter des regles pour que le titre ne soit pas nul</h2>
            {{ valid }}
            <v-btn
            :disabled="!valid"
            @click="submit"> Post </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import router from '../../router'

export default {
  name: 'Post',
  data () {
    return {
      msg: ':)',
      // Regles et trucs pour form
      valid: false,
      // Reste d'infos pour le post
      titre: '',
      auteur: 'id', // id auteur
      description: '', // description du post
      image: '',
      // Pour les v-select
      communautes: [],    // Ici on garde le nom de la base de donnees de chaque communaute
      communautes_txt: [], // Puis c'est celui ci celui qu'on montre
      com_selec: null, // communaute selectionne
      index: {}
    }
  },
  created() {
    let user = app.auth().currentUser
    //this.auteur = user.uid
    this.auteur = '7tt0PkwvO5VC9wdOkaLYYd3vtIs1'
    //if (user == null || !user.emailVerified) { router.push('/') }

    db.ref('users/' + this.auteur).once('value')
    .then((data) => {
      const obj = data.val()

      this.communautes = obj.communautes

      db.ref('communities/').once('value')
      .then((data) => {
        const obj = data.val()

        this.index = obj.index

        for (let com in this.index) {
          if (com in this.communautes) { this.communautes_txt.push(this.index[com]) }
        }
      })
    })
  },
  methods: {
    submit: function() {
      let post = {
        auteur: this.auteur,
        communaute: this.com_selec,
        description: this.description,
        image: this.image,
        likes: { "id": "id" },
        date: firebase.database.ServerValue.TIMESTAMP,
        titre: this.titre
      }
      post.likes[uid] = uid

      posts.push(post)
      .then((snap) => {
        const key = snap.key
        console.log(key)

        db.ref('posts/' + key).once('value')
        .then((data) => {
          const obj = data.val()

          obj['id'] = key

          db.ref('posts/' + key).set(obj)
        })

        // Cette partie ajoute le post a la communaute
        db.ref('communities/' + this.com_selec).once('value')
        .then((data) => {
          const obj = data.val()

          let liste = obj.posts
          liste[key] = key

          db.ref('communities/' + this.com_selec + '/posts').set(liste)

          // Puis cette partie l'ajoute au profil de l'utilisateur
          db.ref('users/' + this.auteur).once('value')
          .then((data) => {
            const obj = data.val()

            let liste = obj.posts
            liste[key] = key

            let likes = obj.likes
            likes[key] = key

            db.ref('users/' + this.auteur + '/posts').set(liste)
            db.ref('users/' + this.auteur + '/likes').set(likes)
          })
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
