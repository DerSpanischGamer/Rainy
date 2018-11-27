<template>
  <div id="app">
    <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title><a href="/"> Rainy </a> </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/"> Home </v-btn>
      <v-btn flat to="/login"> Login </v-btn>
      <h1> {{ a }} </h1>
    </v-toolbar-items>
  </v-toolbar>
  <div class="text-xs-center">
     <v-menu transition="">
       <v-btn slot="activator" dark color="primary">Cats</v-btn>
       <v-list>
         <v-list-tile v-for="n in 5" :key="n" @click="">
           <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
         </v-list-tile>
       </v-list>
     </v-menu>

 </div>


    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
        id: '',
        a: 0
    }
  },
  created() {
    this.id = this.$route.params.id
    this.a += 1


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
