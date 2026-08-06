import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import './style.css'

void (async () => {
  try {
    const meta = document
      .querySelector('meta[name="build-id"]')
      ?.getAttribute('content')
    if (!meta) return
    const res = await fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`, {
      cache: 'no-store',
    })
    if (!res.ok) return
    const { buildId } = (await res.json()) as { buildId?: string }
    if (!buildId || buildId === meta) return
    const reloadedFor = sessionStorage.getItem('build-id-reloaded')
    if (reloadedFor === buildId) return
    sessionStorage.setItem('build-id-reloaded', buildId)
    window.location.reload()
  } catch {
    // 네트워크 실패 등은 무시 — 캐시된 화면이라도 일단 보여준다
  }
})()

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primeui',
        order: 'theme, base, primeui, components, utilities',
      },
    },
  },
})

app.mount('#app')
