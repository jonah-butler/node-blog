import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/srcery.css';

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
