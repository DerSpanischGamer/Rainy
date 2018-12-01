<template>
  <div class="Admin">
    <v-text-field
    v-model="uid_post"
    label="uid post"
    required> </v-text-field>
    <v-btn @click="post"> Effacer post </v-btn>
  </div>
</template>

<script>
import router from '../../router'

export default {
  name: 'Admin',
  data () {
    return {
      msg: 'Admin',
      uid_post: ''
    }
  },
  created () {
    let user = app.auth().currentUser

    //TODO: uncomment pour quand on lance le site
    /*if (user != null) {
      if (user.role != "admin") { router.push('/') }
    } else { router.push('/') } */
  },
  methods: {
    post: function() {
      db.ref('posts/' + this.uid_post).once('value')
      .then((data) => {
        const obj = data.val()
        console.log(obj)

        let auteur = obj.auteur
        db.ref('users/' + auteur + '/posts').child(this.uid_post).remove()

        let likes = obj.likes
        for (let like in likes) {
          console.log(like)
          db.ref('users/' + likes[like] + '/likes').child(this.uid_post).remove()
        }

        let com = obj.communaute
        db.ref('communities/' + com + '/posts').child(this.uid_post).remove()

        posts.child(this.uid_post).remove()
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
