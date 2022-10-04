import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { buildIndexFromArtistManifest } from './service/minisearch'
await buildIndexFromArtistManifest()

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
