// style
import './assets/main.css';
// import './assets/flexy.css';
import './assets/reset.css';
// state
import { createPinia } from 'pinia'
// vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
