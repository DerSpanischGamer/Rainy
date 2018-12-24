<template>
  <div class="Monter">
    <h1> Post une image de ton animal de compagnie </h1>
    <h2> Ici on met un textfield pour introduire le titre </h2>
    <h2> Ici un autre pour la description </h2>
    <h2> Ici un truc que tu clikes et ca te donne plusieurs options, comme dans la page principale le MORE pour selectioner le communaute</h2>
    <v-btn @click="submit"> Post </v-btn>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import router from '../../router'

export default {
  name: 'Post',
  data () {
    return {
      msg: ':)',
      auteur: '7tt0PkwvO5VC9wdOkaLYYd3vtIs1',
      nom: 'hola',
      description: 'adios',
      image: 'ahhhh',
      communautes: [],    // Ici on garde le nom de la base de donnees de chaque communaute
      communautes_txt: [], // Puis c'est celui ci celui qu'on montre
      com_selec: '-LSLz8rGF-jWOBgNokJD'
    }
  },
  created() {
    let user = app.auth().currentUser

    if (user == null || !user.emailVerified) { /*router.push('/')*/ } // TODO: Uncomment avant de lancer le site
  },
  methods: {
    submit: function() {
      //let user = app.auth().currentUser
      //this.auteur = user.uid
      let uid = this.auteur

      let post = {
        auteur: this.auteur,
        communaute: this.com_selec,
        description: this.description,
        image: this.image,
        likes: { "id": "id" },
        date: firebase.database.ServerValue.TIMESTAMP
      }
      post.likes[uid] = uid

      posts.push(post)
      .then((snap) => {
        const key = snap.key
        console.log(key)

        db.ref('posts/' + key).once('value')
        .then((data) => {
          const obj = data.val()

          obj[key] = key

          db.ref('posts/' + key).set(obj)
        })

        // Cette partie ajoute le post a la communaute
        db.ref('communities/' + this.com_selec).once('value')
        .then((data) => {
          const obj = data.val()

          let liste = obj.posts
          liste[key] = key

          db.ref('communities/' + this.com_selec + '/posts').set(liste)

          // Puis cette partie l'ajoute au profil de l'utilisateur
          db.ref('users/' + this.auteur).once('value')
          .then((data) => {
            const obj = data.val()

            let liste = obj.posts
            liste[key] = key

            let likes = obj.likes
            likes[key] = key

            db.ref('users/' + this.auteur + '/posts').set(liste)
            db.ref('users/' + this.auteur + '/likes').set(likes)
          })
        })
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
