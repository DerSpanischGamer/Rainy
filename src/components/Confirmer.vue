<template>
  <div class="Main">
    <h1> Merci de t'inscrire sur Rainy </h1>
    <br>
    <h2> Maintenant, pour pouvoir te connecter, confirme ton mail </h2>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    let utilisateur, email, id
    let user = app.auth().currentUser

    if (user != null && !user.emailVerified) {
      utilisateur = user.displayName
      email = user.email
      id = user.uid

      db.ref('users/' + id).set({
        utilisateur: utilisateur,
        email: email,
        bio: 'Salut, Neko !',
        role: 'user'
      }, function(error) {
        if (error) {
          console.log(error)
        } else {
          app.auth().signOut().then( function() {
            console.log('Haha !')
          }, function(error) {
            console.log('Merde', error)
          })
        }
      })
    } else {
      console.log("Excuse me wtf")
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
