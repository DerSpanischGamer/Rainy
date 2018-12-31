<template>
  <div class="Login">
    <v-layout row wrap class="pt-5" justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            v-model="passe"
            label="Mot de passe"
            :rules="rules"
            required
            counter
            v-on:keyup.enter="submit"
            @click:append="show = !show"
          ></v-text-field>
          <h4> Mot de passe oublié? Pas de souci, clicke <a href="#/oublie"> ici </a> pour le réseter. </h4>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
          submit
          </v-btn>
          <h3> Tu n'as pas encore un compte chez nous? <a href='#/registre'> Inscrit-toi ici </a> </h3>
        </v-form>
        <p> {{ errorMsg }} </p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import router from '../router'
import * as firebase from 'firebase'
import ap from '../App.vue'

export default {
  name: 'Login',
  data () {
    return {
      msg: ':3',
      // Misc
      origine: '/',
      // Page en soi
      errorMsg: '',
      valid: false,
      show: false,
      email: '',
      emailRules: [
        v => !!v || 'Obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide'
      ],
      passe: '',
      rules: [
        v => !!v || 'Obligatoire',
        v => v.length >= 4 || 'Min 4 caractères',
        v => v.length <= 16 || 'Max 16 caractères'
      ]
    }
  },
  created () {
    this.origine = '/' + this.$route.params.origine.replace(':', '')
    this.origine = this.origine.indexOf( ':' ) == 1 ? this.origine = this.origine.replace( ':', '' ) : this.origine;

    if (app.auth().currentUser != null) { router.push(this.origine) }

    ap.data().temp = this.origine
  },
  methods: {
    submit: function() {
      app.auth().signInWithEmailAndPassword(this.email, this.passe)
      .then(function(error){
        let uti = app.auth().currentUser

        if (!uti.emailVerified) {
          alert("S'il vous plaît, confirmez votre inscription pour pouvoir vous connecter")
          app.auth().signOut()
          .then( function() {
            console.log('Haha !')
            return
          }, function(error) {
            console.log('Merde', error)
          })
        } else {
          if (uti.role != 'banned') {
            router.push(ap.data().temp)
          } else {
            app.auth().signOut()
            .then(function() {
              alert('NON')
              return
            }, function(error) {
              console.log('Merde', error)
            })
          }
        }
      })
      .catch(function(error) {
        let errorCode = error.code
        let errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.')
          return
        } else {
          alert(errorMessage)
          return
        }
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
