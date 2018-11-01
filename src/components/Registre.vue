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
    <p> {{ this.error }} </p>
    <br>
    <h3> Tu as déjà un compte chez nous? <a href='#/login'> Connecte-toi ici </a> </h3>
  </v-form>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import router from '../router'

export default {
  name: 'Registre',
  data () {
    return {
      msg: 'Inscrit toi sur notre site :)',
      valid: true,
      error: '',
      show: false,
      email: '',
      emailRules: [
        v => !!v || 'Obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide'
      ],
      utilisateur: '',
      passe: '',
      rules: [
        v => !!v || 'Obligatoire',
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
            utilisateur: obj[key].utilisateur
          })
        }

        // Tout le code doit s'executer ici car sinon l'app ne se syncronise pas a cause du delai du serveur
        for (let i = 0; i < user.length; i++) {
          if (user[i].utilisateur == this.utilisateur) {
            this.error = "Nom d'utilisateur deja pris"
            return
          }
        }
        for (let i = 0; i < this.utilisateur.length; i++) {
          if (this.utilisateur[i] == " ") {
            this.error = "Le nom d'utilisateur ne peut pas contenir des espaces"
            return
          }
        }
        let uti = this.utilisateur

        // Si on arrive jusqu'ici c'est que le mail et le nom sont ok
        app.auth().createUserWithEmailAndPassword(this.email, this.passe)
        .then(function() {
          let utilisa = app.auth().currentUser
          let uid = utilisa.uid
          console.log(uid)

          utilisa.sendEmailVerification()
          .then(function() {
            utilisa.updateProfile({
              displayName: uti,
              photoURL: "https://pm1.narvii.com/6417/f841c8c25c9939c1c56c41b7faef7c1e0065b1ec_128.jpg"
            })
            .then(function() {
              router.push('/confirmation')
              console.log("ok")
            })
            .catch(function(error) {
              console.log(error)
            })
          }).catch(function(error) {
            console.log(error)
          })
        }).catch(function(error) {
          alert(error.message)
        })
      })
      .catch(
        (error) => {
          console.error(error.message)
        }
      )
    },
    erreur (e) {
      this.error = e
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
