<template>
  <div class="Communaute">
    <v-container fluid>
      <v-layout row wrap justify-end row fill-height>
        <v-flex xs8>
          <v-card v-for="(post, index) in final_posts" :key="post.id">
            <v-card-title> <h1> Posté par: <a :href='"#/user&:" + indexa[post.auteur]'> {{ indexa[post.auteur] }} </a> </h1> </v-card-title>
            <v-card-title> <h3 class="headline mb-0"> {{ post.titre }} </h3> </v-card-title>
            <v-img :src="post.image"></v-img>
            <v-card-title> <h2> {{ post.description }} </h2> </v-card-title>
            <v-card-actions>

              <v-btn flat v-if="true_likes[index]" v-on:click="dislike(index)" icon color="red">
                <v-icon> favorite </v-icon>
              </v-btn>

              <v-btn flat v-else v-on:click="like(index)" icon color="red">
                <v-icon> favorite_border </v-icon>
              </v-btn>

              <h2> {{ longueur(likes[index]) - 1 }} </h2>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <h1> {{ nom }} </h1>
          <br>
          <h3> {{ description }} </h3>
          <br>
          <h3> {{ longueur(this.suivant) }} abonnés à cette communauté </h3>
          <v-btn flat v-if="suive[0]" @click="arreter"> Arreter de suivre </v-btn>
          <v-btn flat v-else @click="suivre"> Suivre </v-btn>
          <br>
          <v-btn flat :to="'post&:' + this.id"> Faire un post dans cette communaute </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ap from '../App.vue'
import router from '../router'

export default {
  name: 'Communaute',
  data () {
    return {
      msg: 'Bienvenu a cette communaute',
      // Utilisateur
      connecte: false,
      utilisateur: '', // id de l'utilisateur !! IMPORTANT, METTRE A '' COMME PREDETERMINE CAR SINON VA TOUJOURS RETOURNER VRAI
      // Infos nulles com
      id: '', // id de la com
      nom: '', // nom de la com
      description: '', // description de la com
      // Variables pour ceux qui suivent
      suivant: {}, // object avec les ids des gens qui suivent a la com
      suive: [ false ], // on utilise seulement la position 0 qui dit false si l'utilisateur est connecte
      // Varibles posts com
      posts: {},  // un object d'objects
      true_posts: [],  // celui ci c'est une liste des cles
      final_posts: [],  // celui ci c'est une liste des posts (objects) qui ont ete deja ordonne (nouveaux premiers)
      // Likes des posts, meme ordre final_posts
      likes: [], // liste d'objects qui gardent tous ces qui ont like une image
      true_likes: [], // vrai si l'utilisateur a like, faut sinon
      // Misc
      indexa: {} // index avec id_utilisateur : nom_utilisateur
    }
  },
  created() {
    // Gerer l'utilisateur qui est sur le site
    let user = app.auth().currentUser
    if (user != null) { this.utilisateur = user.uid; this.connecte = true }

    // Gerer Misc
    db.ref('users/index').once('value').then((data) => { this.indexa = data.val() })

    // Gerer les posts de la com et les infos
    this.id = this.$route.params.id.replace(':', '')

    db.ref('communities/' + this.id).once('value')
    .then((data) => {
      const obj = data.val()

      this.nom = obj.nom
      this.description = obj.description

      // Geres ceux qui suivent
      this.suivant = obj.suit
      delete this.suivant['id']

      if (this.suivant.hasOwnProperty(this.utilisateur)) { this.suive[0] = true }
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
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }

      delete this.likes[index][this.utilisateur]
      vm.$set(this.true_likes, index, false)

      db.ref('posts/' + this.final_posts[index].id + '/likes').set(this.likes[index])
      db.ref('users/' + this.utilisateur + '/likes').once('value')
      .then((data) => {
        const obj = data.val()

        delete obj[this.final_posts[index].id]

        db.ref('users/' + this.utilisateur + '/likes').set(obj)
      })
    },
    like: function(index) {
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }

      this.likes[index][this.utilisateur] = this.utilisateur
      vm.$set(this.true_likes, index, true)

      db.ref('posts/' + this.final_posts[index].id + '/likes').set(this.likes[index])
      db.ref('users/' + this.utilisateur + '/likes').once('value')
      .then((data) => {
        const obj = data.val()

        obj[this.final_posts[index].id] = this.final_posts[index].id

        db.ref('users/' + this.utilisateur + '/likes').set(obj)
      })
    },
    fini: function() {
      this.final_posts.sort(function(a, b) {
        return b.date - a.date
      })

      for (let post in this.final_posts) {
        this.likes.push(this.final_posts[post].likes)

        if (this.final_posts[post].likes.hasOwnProperty(this.utilisateur)) { this.true_likes.push(true) } else { this.true_likes.push(false) }
      }
    },
    arreter: function() {
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }

      delete this.suivant[this.utilisateur]
      vm.$set(this.suive, 0, false)

      db.ref('communities/' + this.id + '/suit').set(this.suivant)
      db.ref('users/' + this.utilisateur + '/communautes').once('value')
      .then((data) => {
        const obj = data.val()

        delete obj[this.id]

        db.ref('users/' + this.utilisateur + '/communautes').set(obj)
      })
    },
    suivre: function() {
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }

      this.suivant[this.utilisateur] = this.utilisateur
      vm.$set(this.suive, 0, true)

      db.ref('communities/' + this.id + '/suit').set(this.suivant)
      db.ref('users/' + this.utilisateur + '/communautes').once('value')
      .then((data) => {
        const obj = data.val()

        obj[this.id] = this.id

        db.ref('users/' + this.utilisateur + '/communautes').set(obj)
      })
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
