<template>
    <div class="blogEntries">
      <div class="flex-container-full flex-center">
        <h1 class="">Articles</h1>
      </div>
      <div class="flex-container-full flex-center">
        <div class="flex-container-sm">
          <router-link v-for="item in blogs" :key="item.title" class="entry"
          :to="{ name: 'BlogShow', params: {id: item._id,
          title: addHyphens(item.title),
          slug: item.slug} }">
            <h3 class="blog-title">
              {{ item.title }}
            </h3>
            <p>{{  dateFormat(item.createDate) }}</p>
            </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BlogLanding',
  components: {},
  data() {
    return {
      blogs: '',
    };
  },
  // created() {
  //   this.retrievePosts();
  // },
  mounted() {
    this.retrievePosts();
  },
  methods: {
    async retrievePosts() {
      const res = await fetch('http://localhost:4000');
      this.blogs = await res.json();
    },
    addHyphens(str) { return str.split(' ').join('-'); },
    dateFormat(isoDate) {
      const date = new Date(isoDate);
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
} */
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
  text-decoration: none;
}
p {
  color: black;
}

.blog-title{
  font-size: 2rem;
}

.entry{
  background: white;
  flex: 1;
  text-align: center;
  margin: 20px;
  box-shadow: 10px 6px 0px 0px #e0e0e0;
  transition: all .3s ease;
  position: relative;
  right: 0px;
  bottom: 0px;
  border-radius: 5px;
  border: 2px solid transparent;
  min-width: 300px;
  max-width: 550px;
}

.entry:hover{
  box-shadow: 0px 0px 0px 0px #4b3742;
  right: -10px;
  bottom: -6px;
  border: 2px solid #fb7099;
}
</style>
