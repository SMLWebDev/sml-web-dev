import { createApp } from 'vue'
import './styles/main.scss'
import './assets/fonts/orbitron.css'
import App from './App.vue'
import router from './router'
import { install } from 'vue3-recaptcha-v2'
import { Analytics } from '@vercel/analytics/vue'

createApp(App)
    .use(router)
    .use(install, {
        sitekey: import.meta.env.VITE_SML_RECAPTCHA_SITE_KEY,
    })
    .use(Analytics)
    .mount('#app')
