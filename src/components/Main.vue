<template>
  <div class="Main">
    <v-container fluid>
      <v-flex xs9 order-lg2>
        <v-card v-for="(post, index) in posts" v-if="connecte" :key="post.id">
          <v-card-media :src="post.image" height="500" ></v-card-media>
          <v-card-actions>
            <v-btn flat color="orange">Regarder</v-btn>
            <v-btn flat color="orange">Acheter CHF</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs3 order-lg2>
        <p class="text-lg-right">
          <v-navigation-drawer
          class="blue lighten-3"
          :clipped="clipped"
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
      </v-flex>

    </v-container>
</div>
</template>

<script>
import router from '../router'
import ap from '../App.vue'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'Rainy Main page',
      connecte: false,
      items: [
           { title: 'Dashboard', icon: 'dashboard' },
           { title: 'Account', icon: 'account_box' },
           { title: 'Admin', icon: 'gavel' }
         ],
      posts: [
         { image: 'https://i.kinja-img.com/gawker-media/image/upload/s--4LHBt0O4--/c_scale,f_auto,fl_progressive,q_80,w_800/kaprfadz9rnvypesa2u9.png', id: '0' },
         { image: 'https://d3ieicw58ybon5.cloudfront.net/full/u/f59a9434b34c4b7bb3cfafc6c43c0f3c.jpg', id: '1' }
       ],
       // Variables sur l'utilisateur
       connecte: false,
       utilisateur: ''
    }
  },
  created () {
    this.connecte = ap.getConnecte()

    if (this.connecte) { this.utilisateur = ap.data().utilisateur }

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
