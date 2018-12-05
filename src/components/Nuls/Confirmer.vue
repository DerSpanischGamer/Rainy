<template>
  <div class="Confirmer">
    <h1> Merci de t'inscrire sur Rainy </h1>
    <br>
    <h2> Maintenant, pour pouvoir te connecter, confirme ton mail </h2>
  </div>
</template>

<script>
export default {
  name: 'Confirmer',
  data () {
    return {
      msg: 'Confirme ton mail'
    }
  },
  created () {
    let utilisateur, email, id
    let user = app.auth().currentUser

    if (user != null && !user.emailVerified) {
      utilisateur = user.displayName
      email = user.email
      id = user.uid

      db.ref('users/' + id)
      .set({
        utilisateur: utilisateur,
        email: email,
        bio: 'Salut, Neko !',
        role: 'user',
        communautes: {
		      "id" : "id",
          "-LSLz8rGF-jWOBgNokJD" : "-LSLz8rGF-jWOBgNokJD",
          "-LSLzGRNCoZeruEpRYLA" : "-LSLzGRNCoZeruEpRYLA"
        },
        likes: { "id" : "id" },
        posts: { "id" : "id" }
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
      .then(function() {
        let defaultComs = [ '-LSLz8rGF-jWOBgNokJD', '-LSLzGRNCoZeruEpRYLA' ]

        for (let com in defaultComs) {
          db.ref('communities/' + com + '/suit').once('value')
          .then((data) => {
            let liste = data.val().suit
            liste[id] = id

            db.ref('communities/' + com + '/suit').set(liste)
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
