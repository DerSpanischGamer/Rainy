<template>
  <div class="Admin">
    <v-text-field
    v-model="uid_post"
    label="uid post"
    required> </v-text-field>
    <v-btn @click="post"> Effacer post </v-btn>
    <v-text-field
    v-model="uid_user"
    label="uid user"
    required> </v-text-field>
    <v-btn @click="post"> Effacer user </v-btn>
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

    console.log(admin.auth().getUser(uid))

    //TODO: uncomment pour quand on lance le site
    /*if (user != null) {
      if (user.role != "admin") { router.push('/') }
    } else { router.push('/') } */
  },
  methods: {
    post: function() {
      this.eliminarPost(this.uid_post)
    },
    users: function() {
      db.ref('users/' + this.user_post).once('value')
      .then((data) => {
        const obj = data.val()
        console.log(obj)

        let posts = obj.posts
        for (let post in posts) {
          eliminarPost(posts[post])
        }

        let communautes = obj.communautes
        for (let com in communautes) {
          db.ref('communities/' + communautes[com] + '/suit').child(this.uid_user).remove()
        }

        let likes = obj.likes
        for (let like in likes) {
          db.ref('posts/' + likes[like] + '/likes').child(this.uid_user).remove()
        }
      })
    },
    eliminarPost: function(uid) { // uid ici c'est l'uid de l'utilisateur
      db.ref('posts/' + uid).once('value')
      .then((data) => {
        const obj = data.val()
        console.log(obj)

        let auteur = obj.auteur
        db.ref('users/' + auteur + '/posts').child(uid).remove()

        let likes = obj.likes
        for (let like in likes) {
          console.log(like)
          db.ref('users/' + likes[like] + '/likes').child(uid).remove()
        }

        let com = obj.communaute
        db.ref('communities/' + com + '/posts').child(uid).remove()

        posts.child(uid).remove()
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
