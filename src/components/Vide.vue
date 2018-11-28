<template>
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
  </div>
</template>

<script>
export default {
  name: 'vide',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
