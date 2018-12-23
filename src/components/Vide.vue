<template>
  <div class="Vide">
    <v-text-field
    v-model="nom"
    label="Nom"
    required> </v-text-field>
    <v-text-field
    v-model="description"
    label="Description"
    required> </v-text-field>
    <v-btn disabled @click="nouvelleCom"> Creer une nouvelle communaute </v-btn>
    <br>
    <br>
    <br>
    <br>
    <v-navigation-drawer
      class="blue lighten-3"
      dark
      permanent
    >
      <v-list xs2 >
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click=""
        >
          <v-list-tile-action>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Vide',
  data () {
    return {
      msg: 'Faire les tests ici',
      nom: '',
      description: '',
      items: []
    }
  },
  created () {
    let user = db.ref('users/' + '6QDhDsOWXHTR2eKrU4qk3tAMqXV2').once('value')
    .then((data) => {
      const obj = data.val()

      for (let pro in user) {
        console.log(obj[pro])
      }
    })

    //TODO: uncomment pour quand on lance le site
    /*if (user != null) {
      if (user.role != "admin") { router.push('/') }
    } else { router.push('/') } */
  },
  methods: {
    nouvelleCom: function () {
        let com_ = db.ref("/communities")
        let cle = com_.key

        let com = {
          description: "Des images des filles chat",
          nom: "Filles chat",
          posts: { "id": "id" },
          suit: { "id": "id" }
        }

        com_.push(com)
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
