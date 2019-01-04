<template>
  <div class="Recherche">
    <v-app>
      <v-layout row wrap class="pt-5" justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <h2> Modifie tes données </h2>
          <h3> Les champs qui soient en blanc ne changeront pas ce qu'il y avait avant </h3>
          <v-text-field
            v-model="photo"
            label="Photo de profile"
          ></v-text-field>
          <v-text-field
            v-model="bio"
            label="Ta biographie"
          ></v-text-field>
          <v-btn flat v-on:click="submit"> Appliquer les changements </v-btn>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import router from '../../router'

export default {
  name: 'Fini',
  data () {
    return {
      msg: 'Preferences',
      // Variables sur l'utilisateur connecte
    }
  },
  created() {
  },
  methods: {
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
