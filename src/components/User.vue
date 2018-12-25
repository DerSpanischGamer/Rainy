<template>
  <div class="User">

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
        <v-flex xs4> <!-- Nicolyyyy tu dois voir comment faire le truc de l'utilisateur-->
          <v-img
          :src="photo"
          height="100"
          width="100"
          ></v-img> <!-- Ca serait cool si tout ca descendait quand tu descends -->
          <h1> {{ utilisateur }} </h1>
          <br>
          <h3> {{this.bio}} </h3>
          <br>
          <h2> Communautes </h2>
          <h3 v-for="(tit, index) in titres"> <br> <a :href="'/#/communaute&:' + true_coms[index]"> {{ tit }} </a> </h3>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import router from '../router'
import ap from '../App.vue'

export default {
  name: 'User',
  data () {
    return {
        msg: 'Page profile de qqn :)',
        // Variables profil
        utilisateur: '',
        photo: '',
        id: '',
        bio: '',
        // Variables pour les posts
        posts: {}, // un object d'objects
        true_posts: [], // celui ci c'est une liste des cles
        final_posts: [], // celui ci c'est une liste des posts (objects) qui ont ete deja ordonne (nouveaux premiers)
        likes: [],
        // Variables pour le communautes
        coms: {}, // un object d'objects avec les communautes
        index: {}, // un index id com -> nom a montrer
        true_coms: [], // les ids des coms
        titres: [] // les noms des coms, meme ordre que true_coms
    }
  },
  created() {
    // Gerer les posts de l'utilisateur
    this.id = this.$route.params.id.replace(':', '')

    db.ref('users/' + this.id).once('value')
    .then((data) => {
      const obj = data.val()

      this.utilisateur = obj.utilisateur
      this.bio = obj.bio
      this.photo = obj.photoProfil

      this.coms = obj.communautes
      delete this.coms['id']

      db.ref('communities/').once('value')
      .then((data) => {
        const obj = data.val()

        this.index = obj.index

        for (let com in this.coms) {
          this.true_coms.push(com)
          this.titres.push(this.index[com])
        }
      })

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
    fini: function() {
      this.final_posts.sort(function(a, b) {
        return b.date - a.date
      })

      for (let post in this.final_posts) {
        this.likes.push(this.final_posts[post].likes)
      }
    },
    dislike: function(index) { // etant l'argument l'index, du coup la position
      delete this.likes[index][this.uid]

      console.log(this.likes[index])
    },
    like: function(index) {
      this.likes[index][this.uid] = this.uid // Modifier like et dislike pour voir si la personne est connectee

      console.log(this.likes[index])
    },
    utilisa: function() {
        router.push(this.dir)
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
