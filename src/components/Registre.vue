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
      :rules="regles"
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
    <v-btn flat @click="idk"> test </v-btn>
  </v-form>
  </div>
</template>

<script>
import axios from "axios"
import * as firebase from 'firebase'

export default {
  name: 'Registre',
  data () {
    return {
      msg: 'Inscrit toi sur notre site :)',
      valid: true,
      show: false,
      email: '',
      emailRules: [
        v => !!v || 'Obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide'
      ],
      utilisateur: '',
      passe: '',
      rules: [
        v => !!v || 'Obligatoire.',
        v => v.length >= 4 || 'Min 4 caractères',
        v => v.length <= 16 || 'Max 16 caractères'
      ],
      regles: [
        v => !!v || 'Obligatoire',
        v => v.length >= 4 || 'Min 4 caractères',
        v => v.length <= 16 || 'Max 16 caractères'
      ],
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
      /*firebase.auth().sendSignInLinkToEmail(this.email, actionCodeSettings) // Envoyer un mail je crois
      .then(function() {
        console.log("kjbfjk")
      })
      .catch(function (error) { console.log(error) })*/
    },
    nomDisponible: function(uti) {
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
      const user = []

      users.once('value')
      .then((data) => {
        const obj = data.val()
        for (let key in obj) {
          user.push({
            email: obj[key].email,
            utilisateur: obj[key].utilisateur
          })
        }
        console.log(user)

        // Tout le code doit s'executer ici car sinon l'app ne se syncronise pas a cause du delai du serveur
        for (let i = 0; i < user.length; i++) {
          if (user[i].email == this.email) {
            console.log("Email deja registre")
            return
          } else if (user[i].utilisateur == this.utilisateur) {
            console.log("Nom d'utilisateur deja pris")
            return
          }
        for (let i = 0; i < this.utilisateur.length; i++) {
          if (this.utilisateur[i] == " ") {
            console.log("Le nom d'utilisateur ne peut pas contenir des espaces")
            return
          }
        }

        // Si on arrive jusqu'ici c'est que le mail et le nom sont ok

        // Faudrait envoyer un mail de confirmation, renvoyer la personne dans une page ou il disse de confirmer l'inscriptione et puis a long terme, faire la page de confirmation
        }
      })
      .catch(
        (error) => {
          console.log(error)
        }
      )
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
