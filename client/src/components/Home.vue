<template>
    <div class="blogEntries">
      <div class="flex-container-full flex-center">
        <h1 class="">Articles</h1>
      </div>
      <div class="flex-container-full flex-center">
        <div class="row">
          <router-link
          v-if="firstBlog"
          class="entry entry-lg"
          :to="{ name: 'BlogShow',
           params: {id: firstBlog._id,
           title: firstBlog.title,
           slug: firstBlog.slug} }">
           <div class="entry-header"
           :style="{ backgroundImage: `url(${firstBlog.featuredImageLocation})` }">
             <!-- <img
             :src="firstBlog.featuredImageLocation"
             alt="featured image for most recent blog post"> -->
           </div>
            <h3 class="blog-title">
              {{ firstBlog.title }}
            </h3>
            <p>{{ dateFormat(firstBlog.createDate) }}</p>
          </router-link>
        </div>
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
      firstBlog: '',
    };
  },
  mounted() {
    this.retrievePosts();
  },
  methods: {
    async retrievePosts() {
      const res = await fetch('http://localhost:4000');
      const splicedList = await res.json();
      this.blogs = splicedList.splice(1);
      [this.firstBlog] = splicedList;
      console.log(this.firstBlog);
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

.entry-lg{
  min-width: 990px;
  min-height: 380px;
  /* max-height: 380px; */
}

.entry-header{
  height: 380px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  top: -20px;
  width: 95%;
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
}

.entry-lg:after{
  content: 'New';
  position: absolute;
  bottom: 9px;
  right: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f06c93;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
}

.entry > .entry-header img{
  width: 95%;
  border-radius: 5px;
}

.entry:hover{
  box-shadow: 0px 0px 0px 0px #4b3742;
  right: -10px;
  bottom: -6px;
  border: 2px solid #fb7099;
}
</style>
