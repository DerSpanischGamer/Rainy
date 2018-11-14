<template>
  <div class="User">
    <p> yup</p>

  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
        msg: 'Page profile de qqn :)',
        id: '',
        bio: '',
        posts: []
    }
  },
  created() {
    this.id = this.$route.params.id

    users.ref(this.id).once('value')
    .then((data) => {
      const obj = data.val()
      this.bio = obj.bio
      this.posts = obj.posts
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
