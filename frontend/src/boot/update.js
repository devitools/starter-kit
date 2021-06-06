import { Loading, Notify } from 'quasar'

import $lang from '@devitools/Lang'
import $emporium from '@devitools/emporium'
import { replacement } from '@devitools/Util/string'

/**
 */
export const checkForUpdates = function () {
  if ('serviceWorker' in navigator) {
    const scriptURL = process.env.SERVICE_WORKER_FILE || '/service-worker.js'
    navigator.serviceWorker
      .register(scriptURL, { scope: '/' })
      .then((registration) => registration.update())
      .catch(() => applyUpdate())
  }
}

/**
 * @param registration
 */
export const applyUpdate = (registration) => {
  const apply = () => {
    $emporium.commit('updateModified', false)
    reloadUpdate(registration)
  }

  if (!$emporium.state.modified) {
    apply()
    return
  }

  confirmUpdate(apply)
}

/**
 * @param {function(): void} handler
 */
export const confirmUpdate = (handler) => {
  const timeout = process.env.NODE_ENV === 'production' ? 1000 * 60 * 5 : 15000
  const minutes = timeout / (1000 * 60)
  const warning = $lang('worker.update.warning')
  const message = replacement(warning, { minutes })
  Notify.create({
    message,
    timeout, // You can adjust this, use 0 for infinite
    html: true,
    closeBtn: false,
    progress: true,
    onDismiss: handler,
    multiLine: true,
    actions: [
      {
        label: $lang('worker.update.confirm'),
        icon: 'get_app',
        color: 'yellow'
      }
    ]
  })
}

/**
 * @param registration
 */
export const reloadUpdate = (registration) => {
  Loading.show({
    delay: 0,
    message: $lang('worker.update.updating')
  })
  try {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  } catch (e) {
    // silent is gold
  }
  window.location.reload(true)
}

/**
 */
export default () => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  window.setInterval(checkForUpdates, 60 * 60 * 1000)
}
