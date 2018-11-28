<template>
  <div class="Main">
  <p v-show="connecte"> {{this.utilisateur}} </p>
  <v-navigation-drawer
    class="blue lighten-3"
    dark
    permanent
  >
    <v-list xs2 >
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      utilisateur: 'rien',
      connecte: false,
      items: [
           { title: 'Dashboard', icon: 'dashboard' },
           { title: 'Account', icon: 'account_box' },
           { title: 'Admin', icon: 'gavel' }
         ]
    }
  },
  created () {
    let uti = app.auth().currentUser

    if (uti != null) { // CA C'EST A TOI NICOLY DE VOIR POURQUOI CA NE MARCHE PAS, montrer symbole si utilisateur connecté
      this.connecte = true
      this.utilisateur = uti.displayName
      console.log("yay")
      console.log(this.connecte)
    } else {
      console.log("ljknfgjkb")
      // MONTRER EN HAUT DROITE LOGIN
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
