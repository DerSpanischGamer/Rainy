<template>
  <div class="Main">
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'vide',
  data () {
    return {
      msg: 'Faire les tests ici',
      posts: []
    }
  },
  created() {
    let com_ = db.ref("/communities")
    let cle = com_.key

    let com = {
      posts: [ "id" ],
      nom: "Chiens",
      description: "Des images des chiens",
      suit: [ "7tt0PkwvO5VC9wdOkaLYYd3vtIs1" ]
    }

    //com_.push(com) ENLEVER LE COMMENTAIRE SI TU VEUX CREER UNE NOUVELLE COMMUNAUTE

    let commun = '-LSLz8rGF-jWOBgNokJD'

    let post = {
      auteur: "7tt0PkwvO5VC9wdOkaLYYd3vtIs1", // Faire dynamique pour pouvoir lire l'id et la mettre aussi dans les likes
      description: "Chat",
      image: "https://www.hola.com/imagenes/estar-bien/20180831128704/ronroneo-gatos-causas/0-595-638/gato-ronroneo-1-t.jpg",
      likes: [ "7tt0PkwvO5VC9wdOkaLYYd3vtIs1" ]
    }
    posts.push(post)
    .then((snap) => {
      const key = snap.key

      db.ref('communities/' + commun).once('value')
      .then((data) => {
        const obj = data.val()

        let liste = obj.posts
        liste.push(key)

        db.ref('communities/' + commun + '/posts').set(liste)
      })
    })
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
