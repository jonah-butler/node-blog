<template>
    <div class="blogEntries">
      <div class="container margin-auto">
        <div class="flex-container-full flex-center">
          <h1 class="">Latest Articles</h1>
        </div>
      <div class="flex-container-full flex-center">
        <div class="row featured-entry justify-center">
          <router-link
          v-if="firstBlog"
          class="entry entry-lg"
          :to="{ name: 'BlogShow',
           params: {id: firstBlog._id,
           title: firstBlog.title,
           slug: firstBlog.slug} }">
           <div class="entry-header"
           :style="{ backgroundImage: `url(${firstBlog.featuredImageLocation})` }">
           </div>
            <h3 class="blog-title">
              {{ firstBlog.title }}
            </h3>
            <span>
              <p>{{ dateFormat(firstBlog.createdAt) }}</p>
              <div class="rating-container">
                <Heart/>
                <span>{{firstBlog.rating}}</span>
              </div>
            </span>
          </router-link>
        </div>
        <div class="flex-container-sm">
          <router-link v-for="item in blogs" :key="item.title" class="entry entry-sm featured"
          :to="{ name: 'BlogShow', params: {id: item._id,
          title: addHyphens(item.title),
          slug: item.slug} }">
          <div class="detail-container">
            <h3 class="blog-title">
              {{ item.title }}
            </h3>
            <p>{{  dateFormat(item.createdAt) }}</p>
            <div class="rating-container">
              <Heart/>
              <span>{{item.rating}}</span>
            </div>
          </div>
            <div class="blob"></div>
            </router-link>
        </div>
      </div>
      <div class="flex-container-full flex-left">
        <!-- <div class="row full-width">
          <h2>More Articles</h2>
        </div> -->
        <div class="row old-entries dir-col">
          <router-link v-for="blog in remainingBlogs" :key="blog.title" class="old-blog"
          :to="{ name: 'BlogShow', params: {id: blog._id,
          title: addHyphens(blog.title),
          slug: blog.slug} }">
            <div class="detail-container">
              <p class="old-blog-date">{{  dateFormat(blog.createdAt) }}</p>
              <h3 class="old-blog-title primary-btn-link">
                {{ blog.title }}
              </h3>
            </div>
          </router-link>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import Heart from '@/components/svgs/HeartNoLike.vue';

export default {
  name: 'BlogLanding',
  components: {
    Heart,
  },
  data() {
    return {
      remainingBlogs: '',
      blogs: '',
      firstBlog: '',
    };
  },
  mounted() {
    this.retrievePosts();
  },
  methods: {
    async retrievePosts() {
      const res = await fetch('https://jonahbutler-dev.herokuapp.com/');
      const splicedList = await res.json();
      [this.firstBlog] = splicedList.splice(0, 1);
      this.blogs = splicedList.splice(0, 4);
      this.remainingBlogs = splicedList;
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
<style>
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
  color: #d45f82;
  text-decoration: none;
}
p {
  color: black;
}

.blog-title{
  font-size: 2rem;
}

.featured-entry{
  width: 100%;
}

.old-blog-title, .old-blog-date{
  margin: 0px;
}

.old-blog-date{
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
}

.old-blog-title{
  /* font-size: 28px; */
}

.entry{
  background: white;
  flex: 1;
  margin: 20px;
  box-shadow: 10px 6px 0px 0px #e0e0e0;
  transition: all .3s ease;
  position: relative;
  right: 0px;
  bottom: 0px;
  border-radius: 5px;
  border: 2px solid transparent;
  min-width: 260px;
  max-width: 550px;
  padding: 15px 15px;
  z-index: 1;
}

.entry  h3{
  margin-bottom: 5px;
}

.entry p {
  margin: 3px 5px;
}

.entry-lg{
  max-width: 700px;
  min-height: 180px;
  /* max-height: 380px; */
}

.rating-container > .heart-container{
  width: 33px;
  height: 33px;
}

.entry-header{
  height: 180px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  top: -30px;
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

.entry-sm{
  overflow: hidden;
  min-height: 150px;
}

.entry-sm:nth-child(1){
  background: linear-gradient(130deg, #f06c93, #d84f78);
}
.entry-sm:nth-child(1) .blob{
  background-image: url('./svgs/blob1.svg');
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  right: -70px;
  width: 200px;
  height: 200px;
  opacity: 0.6;
  z-index: -1;
}

.entry-sm:nth-child(2) .blob{
  background-image: url('./svgs/blob2.svg');
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  right: -70px;
  width: 200px;
  height: 200px;
  opacity: 0.6;
  z-index: -1;
}

.entry-sm:nth-child(3) .blob{
  background-image: url('./svgs/blob3.svg');
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  right: -70px;
  width: 200px;
  height: 200px;
  opacity: 0.6;
  z-index: -1;
}

.entry-sm:nth-child(4) .blob{
  background-image: url('./svgs/blob4.svg');
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  right: -70px;
  width: 200px;
  height: 200px;
  opacity: 0.6;
  z-index: -1;
}
.entry-sm.featured h3, .entry-sm.featured p{
  color: white;
}

.entry-sm:nth-child(2){
  background: linear-gradient(130deg, #2191fb, #1588f5);
}

.entry-sm:nth-child(3){
  background: linear-gradient(130deg, #09dc9d, #0fbc88);
}

.entry-sm:nth-child(4){
  background: linear-gradient(130deg, #6ce037, #5fda27);
}

.rating-container{
  display: flex;
  color: black;
  font-size: 12px;
}

.rating-container span {
  position: relative;
  top: 0;
  left: -3px;
}
</style>
