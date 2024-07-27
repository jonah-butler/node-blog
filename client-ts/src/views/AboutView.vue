<script setup lang="ts">
import MainLink from '@/components/links/main-link.vue';
</script>

<template>
  <div class="container">
    <section class="d-flex h-full flex-wrap content-center">
      <div class="row">
        <div class="col-xsmall-12 col-md-8 dir-col bio">
          <span class="d-flex">
            <span class="pr-2 pt-2 text-7xl font-extrabold">👋</span>
            <h1 class="text-7xl font-extrabold">Hey, I'm Jonah</h1>
          </span>
          <div class="post__content mt-3">
            <p class="mt-3 font-bold">Full-Stack Developer.</p>
            <p class="my-3">
              Thanks for stopping by! My name's Jonah Butler. I'm a full-stack
              software developer with primary interests in both front-end and
              back-end. Recently I've been working heavily with Vue3, Golang and
              PostgreSQL. I'm always posting here to share new projects or bits
              of knowledge I have learned and discovered along the way. If you
              want to talk, shoot me an email or find me online.
            </p>
          </div>
        </div>
        <div
          class="col-xsmall-12 col-md-4 dir-col align-content-center mt-4 flex-wrap"
        >
          <MainLink slug="/contact" title="Get In Touch" />
          <div class="socials flex">
            <!-- github -->
            <a
              href="https://github.com/jonah-butler?tab=repositories"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="64px"
                height="64px"
              >
                <path
                  d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"
                />
              </svg>
            </a>
            <!-- npm -->
            <a href="https://www.npmjs.com/~jayimbee" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="64px"
                height="64px"
              >
                <path
                  d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"
                />
              </svg>
            </a>
            <!-- linkedin -->
            <a
              href="https://www.linkedin.com/in/jayimbee/"
              class="mt-2"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="48px"
                height="48px"
              >
                <path
                  d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
h1 {
  line-height: 85px;
  letter-spacing: 2px;
  text-shadow:
    #f5b2c7 2px 2px 0px,
    #fa709a 6px 6px 0px;
}
.bio {
  position: relative;
  z-index: 2;
}
.bio:before {
  content: '';
  position: absolute;
  top: -120px;
  left: -90px;
  z-index: -1;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  background:
    linear-gradient(90deg, #f4f5f7 8px, transparent 1%) 95px 100px,
    linear-gradient(#f4f5f7 8px, rgba(243, 108, 148, 0.2901960784313726) 1%),
    rgba(1, 1, 1, 0.03);
  background-size: 10px 10px;
}

.socials > a svg {
  transition: fill 0.2s ease;
}
.socials > a:hover svg {
  fill: #fa709a;
}
</style>
