<template>
  <div class="User">
    <v-container fluid>
      <v-layout row wrap justify-end row fill-height>
        <v-flex xs6 order-lg2>

          # POSTs


        </v-flex>
        <v-flex xs6 order-lg2>


          {{ this.photo }}

          <v-card
          class="mx-auto elevation-20"
          color="purple"
          dark
          style="max-width: 400px;"
          >
            <v-layout justify-space-between>
              <v-flex xs8>
                <v-card-title primary-title>
                  <div>
                    <div class="headline"> {{ this.name }}</div>
                    <div>Ellie Goulding</div>
                    <div> {{ this.bio }} </div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-img
              class="shrink ma-2"
              contain
              height="125px"
              src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
              style="flex-basis: 125px"
              ></v-img>
            </v-layout>
            <v-divider dark></v-divider>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
        msg: 'Page profile de qqn :)',
        name: '',
        photo: '',
        id: '',
        bio: '',
        posts: []
    }
  },
  created() {
    this.id = this.$route.params.id

    db.ref('users/' + this.id).once('value')
    .then((data) => {
      const obj = data.val()
      console.log(obj)
      this.name = obj.displayName
      this.bio = obj.bio
      this.posts = obj.posts
    })
    .catch(function(error) {
      console.log("slfjsb")
    })
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
