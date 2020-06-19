import { notify } from '@devitools/message'

/**
 * @param {string} message
 * @param options
 */
export const notifyToast = (message, options = {}) => {
  notify({ message, ...options })
}

/**
 * @param {string} message
 * @param options
 */
export const notifySuccess = (message, options = {}) => {
  notify({ message, icon: 'done', ...options, color: 'positive' })
}

/**
 * @param {string} message
 * @param options
 */
export const notifyError = (message, options = {}) => {
  notify({ message, icon: 'error_outline', ...options, color: 'negative' })
}

/**
 * @param {string} message
 * @param options
 */
export const notifyWarning = (message, options = {}) => {
  notify({ message, icon: 'priority_high', ...options, color: 'warning', textColor: 'dark' })
}
