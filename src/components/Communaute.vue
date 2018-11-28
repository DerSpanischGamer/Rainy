<template>
  <div class="Communaute">
    <h1> {{ this.post }} </h1>
  </div>
</template>

<script>
export default {
  name: 'Communaute',
  data () {
    return {
      msg: 'Bienvenu a cette communaute',
      id: '',
      nom: '',
      description: '',
      posts: [],
      post: 0
    }
  },
  created() {
    this.id = this.$route.params.id

    db.ref('communities/' + this.id).once('value')
    .then((data) => {
      const obj = data.val()
      console.log(obj)

      this.nom = obj.nom
      this.description = obj.description
      this.posts = obj.posts

      if (this.posts.length != 1) { this.post = this.posts.length }
    })
    .catch(function(error) {
      console.log(error)
    })
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
