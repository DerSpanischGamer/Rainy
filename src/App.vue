<template>
  <div id="app" >
      <v-toolbar>
        <v-toolbar-title> Rainy </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/"> Home </v-btn>
        <v-btn v-if="!connecte" flat to="/login"> Login </v-btn>
        <v-btn v-if="connecte" flat @click="utilisa"> {{ utilisateur }} </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  data() {
    return {
      connecte: false,
      utilisateur: 'id',
      id : '',
      connecte: ''
    }
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
      })
    }
    else {
      console.log("Pas connecte")
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
        console.log("Pas connecte")
      }
    })
  },
  methods: {
    utilisa: function() {
      router.push(this.uid)
    },
    getConnecte: function() {
      let str = this.connecte ? '0' : '1'

      if (str == '0') { return false } else { return true }
    },
    getPath: function() {
      return this.$route.path
    },
    go: function(dir) {
      router.push(dir)
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
