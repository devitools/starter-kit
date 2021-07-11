import { register } from 'register-service-worker'
// noinspection ES6PreferShortImport
import { applyUpdate } from '../src/boot/update'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  registrationOptions: { scope: '/' },

  ready () {
    console.log('[pwa] App is being served from cache by a service worker.')
  },

  registered (/* registration */) {
    console.log('[pwa] Service worker has been registered.')
  },

  updatefound (/* registration */) {
    console.log('[pwa] New content is downloading.')
  },

  cached (registration) {
    console.warn('[pwa] Content has been cached for offline use.')

    navigator.serviceWorker.ready.then(() => applyUpdate(registration))
  },

  updated (registration) {
    console.warn('[pwa] New content is available; please refresh.')

    navigator.serviceWorker.ready.then(() => applyUpdate(registration))
  },

  offline () {
    console.log('[pwa] No internet connection found. App is running in offline mode.')
  },

  error (err) {
    if (process.env.NODE_ENV !== 'production') {
      return
    }
    console.error('Error during service worker registration:', err)
  }
})
