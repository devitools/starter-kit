import { Dialog } from 'quasar'

import $lang from './Lang'

/**
 * @param {string} message
 * @param {Object} options
 * @returns {Promise}
 */
export function alert (message, options = { title: '' }) {
  if (!options.title) {
    options.title = $lang('agnostic.dialog.alert.title')
  }
  const _options = {
    message: $lang(message, message),
    ...options
  }

  return Dialog.create(_options)
    .onOk(() => undefined)
    .onCancel(() => undefined)
    .onDismiss(() => undefined)
}

/**
 * @param {string} message
 * @param {Object} options
 * @returns {Promise}
 */
export function confirm (message, options = { title: '' }) {
  if (!options.title) {
    options.title = $lang('agnostic.dialog.confirm.title')
  }
  const _options = {
    persistent: true,
    ok: {
      label: $lang('agnostic.options.yesNo.yes'),
      flat: true
    },
    cancel: {
      label: $lang('agnostic.options.yesNo.no'),
      flat: true
    },
    message: $lang(message, message),
    ...options
  }

  return new Promise((resolve, reject) => {
    Dialog.create(_options)
      .onOk(() => resolve(true))
      .onCancel(() => reject({ type: 'cancel' }))
      .onDismiss(() => reject({ type: 'dismiss' }))
  })
}

/**
 * @param {string} message
 * @param {Object} options
 * @returns {Promise}
 */
export function prompt (message, options = { title: '', isValid: undefined }) {
  const { title, isValid } = options
  if (!title) {
    options.title = $lang('agnostic.dialog.prompt.title')
  }
  const _options = {
    cancel: true,
    persistent: true,
    prompt: {
      model: '',
      type: 'text',
      isValid
    },
    message: $lang(message, message),
    ...options
  }

  return new Promise((resolve, reject) => {
    Dialog.create(_options)
      .onOk((data) => resolve(data))
      .onCancel(() => reject({ type: 'cancel' }))
      .onDismiss(() => reject({ type: 'dismiss' }))
  })
}
