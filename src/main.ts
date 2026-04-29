import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { vReveal } from './directives/vReveal'

createApp(App)
  .use(router)
  .directive('reveal', vReveal)
  .mount('#app')
