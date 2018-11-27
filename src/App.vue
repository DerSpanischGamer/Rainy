<template>
  <div id="app">
    <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-menu :nudge-width="100">
      <v-toolbar-title slot="activator">
        <span>All</span>
        <v-icon dark>arrow_drop_down</v-icon>
      </v-toolbar-title>
    <v-list>
         <v-list-tile
           v-for="item in items"
           :key="item"
           @click=""
         >
           <v-list-tile-title v-text="item"></v-list-tile-title>
         </v-list-tile>
       </v-list>
     </v-menu>
  <v-toolbar-title><a href="/"> Rainy </a> </v-toolbar-title>
     <v-spacer></v-spacer>

     <v-btn icon>
       <v-icon>search</v-icon>
     </v-btn>

     <v-btn icon>
       <v-icon>favorite</v-icon>
     </v-btn>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/"> Home </v-btn>
      <v-btn flat to="/login"> Login </v-btn>
      <h1> {{ a }} </h1>
    </v-toolbar-items>
  </v-toolbar>
  <div class="text-xs-center">

 </div>


    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
     items: [
       'All', 'Cats', 'Dogs', 'Caca'
     ]
   }),
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
