import './assets/scss/style.scss'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from "vuetify"
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueCookies from 'vue-cookies'
import router from './router/router.js'
import store from './store/store.js'

const vuetify= createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light'
    }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueCookies)
app.use(vuetify)
app.mount('#app')