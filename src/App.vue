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

        <v-btn v-if="!connecte && !this.cestLogin(this.getPath())" flat :to="'/login&:' + this.getPath()"> Login </v-btn>
        <v-menu
        v-model="showMenu"
        absolute
        offset-y
        >
        <v-btn icon
        slot="activator">
        <v-avatar>
        <v-img
        src="https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F2714370%2Fimages%2Fn-POOP-EMOJI-ICE-CREAM-628x314.jpg"
      >
        </v-img>
      </v-avatar>
    </v-btn>
      <!--<v-menu offset-y>
          <v-btn
          v-if="connecte" flat @click="utilisa"> {{ utilisateur }} </v-btn>
         <v-btn
       slot="activator" >
     </v-btn>-->
       <v-list>

         <v-list-tile
           v-for="(item, index) in items"
           :key="index"
           @click="" >
           <v-list-tile-title>{{ item.title }}</v-list-tile-title>
         </v-list-tile>
       </v-list>
    </v-menu>
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
      temp: '' // Info temporaire pour eles pages qui ne peuvent pas acceder a leur this. comme ex. login
    },
    ({
      items: [
        { title: 'Profil' },
        { title: 'Deconnecter'},
      ]
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
        this.connecte = false
        console.log("Pas connecte")
      }
    })
  },
  methods: {
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
