import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueGoogleMaps from '@fawmi/vue-google-maps';

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from '@/plugins/validation'
import i18n from '@/plugins/i18n'
const app = createApp(App)



app.use(createPinia())
app.use(i18n)
app.use(VeeValidatePlugin)
app.use(router)

app.mount('#app')
