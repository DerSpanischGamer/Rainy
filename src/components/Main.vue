<template>
  <div class="Main">
    <v-container fluid>
      <v-flex xs2 order-lg5 >
        <p class="text-lg-center">
          <v-navigation-drawer
          class="blue lighten-3"
          >
            <v-list xs2>
              <v-list-tile
                v-for="c in true_coms"
                :key="c.lien"
                :to="'/communaute&:' + c.lien"
                >
                <v-list-tile-content>
                  <v-list-tile-title> {{ c.title }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </p>
      </v-flex>

      <v-flex xs9 order-lg2>
        <v-card v-for="(post, index) in true_posts" :key="post.id">
          <v-card-title> <h3 class="headline mb-0"> {{ post.titre }} </h3> </v-card-title>
          <v-img :src="post.image" height="500" ></v-img>
          <v-card-title> <h2> {{ post.description }} </h2> </v-card-title>
          <v-card-actions>

            <v-btn flat v-if="final_likes[index]" v-on:click="dislike(index)" icon>
              <v-icon>favorite_border</v-icon>
              </v-btn>

            <v-btn flat v-else v-on:click="like(index)" icon color="red">
              <v-icon> favorite </v-icon>
             </v-btn>

            <h2> {{ longueur(likes[index]) - 1 }} </h2>
          </v-card-actions>
        </v-card>
      </v-flex>


    </v-container>
</div>
</template>

<script>
import router from '../router'
import ap from '../App.vue'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'Rainy Main page',
      items: [], // liste des communautes suivis par l'utilisateur
       // Variables sur l'utilisateur
       connecte: false,
       id: '', // id de l'utilisateur
       // Variables sur les communautes
       coms: {}, // object avec tous les communautes que l'utilisateur suit
       true_coms: [], // liste avec les objectes: { title: --- , lien: --- }
       indexo: {},
       // Variables pour les posts
       temp_post: {}, // garder ici temporairement les posts avant d'etre ordonnes
       posts: [], // liste de tous les ids des posts
       true_posts: [], // liste de tous les post qui vont etre montres deja ordonnes
       // Variables pour les likes
       likes: [], // liste avec tous les objects des likes. Ex.: { 'id' : 'id' }
       true_likes: [], // liste avec les posts ?
       final_likes: [] // liste avec vrai ou faux selon si l'utilisateur a like ou pas le post
    }
  },
  created () {
    let user = app.auth().currentUser

    if (user != null) {
      this.connecte = true

      this.id = user.uid

      db.ref('users/' + this.id).once('value')
      .then((data) => {
        const obj = data.val()

        this.coms =  obj.communautes
        delete this.coms['id']

        if (this.longueur(this.coms) == 0) { this.pasDuti(); return }

        db.ref('communities/').once('value')
        .then((data) => {
          this.indexo = data.val().index

          for (let com in this.coms) {
            let ob = {
              title: this.indexo[com],
              lien: com
            }
            this.true_coms.push(ob)
          }

          this.fairePosts()
        })
      })
    } else {
      this.connecte = false

      this.pasDuti()
    }
  },
  methods: {
    fairePosts: function() {
      for (let com in this.true_coms) {
        db.ref('communities/' + this.true_coms[com].lien).once('value')
        .then((data) => {
          const obj = data.val()

          this.temp_post = obj.posts
          delete this.temp_post['id']

          if (this.longueur(this.temp_post) != 0) {

            for (let c in this.temp_post) {
              this.posts.push(c)
            }
          }
        })

        if (com == this.true_coms.length - 1) { this.fini() }
      }
    },
    fini: function() {
      posts.once('value')
      .then((data) => {
        const obj = data.val()

        for (let i = 0; i < this.posts.length; i++) {
          this.true_posts.push(obj[this.posts[i]])

          if (i == this.posts.length - 1) { this.true_fini(); return }
        }
      })
    },
    true_fini: function() {
      this.posts = []

      this.true_posts.sort(function(a, b) {
        return parseFloat(b.date) - parseFloat(a.date)
      })

      for (let post in this.true_posts) {
        this.posts.push(this.true_posts[post].id)

        this.likes.push(this.true_posts[post].likes)

        if (this.true_posts[post].likes.hasOwnProperty(this.id)) { this.final_likes.push(true) } else { this.final_likes.push(false) }
      }
    },
    longueur: function(obj) {
      let l = 0;
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) { l++ }
      }
      return l
    },
    pasDuti: function() { // fonction qui se lance quand il n'y a pas d'utilisateur ou l'utilisateur ne suit aucune communaute
      this.true_coms = [
        { title: 'Chats', lien: '-LSLz8rGF-jWOBgNokJD' },
        { title: 'Chiens', lien: '-LSLzGRNCoZeruEpRYLA' },
        { title: 'Hamsters', lien: '-LV8ZieYLAw6grj6xOdH' }
      ]

      this.fairePosts()
    },
    dislike: function(index) {
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }

      vm.$set(this.final_likes, index, false)
      delete this.likes[index][this.id]

      db.ref('posts/' + this.posts[index] + '/likes').set(this.likes[index])
      db.ref('users/' + this.id + '/likes').once('value')
      .then((data) => {
        const obj = data.val()

        delete obj[this.posts[index]]

        db.ref('users/' + this.id + '/likes').set(obj)
      })
    },
    like: function(index) {
      if (!this.connecte) { router.push('login&:' + this.$route.path.replace('/', '')); return }

      vm.$set(this.final_likes, index, true)
      this.likes[index][this.id] = this.id

      db.ref('posts/' + this.posts[index] + '/likes').set(this.likes[index])
      db.ref('users/' + this.id + '/likes').once('value')
      .then((data) => {
        const obj = data.val()

        obj[this.posts[index]] = this.posts[index]

        db.ref('users/' + this.id + '/likes').set(obj)
      })
    }
  }
}
</script>

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
