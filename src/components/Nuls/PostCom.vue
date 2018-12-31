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
            <v-select
            :items="communautes_txt"
            v-model="com_selec"
            disabled
            :label="com_selec"
            ></v-select>
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
      // Misc
      id: '', // dans ce cas, id garde l'id de la com a laquelle le post va etre mis
      // Regles et trucs pour form
      valid: false,
      // Reste d'infos pour le post
      titre: '',  // titre du post
      auteur: '', // id auteur
      description: '', // description du post
      image: '',  // image du post
      // Pour les v-select (dans ce cas inutil)
      communautes: [],    // Ici on garde le nom de la base de donnees de chaque communaute
      communautes_txt: [], // Puis c'est celui ci celui qu'on montre
      com_selec: '', // communaute selectionne
    }
  },
  created() {
    let user = app.auth().currentUser
    this.id = this.$route.params.id.replace(':', '')

    //if (user == null || !user.emailVerified || this.id = '') { router.push('/') }
    this.auteur = user.uid

    db.ref('users/' + this.auteur).once('value')
    .then((data) => {
      const obj = data.val()

      db.ref('communities/' + this.id).once('value')
      .then((data) => {
        this.com_selec = data.val().nom
      })
      .catch(function(error) {
        alert("Erreur: la communaute n'a pas pu être retrouvée")
        router.push('/')
      })
    })
  },
  methods: {
    submit: function() {
      if (this.com_selec == '') { alert('Selectionne une communaute'); return }

      let post = {
        auteur: this.auteur,
        communaute: this.id,
        description: this.description,
        image: this.image,
        likes: { "id": "id" },
        date: firebase.database.ServerValue.TIMESTAMP,
        titre: this.titre
      }
      post.likes[this.auteur] = this.auteur

      posts.push(post)
      .then((snap) => {
        const key = snap.key

        db.ref('posts/' + key).once('value')
        .then((data) => {
          const obj = data.val()

          obj['id'] = key

          db.ref('posts/' + key).set(obj)
        })

        // Cette partie ajoute le post a la communaute

        db.ref('communities/' + this.id).once('value')
        .then((data) => {
          const obj = data.val()

          let liste = obj.posts
          liste[key] = key

          db.ref('communities/' + this.id + '/posts').set(liste)

          // Puis cette partie l'ajoute au profil de l'utilisateur
          db.ref('users/' + this.auteur).once('value')
          .then((data) => {
            const obj = data.val()

            let listo = obj.posts
            listo[key] = key

            let likes = obj.likes
            likes[key] = key

            db.ref('users/' + this.auteur + '/posts').set(listo)
            db.ref('users/' + this.auteur + '/likes').set(likes)

            router.push('/communaute&:' + this.id)
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
