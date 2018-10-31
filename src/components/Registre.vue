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
      ]
    }
  },
  methods: {
    submit: function() {
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
          if (user[i].utilisateur == this.utilisateur) {
            console.log("Nom d'utilisateur deja pris")
            return
          }
        }
        for (let i = 0; i < this.utilisateur.length; i++) {
          if (this.utilisateur[i] == " ") {
            console.log("Le nom d'utilisateur ne peut pas contenir des espaces")
            return
          }
        }
        let uti = this.utilisateur
        let mail = this.email
        // Si on arrive jusqu'ici c'est que le mail et le nom sont ok
        app.auth().createUserWithEmailAndPassword(this.email, this.passe)
        .then(function() {
          let user = app.auth().currentUser;
          console.log(user)
          user.updateProfile({
            displayName: uti,
            photoURL: "https://pm1.narvii.com/6417/f841c8c25c9939c1c56c41b7faef7c1e0065b1ec_128.jpg",
          })
          .then(function() {
            user.sendEmailVerification()
            .then(function() {
              function writeUserData() { // CETTE PARTIE NE FONCTIONNE PAS MAIS LE CODE EST BIEN ECRIT DONC WTFFFFFFF JE REGARDERAI UN AUTRE JOUR JE VAIS BOSSER PHILO
                app.database().ref('users/hola').set({
                  bio: ":3",
                  role: "user"
                })
              }
              console.log("Bien")
            }).catch(function(error) {
              console.log(error)
            })
          })
          .catch(function(error) {
            console.log(error)
          })
        }).catch(function(error) {
          console.log(error.message)
        })
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
