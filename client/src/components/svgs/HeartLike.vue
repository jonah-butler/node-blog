<template>
  <div class="heart-container" ref="heart"
  @click="sendIt()" @animationend="removeAnimateClass()">
    <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"
    enable-background="new 0 0 50 50"><path d="M25 39.7l-.6-.5C11.5 28.7 8 25
    8 19c0-5 4-9 9-9 4.1 0 6.4 2.3 8 4.1 1.6-1.8 3.9-4.1 8-4.1 5 0 9 4 9 9 0
    6-3.5 9.7-16.4 20.2l-.6.5zM17 12c-3.9 0-7 3.1-7 7 0 5.1 3.2 8.5 15 18.1
    11.8-9.6 15-13 15-18.1 0-3.9-3.1-7-7-7-3.5 0-5.4 2.1-6.9 3.8L25
    17.1l-1.1-1.3C22.4 14.1 20.5 12 17 12z"/>
  </svg>
    <svg class="heart-inner" width="32" height="28" viewBox="0 0 32 28" fill="none"
    xmlns="http://www.w3.org/2000/svg" ref="heartInner">
      <path d="M24.9282 1.14714C22.1192 0.686078 19.0072 1.11332 16.501
      5.29668V26.5054C16.501 26.5054 30.5464 15.9011 31.0146 9.90728C31.4828
      3.91349 27.7373 1.6082 24.9282 1.14714Z" fill="#cc262d" stroke="#cc262d"/>
      <path d="M7.13739 1.21209C10.8828 0.686092 13.0584 1.17826 15.5646
      5.36156V26.57C15.5646 26.57 1.51923 15.5696 1.05105 9.97209C0.582873
      4.37457 3.39195 1.73808 7.13739 1.21209Z" fill="#cc262d" stroke="#cc262d"/>
    </svg>
  </div>
</template>

<script>
import EventBus from '@/bus.js';

export default {
  name: 'HeartSVG',
  data() {
    return {
      animating: false,
      liked: false,
      updating: false,
    };
  },
  created() {
  },
  methods: {
    sendIt() {
      if (!this.updating) {
        EventBus.$emit('update-rating', {
          liked: !this.liked,
          updating: !this.updating,
        });
        this.liked = !this.liked;
        this.updating = !this.updating;
        this.animate();
        EventBus.$once('rating-return', (data) => {
          this.updating = data.updating;
        });
      }
    },
    animate() {
      if (this.animating === false) {
        this.animating = true;
        this.$refs.heart.classList.add('bounceIn');
        this.$refs.heartInner.classList.toggle('fill');
      }
    },
    removeAnimateClass() {
      this.$refs.heart.classList.remove('bounceIn');
      this.animating = false;
    },
    passingProps(test) {
      console.log(test);
    },
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
};
</script>
