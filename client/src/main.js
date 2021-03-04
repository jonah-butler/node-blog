import VueFroala from 'vue-froala-wysiwyg';
// import Highlight from 'vue-highlightjs';
// import hljs from 'highlight.js';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/plugins/code_view.min';
import 'highlight.js/styles/qtcreator_dark.css';
// import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';

require('froala-editor/js/froala_editor.pkgd.min.js');
// require('froala-editor/js/third_party/image_tui.min');

Vue.use(VueFroala);
// Vue.use(Highlight);
// Vue.directive('highlightjs', {
//   deep: true,
//   bind(el, binding) {
//     // on first bind, highlight all targets
//     const targets = el.querySelectorAll('code');
//     targets.forEach((target) => {
//       // if a value is directly assigned to the directive, use this
//       // instead of the element content.
//       if (binding.value) {
//         const text = target;
//         text.textContent = binding.value;
//         console.log(text.textContent);
//       }
//       hljs.highlightBlock(target);
//     });
//   },
//   componentUpdated(el, binding) {
//     // after an update, re-fill the content and then highlight
//     const targets = el.querySelectorAll('code');
//     targets.forEach((target) => {
//       if (binding.value) {
//         const text = target;
//         text.textContent = binding.value;
//         hljs.highlightBlock(target);
//       }
//     });
//   },
// });
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
