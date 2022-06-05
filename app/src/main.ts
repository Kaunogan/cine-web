import { createApp } from 'vue'
import PhosphorVue from 'phosphor-vue'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/index.css'

const app = createApp(App)

app.use(router)
app.use(PhosphorVue)

app.mount('#app')
