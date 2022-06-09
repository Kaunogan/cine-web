import { createApp } from 'vue'
import PhosphorVue from 'phosphor-vue'
import App from '@/App.vue'
import router from '@/router'
import Toast, { PluginOptions } from 'vue-toastification'
import '@/assets/index.css'
import 'vue-toastification/dist/index.css'
import { createPinia } from 'pinia'

const toastOptions: PluginOptions = {
  transition: 'Vue-Toastification__fade',
  draggable: false,
}

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(PhosphorVue)
app.use(Toast, toastOptions)

app.mount('#app')
