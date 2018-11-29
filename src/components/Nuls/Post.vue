<template>
  <div class="Monter">
    <h1> Post une image de ton animal de compagnie </h1>
    <h2> Ici on met un textfield pour introduire le titre </h2>
    <h2> Ici un autre pour la description </h2>
    <h2> Ici un truc que tu clikes et ca te donne plusieurs options, comme dans la page principale le MORE pour selectioner le communaute</h2>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import router from '../../router'

export default {
  name: 'Mettre sur ligne une photo de tes animaux de compagnie',
  data () {
    return {
      msg: ':)',

    }
  },
  created() {
    let user = app.auth().currentUser

    if (user == null || user.emailVerified) { /*router.push('/')*/ }
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
