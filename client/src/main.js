import VueFroala from 'vue-froala-wysiwyg';
// import Highlight from 'vue-highlightjs';
// import hljs from 'highlight.js';
// import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/plugins/code_view.min';
import 'highlight.js/styles/qtcreator_dark.css';

import 'froala-editor/css/froala_editor.pkgd.min.css';

require('froala-editor/js/froala_editor.pkgd.min.js');
// require('froala-editor/js/third_party/image_tui.min');

Vue.use(VueFroala);

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
