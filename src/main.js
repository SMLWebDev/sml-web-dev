import { createApp } from 'vue'
import './styles/main.scss'
import './assets/fonts/orbitron.css'
import App from './App.vue'
import { install } from 'vue3-recaptcha-v2'

createApp(App)
    .use(install, {
        sitekey: import.meta.env.VITE_SML_RECAPTCHA_SITE_KEY,
    })
    .mount('#app')
