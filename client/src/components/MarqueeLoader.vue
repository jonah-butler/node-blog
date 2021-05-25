<template>
  <div class="marquee-text-container">
    <div
    ref="marquee"
    class="marquee-text">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarqueeLoader',
  mounted() {
    this.marquee = this.$refs.marquee;
    // this.animateText(0);
    this.cycleQuotes(0);
  },
  data() {
    return {
      marquee: '',
      quotes: [
        'Waiting for Heroku to wake up',
        'Did you know sharks are older than trees?',
        'Pretty cool, yeah?',
        'And adult babies have close to 100 more bones than an adult?',
        'As you can tell Heroku had a long night...',
      ],
    };
  },
  methods: {
    cycleQuotes(start) {
      let i = start;
      const ref = setInterval(() => {
        this.animateText(i);
        i += 1;
        if (i === this.quotes.length) {
          clearInterval(ref);
          this.cycleQuotes(0);
        }
      }, 5000);
    },
    animateText(i) {
      if (this.marquee.classList.contains('read')) {
        this.marquee.classList.remove('read');
        this.marquee.classList.add('fade');
      }
      setTimeout(() => {
        this.marquee.classList.remove('fade');
        this.marquee.innerText = this.quotes[i];
        this.marquee.classList.add('read');
      }, 1000);
    },
  },
};
</script>

<style>
.marquee-text-container{
  overflow: hidden;
  max-width: 900px;
  text-align: center;
  margin: 10px;
}

.marquee-text{
  position: relative;
  top: -40px;
  transition: all .3s ease;
  opacity: 1;
}

.marquee-text.read{
  top: 0px;
}

.marquee-text.fade{
  top: -40px;
  opacity: 0;
}
</style>
