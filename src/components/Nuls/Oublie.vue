<template>
  <div class="Oublie">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        label="Email"
        :rules="emailRules"
        required
    ></v-text-field>
    <v-btn :disabled="!valid" @click="reset"> Reseter mot de passe </v-btn>
  </v-form>
  </div>
</template>

<script>
import router from '../../router'

export default {
  name: 'Oublie',
  data () {
    return {
      msg: 'Mot de passe oubliée',
      email: '',
      valid: true,
      emailRules: [
        v => !!v || 'Obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide'
      ]
    }
  },
  methods: {
    reset: function() {
      app.auth().sendPasswordResetEmail(this.email)
      .then(function() {
        if (app.auth().currentUser != null)
        {
          app.auth().signOut().then(
            function() {
              console.log('Haha !')
              router.push('/fini')
              return
          }, function(error) {
              console.log('Merde', error)
          })
        } else {
          router.push('/fini')
        }
      })
      .catch(function(error) {
        alert(error.message)
      })
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
