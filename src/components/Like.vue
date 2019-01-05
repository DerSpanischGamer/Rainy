<template>
  <div class="Like">
    <v-app>
    <v-container fluid>
      <v-layout row wrap justify-end row fill-height>
        <v-flex xs12>
          <h1> Voilà les posts que t'as aimé </h1>
          <v-card v-for="(post, index) in final_posts" :key="post.id">
            <v-card-title> <h2> <a :href='"#/communaute&:" + post.communaute'> {{ indexo[post.communaute] }} </a> </h2> </v-card-title>
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
      </v-layout>
    </v-container>
  </v-app>
  </div>
</template>

<script>
import router from '../router'
import ap from '../App.vue'
import Vue from 'vue'

export default {
  name: 'User',
  data () {
    return {
        msg: 'Page profile de qqn :)',
        // Variables celui qui cherche
        uti: '', // uid de l'utilisateur qui est en train d'utiliser le site
        connecte: false,
        // Variables pour les posts
        posts: {}, // un object d'objects
        true_posts: [], // celui ci c'est une liste des cles
        final_posts: [], // celui ci c'est une liste des posts (objects) qui ont ete deja ordonne (nouveaux premiers)
        // Variables pour les likes
        likes: [], // Liste des objects trouves dans les posts. Ex.: { 'id': 'id' }
        true_likes: [], // Liste de booleans qui disent si l'uti a like ou pas un post
        // Variables pour le communautes
        indexo: {}, // un index id com -> nom a montrer
        titres: [], // les noms des coms, meme ordre que true_coms
        checkbox: true,
    }
  },
  created() {
    // Gerer l'utilisateur qui est sur le site
    let user = app.auth().currentUser
    if (user != null) { this.uti = user.uid; this.connecte = true }

    db.ref('users/' + this.uti).once('value')
    .then((data) => {
      const obj = data.val()

      db.ref('communities/').once('value')
      .then((data) => {
        const obj = data.val()

        this.indexo = obj.index

        for (let com in this.coms) {
          this.true_coms.push(com)
          this.titres.push(this.indexo[com])
        }
      })

      this.posts = obj.likes
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
      router.push('/')
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
    fini: function() {
      this.final_posts.sort(function(a, b) {
        return b.date - a.date
      })

      for (let post in this.final_posts) {
        this.likes.push(this.final_posts[post].likes)

        if (this.final_posts[post].likes.hasOwnProperty(this.uti)) { this.true_likes.push(true) } else { this.true_likes.push(false) }
      }
    },
    dislike: function(index) { // etant l'argument l'index, du coup la position
      // faut voir si l'utilisateur est connecte ou pas
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }
      //On arrive ici si l'utilisateur est connecte

      delete this.likes[index][this.uti]
      vm.$set(this.true_likes, index, false)

      db.ref('posts/' + this.final_posts[index].id + '/likes').set(this.likes[index])
      db.ref('users/' + this.uti + '/likes').once('value')
      .then((data) => {
        const obj = data.val()

        delete obj[this.final_posts[index].id]

        db.ref('users/' + this.uti + '/likes').set(obj)
      })
    },
    like: function(index) { // etant l'argument l'index, du coup la position
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }
      // egale, on arrive ici s'il y a un utilisateur

      this.likes[index][this.uti] = this.uti
      vm.$set(this.true_likes, index, true)

      db.ref('posts/' + this.final_posts[index].id + '/likes').set(this.likes[index])
      db.ref('users/' + this.uti + '/likes').once('value')
      .then((data) => {
        const obj = data.val()

        obj[this.final_posts[index].id] = this.final_posts[index].id

        db.ref('users/' + this.uti + '/likes').set(obj)
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
