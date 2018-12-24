<template>
  <div class="User">
    <v-container fluid>
      <v-layout row wrap justify-end row fill-height>
        <v-flex xs9 order-lg2>

          # POSTs
          <v-card v-for="(post, index) in final_posts" :key="post.id">
            <v-card-title> <h3 class="headline mb-0"> {{ post.titre }} </h3> </v-card-title>
            <v-card-media :src="post.image" height="500" ></v-card-media>
            <v-card-title> <h2> {{ post.description }} </h2> </v-card-title>
            <v-card-actions>
              <v-btn flat v-if="id in post.likes" color="red" @click="dislike(index)"> Dislike </v-btn>
              <v-btn flat v-else @click="like(post)"color="green"> Like </v-btn>
              <h2> {{ longueur(post.likes) - 1 }} </h2>
            </v-card-actions>
          </v-card>

        </v-flex>
        <v-flex xs3 order-lg2>

          # IDK

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'User',
  data () {
    return {
        msg: 'Page profile de qqn :)',
        name: '',
        photo: '',
        id: '',
        bio: '',
        posts: {},
        true_posts: [],
        final_posts: []
    }
  },
  created() {
    this.id = this.$route.params.id.replace(':', '')

    db.ref('users/' + this.id).once('value')
    .then((data) => {
      const obj = data.val()
      console.log(obj)
      this.name = obj.utilisateur
      this.bio = obj.bio

      this.posts = obj.posts
      delete this.posts['id']

      if (this.longueur(this.posts) == 0) { return; }

      this.true_posts = Object.keys(this.posts)
      this.true_posts.sort(function(a, b) {
        return parseFloat(a) - parseFloat(b)
      })

      for (let post in this.true_posts) {
        console.log(this.true_posts[post])
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
      console.log(this.final_posts)
    },
    dislike: function(arg) { // etant l'argument le string avec l'id du post
      console.log(this.true_posts[arg])
    },
    like: function(arg) {
      console.log(arg)
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
