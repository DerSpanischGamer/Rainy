<template>
  <div class="Registre">
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="utilisateur"
      label="Nom d'utilisateur"
      required
    ></v-text-field>
    <v-text-field
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :type="show ? 'text' : 'password'"
      v-model="passe"
      label="Mot de passe"
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
    <v-btn flat @click="creerLien"> {{ creerLien(utilisateur) }} </v-btn>
  </v-form>
  </div>
</template>

<script>
export default {
  name: 'Registre',
  data () {
    return {
      msg: 'Inscrit toi sur notre site :)',
      valid: true,
      show: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      utilisateur: '',
      passe: '',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 10 || 'Min 10 characters'
      }
    }
  },
  methods: {
    submit: function () {

      let lien = 'http://localhost/confirmer?' + creerLien(this.utilisateur)

      var actionCodeSettings = {
        url: lien,
        handleCodeInApp: true
      }
      firebase.auth().sendSignInLinkToEmail(this.email, actionCodeSettings)
      .then(function() {
        console.log("kjbfjk")
      })
      .catch(function (error) { console.log(error) })
    },
    creerLien: function(uti) {
      // Le lien se cree avec le mail + la position de la lettre
      let le = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNñÑoOpPqQrRsStTuUvVwWxXyYzZ-_0123456789."
      let lettres = []
      let out = ""

      for (let i = 0; i < le.length; i++) {
        lettres.push(le[i])
      }

      // Utilisateur
      for (let i = 0; i < uti.length; i++) {
        for (let j = 0; j < le.length; j++) {
          if (le[j] == uti[i]) {
            let k = j + i
            while (k >= le.length) { k -= le.length }
            out += le[k]
          }
        }
      }
      return out
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
