import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(VueQueryPlugin)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

app.use(router)

app.mount('#app')
