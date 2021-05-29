<template>
  <div class="marquee-text-container margin-auto">
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
    this.cycleQuotes();
  },
  data() {
    return {
      marquee: '',
      firstQuote: ['Waiting for Heroku to wake up, some facts while you wait...'],
      quotes: [
        'Did you know sharks are older than trees?',
        'Babies have close to 100 more bones than an adult',
        'Supposedly the first person who ever got a speeding ticket was going 8 mph lol',
        'The severed head of a slug can grow a whole new body',
        'As you can tell Heroku had a long night...',
      ],
      displayedFirstQuote: false,
      previousQuote: undefined,
    };
  },
  methods: {
    cycleQuotes() {
      const ref = setInterval(() => {
        if (this.foo) {
          console.log('child', this.foo);
          const num = this.randomNum();
          if (this.displayedFirstQuote && num !== this.previousQuote) {
            this.previousQuote = num;
            this.animateText(num);
          } else if (!this.displayedFirstQuote) {
            this.displayedFirstQuote = true;
            this.animateText(false);
          } else {
            clearInterval(ref);
            if (this.previousQuote === 0) {
              this.animateText(this.previousQuote + 1);
            } else {
              this.animateText(this.previousQuote - 1);
            }
            this.cycleQuotes();
          }
        } else {
          clearInterval(ref);
          this.isLoading = false;
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
        if (i === false) {
          [this.marquee.innerText] = this.firstQuote;
        } else {
          this.marquee.innerText = this.quotes[i];
        }
        this.marquee.classList.add('read');
      }, 1000);
    },
    randomNum() {
      return Math.floor(Math.random() * this.quotes.length);
    },
  },
  props: {
    isLoading: Boolean,
    foo: Boolean,
  },
};
</script>

<style>
.marquee-text-container{
  overflow: hidden;
  max-width: 900px;
  text-align: center;
  padding: 10px;
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
