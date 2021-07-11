import { Notify } from 'quasar'
import { notifyError, notifySuccess, notifyToast, notifyWarning } from 'src/settings/message'

/**
 * @param {Object} options
 * @param {Object} action
 * @returns {*}
 */
export const notify = (options, action = {}) => {
  const defaults = {
    color: '',
    textColor: '',
    icon: '',
    message: '',
    position: 'top-right',
    duration: 5000,
    progress: true,
    actions: [
      {
        icon: 'close',
        color: options.textColor || 'white',
        handler: () => undefined,
        ...action
      }
    ]
  }
  Notify.create({ ...defaults, ...options })
}

/**
 * @param {string} message
 * @param options
 */
export const toast = (message, options = {}) => {
  notifyToast(message, options)
}

/**
 * @param {string} message
 * @param options
 */
export const success = (message, options = {}) => {
  notifySuccess(message, options)
}

/**
 * @param {string} message
 * @param options
 */
export const error = (message, options = {}) => {
  notifyError(message, options)
}

/**
 * @param {string} message
 * @param options
 */
export const warning = (message, options = {}) => {
  notifyWarning(message, options)
}
