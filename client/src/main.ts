// style
import './assets/main.css';
import './assets/flexy.css';
import './assets/reset.css';
// highlight.js color scheme
import 'highlight.js/styles/paraiso-dark.min.css';
// state
import { createPinia } from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate';
// vue
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersistedstate);
app.use(pinia);
app.use(router);

app.mount('#app');
