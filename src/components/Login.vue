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
      name="input-10-1"
      :rules="[rules.required, rules.min]"
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
    <p> {{ errorMsg }} </p>
  </v-form>
  </div>
</template>

<script>
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
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passe: '',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 10 || 'Min 10 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  methods: {
    submit: function() {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.email, this.passe).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          this.errorMsg = 'Wrong password.'
          return
        } else {
          this.errorMsg = errorMessage
          return
        }
      })

      console.log('Success')
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
