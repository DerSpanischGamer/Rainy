<template>
<<<<<<< HEAD
  <div class="Main">
=======
  <div class="vide">
    <v-layout>
     <v-flex xs12 sm6 offset-sm3>
       <v-card>
         <v-card-title primary-title>
           <div>
             <h3 class="headline mb-0">chats</h3>
             <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
           </div>
         </v-card-title>

         <v-card-actions>
           <v-btn flat color="orange">Share</v-btn>
           <v-btn flat color="orange">Explore</v-btn>
         </v-card-actions>
       </v-card>
     </v-flex>
    </v-layout>
>>>>>>> edc4b935be8f75436b21f79070890649cedf0b52
  </div>
</template>

<script>
export default {
  name: 'vide',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    let myRef = db.ref("/communities")
    let cle = myRef.key

    let com = {
      posts: [],
      nom: "Chiens",
      description: "Des images des chiens",
      suit: [ "7tt0PkwvO5VC9wdOkaLYYd3vtIs1" ]
    }

    //myRef.push(com) ENLEVER LE COMMENTAIRE SI TU VEUX CREER UNE NOUVELLE COMMUNAUTE
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
