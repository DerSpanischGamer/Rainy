<template>
  <div class="Fini">
    <h2> On t'a envoyé un mail pour que tu puisses changer ton mot de passe :) </h2>
  </div>
</template>

<script>
export default {
  name: 'Fini',
  data () {
    return {
      msg: 'Reset de mot de passe envoye'
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
