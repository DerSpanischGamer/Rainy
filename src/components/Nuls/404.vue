<template>
  <div class="404">
    <h1> Oops, il semble que quelque chose ne marche pas </h1>
    <v-img src="https://i.ytimg.com/vi/--_F1bVYMZ4/maxresdefault.jpg"></v-img>
  </div>
</template>

<script>
export default {
  name: '404',
  data () {
    return {
      msg: 'Oops'
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
