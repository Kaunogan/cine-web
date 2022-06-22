import { createApp } from 'vue'
import PhosphorVue from 'phosphor-vue'
import vSelect from 'vue-select'
import Toast, { PluginOptions } from 'vue-toastification'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '@/App.vue'
import router from '@/router'

import '@/assets/css/index.css'
import 'vue-toastification/dist/index.css'
import 'vue-select/dist/vue-select.css'

const toastOptions: PluginOptions = {
  transition: 'Vue-Toastification__fade',
  draggable: false,
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.component('VSelect', vSelect)

app.use(router)
app.use(pinia)
app.use(PhosphorVue)
app.use(Toast, toastOptions)

app.mount('#app')
