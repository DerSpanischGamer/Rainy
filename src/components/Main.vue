<template>
  <div class="Main">
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
  <p class="text-lg-right">
  <v-navigation-drawer
    class="blue lighten-3"
  >
    <v-list xs2>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <v-icon> {{ item.icon }} </v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title> {{ item.title }} </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  </p>

  <v-card v-for="(post, index) in posts" v-if="connecte" :key="post.id">
    <v-card-media :src="post.image" height="500" ></v-card-media>
    <v-card-actions>
      <v-btn flat color="orange">Regarder</v-btn>
      <v-btn flat color="orange">Acheter CHF</v-btn>
    </v-card-actions>
  </v-card>

</div>
</template>

<script>
import router from '../router'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      utilisateur: 'rien',
      connecte: false,
      uid: '',
      items: [
           { title: 'Dashboard', icon: 'dashboard' },
           { title: 'Account', icon: 'account_box' },
           { title: 'Admin', icon: 'gavel' }
         ],
      posts: [
         { image: 'https://i.kinja-img.com/gawker-media/image/upload/s--4LHBt0O4--/c_scale,f_auto,fl_progressive,q_80,w_800/kaprfadz9rnvypesa2u9.png', id: '0' },
         { image: 'https://d3ieicw58ybon5.cloudfront.net/full/u/f59a9434b34c4b7bb3cfafc6c43c0f3c.jpg', id: '1' }
       ]
    }
  },
   created() {
     let uti = firebase.auth().currentUser

     if (uti != null) {
       this.connecte = true
       this.uid = '/user&:' + uti.uid;

       db.ref('users/' + uti.uid).once('value')
       .then((data) => {
           const obj = data.val()

           this.utilisateur = obj.utilisateur
           console.log("yay")
       })
     }
     else {
       console.log("Pas connecte")
     }
   },
   methods: {
     utilisa: function() {
       router.push(this.uid)
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
