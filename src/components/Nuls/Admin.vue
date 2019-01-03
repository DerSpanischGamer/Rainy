<template>
  <div class="Admin">
    <v-layout row wrap class="pt-5" justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-text-field
        v-model="uid_post"
        label="uid post"
        required
        v-on:keyup.enter="post"
        > </v-text-field>
        <v-btn @click="post"> Effacer post </v-btn>
        <v-text-field
        v-model="uid_user"
        label="uid user"
        required> </v-text-field>
        <v-btn @click="users"> Effacer user </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import router from '../../router'

export default {
  name: 'Admin',
  data () {
    return {
      msg: 'Admin',
      uid_post: '',
      uid_user: ''
    }
  },
  created () {
    let user = app.auth().currentUser

    // arreglar esto
    return
    if (user != null) {
      if (user.role != "admin") { router.push('/') }
    } else { router.push('/') }
  },
  methods: {
    post: function() {
      this.eliminarPost(this.uid_post)
    },
    users: function() {
      db.ref('users/' + this.uid_user).once('value')
      .then((data) => {
        const obj = data.val()

        let posts = obj.posts
        for (let post in posts) {
          if (posts[post] != 'id') { eliminarPost(posts[post]) }
        }

        let communautes = obj.communautes
        for (let com in communautes) {
          db.ref('communities/' + communautes[com] + '/suit').child(this.uid_user).remove()
        }

        let likes = obj.likes
        for (let like in likes) {
          db.ref('posts/' + likes[like] + '/likes').child(this.uid_user).remove()
        }

        db.ref('users/' + this.uid_user).set({
          role: 'banned'
        })
      })
    },
    eliminarPost: function(uid) { // uid ici c'est l'uid du post
      db.ref('posts/' + uid).once('value')
      .then((data) => {
        const obj = data.val()

        let auteur = obj.auteur
        db.ref('users/' + auteur + '/posts').child(uid).remove()

        let likes = obj.likes
        for (let like in likes) {

          db.ref('users/' + likes[like] + '/likes').child(uid).remove()
        }

        let com = obj.communaute
        db.ref('communities/' + com + '/posts').child(uid).remove()

        posts.child(uid).remove()

        console.log('Post efface')
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
