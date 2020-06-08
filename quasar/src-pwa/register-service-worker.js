import { Loading, Notify } from 'quasar'
// noinspection ES6CheckImport
import { register } from 'register-service-worker'
import $lang from '@devitools/Lang'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  registrationOptions: { scope: './' },

  ready () {
    // console.log('App is being served from cache by a service worker.')

    Notify.create({ message: $lang('worker.ready.message') })
  },

  registered (registration) {
    // console.log('Service worker has been registered.')
  },

  cached (registration) {
    // console.log('Content has been cached for offline use.')

    // Notify.create({ message: $lang('worker.cached.message') })
  },

  updatefound (registration) {
    // console.log('New content is downloading.')
  },

  updated (registration) {
    // console.log('New content is available; please refresh.')

    Notify.create({
      message: $lang('worker.update.message'),
      timeout: 0, // You can adjust this, use 0 for infinite
      closeBtn: $lang('worker.update.close'),
      actions: [
        {
          label: $lang('worker.update.confirm'),
          icon: 'get_app',
          color: 'white',
          handler () {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload()
            })
            // This process if rather fast generally, but for better experience show "Loading"
            Loading.show({
              delay: 0,
              message: $lang('worker.update.updating')
            })
            try {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' })
            } catch (e) {
              // silent
            }
          }
        }
      ]
    })
  },

  offline () {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error (err) {
    if (process.env.NODE_ENV !== 'production') {
      return
    }
    console.error('Error during service worker registration:', err)
  }
})
