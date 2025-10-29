import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura/';
import { ToastService } from 'primevue';
import { ConfirmationService } from 'primevue'


import '@/assets/styles.scss'

const app = createApp(App)

const isDeployed = window.location.origin.includes('zpr-120.fer.hr')

// dynamic base URL and redirect URI
const basePath = isDeployed ? '/p2025/' : '/'
const redirectUri = isDeployed
  ? 'https://zpr-120.fer.hr/p2025'
  : 'http://localhost:5173'

app.use(
  createAuth0({
    domain: 'dev-vvufctniwl0ae1qu.us.auth0.com',
    clientId: 'nb5GQLwh36jpF32RhGQqJKspJT5mCkyD',
    authorizationParams: {
      redirect_uri: redirectUri
    }
  })
);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark'
    }
  }
})
app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.use(router)

app.mount('#app')