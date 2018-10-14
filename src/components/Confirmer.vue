<template>
  <div class="confirmer">
    <p> {{ id }} </p>
    <p> {{ uti }} </p>
  </div>
</template>

<script>
export default {
  name: 'confirmer',
  data () {
    return {
      msg: 'Merci d avoir bien confirmé votre inscription',
      id: '',
      uti: ''
    }
  },
  created () {
    this.id = this.$route.params.id

    let database = firebase.database().ref()

    let le = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNñÑoOpPqQrRsStTuUvVwWxXyYzZ-_0123456789."
    let out = ""

    for (let i = 0; i < this.id.length; i++) {
      for (let j = 0; j < le.length; j++) {
        if (le[j] == this.id[i]) {
          let k = j - i
          while (k < 0) { k += le.length }
          out += le[k]
        }
      }
    }
    this.uti = out

    /*database.on("value", function(snapshot) {
      console.log(snapshot.val().users)
    }, function (error) {
      console.log("Error: " + error.code);
    });*/
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
