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

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN || 'YOUR_AUTH0_DOMAIN',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'YOUR_AUTH0_CLIENT_ID',
    authorizationParams: {
      redirect_uri: window.location.origin 
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