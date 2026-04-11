import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App)
.use(router)
.mount('#app')
