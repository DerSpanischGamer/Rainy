<template>
  <div class="Login">
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
      @click:append="show = !show"
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <h3> Tu n'as pas encore un compte chez nous? <a href='#/registre'> Inscrit-toi ici </a> </h3>
  </v-form>
  <p> {{ errorMsg }} </p>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      msg: ':3',
      errorMsg: '',
      valid: true,
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
  methods: {
    submit: function() {
      app.auth().signInWithEmailAndPassword(this.email, this.passe)
      .then(function(error){
        let uti = app.auth().currentUser

        if (!uti.emailVerified) {
          alert("S'il vous plaît, confirmez votre inscription pour pouvoir vous connecter")
          app.auth().signOut().then( function() {
            console.log('Haha !')
            return
          }, function(error) {
            console.log('Merde', error)
          })
        } else {
          router.push('/')
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
