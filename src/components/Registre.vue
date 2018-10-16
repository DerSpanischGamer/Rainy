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
    <v-btn flat @click="idk"> test </v-btn>
  </v-form>
  </div>
</template>

<script>
import axios from "axios"

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
          min: v => v.length >= 4 || 'Min 4 characters'
      },
      reponse: ""
    }
  },
  methods: {
    submit: function () {
      if (this.nomDisponible(this.utilisateur)) { console.log("Nom d'utilisateur déjà pris"); return } // hacer la peticion https aqui
      console.log("Pas pris")
      return





      let lien = 'http://localhost/confirmer?' + creerLien(this.utilisateur)

      var actionCodeSettings = {
        url: lien,
        handleCodeInApp: true
      }
      /*firebase.auth().sendSignInLinkToEmail(this.email, actionCodeSettings)
      .then(function() {
        console.log("kjbfjk")
      })
      .catch(function (error) { console.log(error) })*/
    },
    nomDisponible: function(uti) {
      var database = firebase.database().ref()

      let liste = []
      database.on("value", function(snapshot) {
          for (let i in snapshot.val().users) { liste.push(snapshot.val().users[i].utilisateur) }
          for (let i in snapshot.val().preusers) { liste.push(snapshot.val().preusers[i].utilisateur) }
          console.log(liste) // la liste prend trop de temps a recevoir toutes les données donc va n'arrive pas, on pourrait mettre une fonction sur ligne ou attendre, idk
          for (let i = 0; i < liste.length; i++) { if (liste[i] === uti) { return true } }

          return false
      }, function (error) {
        console.log("Error: " + error.code);
      })
    },
    creerLien: function(uti) {
      // Le lien se cree avec le mail + la position de la lettre
      let le = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNñÑoOpPqQrRsStTuUvVwWxXyYzZ-_0123456789."
      let out = ""

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
      console.log(out)
      return out
    },
    idk: function() {
      this.sendData()

      console.log(this.reponse)
    },
    sendData() {
      axios({ method: "POST", "url": "https://us-central1-rainy-79819.cloudfunctions.net/nomDisponible", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
            this.response = result.data;
        }, error => {
          console.error(error);
      });
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
