<template>
  <div id="app" >
    <p v-show="connecte"> {{this.utilisateur}} </p>
    <v-toolbar>
  <v-toolbar-title> Rainy  </v-toolbar-title>
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
   created() {
     this.id = this.$route.params.id
     let uti = app.auth().currentUser

     if (uti != null) { // CA C'EST A TOI NICOLY DE VOIR POURQUOI CA NE MARCHE PAS, montrer symbole si utilisateur connecté
       this.connecte = true
       this.utilisateur = uti.displayName
       console.log("yay")
       console.log(this.connecte)
     }
     else {
       console.log("ljknfgjkb")
       // MONTRER EN HAUT DROITE LOGIN
     }
   },
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
