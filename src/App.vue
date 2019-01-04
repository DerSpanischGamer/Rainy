<template>
  <v-app>
    <div id="app" >
        <v-toolbar fixed>
          <v-toolbar-title> Rainy </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>favorite</v-icon>
          </v-btn>

          <v-toolbar-items class="hidden-sm-and-down">

          <v-btn icon flat to="/">
            <v-icon>home </v-icon>
          </v-btn>

          <v-btn v-if="!connecte && !this.cestLogin(this.getPath())" flat :to="'/login&:' + this.getPath()"> Login </v-btn>
          <v-menu
          offset-y
          v-if="connecte"
          >
            <v-btn
            icon
            slot="activator">
              <v-avatar>
                <v-img
                :src="photo"
                >
                </v-img>
              </v-avatar>
            </v-btn>
            <v-list>
              <v-list-tile
              v-for="(item, index) in this.items"
              :key="index"
              @click="menu(index)">
              <v-list-tile-title> {{ item.title }} </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import router from './router'
import * as firebase from 'firebase'

export default {
  name: 'App',
  data() {
    return {
      utilisateur: '', // nom (displayName) de l'utilisateur
      uid: '', // garde l'information sur le lien a la page de l'utilisateur
      temp: '', // Info temporaire pour eles pages qui ne peuvent pas acceder a leur this. comme ex. login
    },
    ({
      items: [
        { title: 'Profil' },
        { title: 'Préférences' },
        { title: 'Se déconnecter' }
      ],
      connecte: true,
      id: '',  // l'id de l'utilisateur
      photo: 'https://pm1.narvii.com/6417/f841c8c25c9939c1c56c41b7faef7c1e0065b1ec_128.jpg' // la photo de profil de l'utilisateur connecte
    })
  },
  created () {
    let uti = app.auth().currentUser

    if (uti != null) {
      this.connecte = true

      this.id  = uti.uid
      this.uid = '/user&:' + uti.uid;

      db.ref('users/' + uti.uid).once('value')
      .then((data) => {
        const obj = data.val()

        this.utilisateur = obj.utilisateur
        this.photo = obj.photoProfil
      })
    }
    else {
      this.connecte = false
    }
  },
  updated: function() {
    this.$nextTick(function() {
      let uti = app.auth().currentUser

      if (uti != null) {
        this.connecte = true
        this.id  = uti.uid
        this.uid = '/user&:' + uti.uid;

        db.ref('users/' + uti.uid).once('value')
        .then((data) => {
            const obj = data.val()

            this.utilisateur = obj.utilisateur
        })
      }
      else {
        this.connecte = false
      }
    })
  },
  methods: {
    menu: function(index) {
      switch (index) {
        case 0:
          this.utilisa()
        break
        case 1:
          router.push('preferences')
          break
        case 2:
          app.auth().signOut()
          location.reload()
        break
      }
    },
    utilisa: function() {
      router.push(this.uid)
    },
    getPath: function() {
      return this.$route.path.replace('/', '')
    },
    getConnecte: function() {
      return true
    },
    cestLogin: function(dir) {
      if (dir.slice(0, 5) == 'login') { return true } else { return false }
    }
  }
}

</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
