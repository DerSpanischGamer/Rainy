<template>
  <div class="Main">

  <p class="text-lg-right">
  <v-navigation-drawer
    class="blue lighten-3"
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
  </p>
  </div>
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
