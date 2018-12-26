<template>
  <div class="Communaute">
    <v-container fluid>
      <v-layout row wrap justify-end row fill-height>
        <v-flex xs8>
          <v-card v-for="(post, index) in final_posts" :key="post.id">
            <v-card-title> <h3 class="headline mb-0"> {{ post.titre }} </h3> </v-card-title>
            <v-card-media :src="post.image"></v-card-media>
            <v-card-title> <h2> {{ post.description }} </h2> </v-card-title>
            <v-card-actions>
              <v-btn flat v-if="id in post.likes" color="red" @click="dislike(index)"> Dislike </v-btn> <!-- Ici il faut faire dynamique le changement entre boutton like et dislike et aussi le compteur -->
              <v-btn flat v-else @click="like(index)"color="green"> Like </v-btn> <!-- https://stackoverflow.com/questions/46567323/vue-js-change-text-within-a-button-after-an-event -->
              <h2> {{ longueur(likes[index]) - 1 }} </h2>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <h1> {{ nom }} </h1>
          <br>
          <h3> {{ description }} </h3>
          <br>
          <h3> {{ longueur(this.final_suivant) }} abonnés à cette page </h3>
          <v-btn flat v-if="utilisateur in final_suivant" @click="arreter"> Arreter de suivre </v-btn>
          <v-btn flat v-else @click="suivre"> Suivre </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ap from '../App.vue'

export default {
  name: 'Communaute',
  data () {
    return {
      msg: 'Bienvenu a cette communaute',
      // Utilisateur
      connecte: false,
      utilisateur: 'id', // id de l'utilisateur
      // Infos nulles com
      id: '', // id de la com
      nom: '',
      description: '',
      // Variables pour ceux qui suivent
      suivant: {},
      final_suivant: [],
      // Varibles posts com
      posts: {},
      true_posts: [],
      final_posts: [],
      // Likes des posts, meme ordre final_posts
      likes: []
    }
  },
  created() {
    // Gerer l'utilisateur
    this.connecte = ap.methods.getConnecte()
    this.utilisateur = ap.data().utilisateur

    // Gerer les posts de la com et les infos
    this.id = this.$route.params.id.replace(':', '')

    db.ref('communities/' + this.id).once('value')
    .then((data) => {
      const obj = data.val()
      console.log(obj)

      this.nom = obj.nom
      this.description = obj.description

      // Geres ceux qui suivent
      this.suivant = obj.suit
      delete this.suivant['id']

      for (let utili in this.suivant) {
        this.final_suivant.push(utili)
      }

      // Gerer les posts
      this.posts = obj.posts
      delete this.posts['id']

      if (this.longueur(this.posts) == 0) { return }

      this.true_posts = Object.keys(this.posts)
      this.true_posts.sort(function(a, b) {
        return parseFloat(a) - parseFloat(b)
      })

      for (let post in this.true_posts) {
        db.ref('posts/' + this.true_posts[post]).once('value')
        .then((data) => {
          this.final_posts.push(data.val())

          if (post == this.true_posts.length - 1) { this.fini() }
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    })
  },
  methods: {
    longueur: function(obj) {
      let l = 0;
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) { l++ }
      }
      return l
    },
    dislike: function(index) { // etant l'argument l'index, du coup la position
      delete this.likes[index][this.uid]

      console.log(this.likes[index])
    },
    like: function(index) {
      this.likes[index][this.uid] = this.uid // Modifier like et dislike pour voir si la personne est connectee

      console.log(this.likes[index])
    },
    fini: function() {
      this.final_posts.sort(function(a, b) {
        return b.date - a.date
      })

      for (let post in this.final_posts) {
        this.likes.push(this.final_posts[post].likes)
      }
    },
    arreter: function() {
      this.final_suivant.splice(this.final_suivant.indexOf(this.utilisateur), 1)
    },
    suivre: function() {

      console.log(ap.methods.getPath())
      if (!ap.methods.getConnecte()) { router.push('/login&:' + ap.methods.getPath()) }

      this.final_suivant.push(this.utilisateur)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3 {
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
