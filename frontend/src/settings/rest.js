import { get } from '@devitools/Util/general'
import { actionFailErrors, actionFailMessage } from 'src/settings/schema'

/**
 * @param {ContainerComponent} context
 * @return {number}
 */
export const delayLoading = (context) => {
  return 800
}

/**
 * @param {Object} parameters
 * @returns {Function}
 */
export const parseRestRecords = (parameters = {}) => {
  const { rowsPerPage, sortBy, descending, page } = parameters
  return (response) => {
    let rows = []
    if (Array.isArray(response.data)) {
      rows = response.data
    }

    const rowsNumber = get(response, 'meta.total', rows.length)
    const pagesNumber = rowsNumber > rowsPerPage
      ? Math.ceil(rowsNumber / rowsPerPage)
      : 1

    return { rows, rowsNumber, pagesNumber, rowsPerPage, sortBy, descending, page }
  }
}

/**
 * @param {Object} parameters
 * @return {Function}
 */
export const parseRestRecord = (parameters = {}) => {
  return (response) => response.data
}

/**
 * @param {*} error
 * @param {string|string[]} fail
 * @param validation
 */
export function parseRestError (error, fail, validation = undefined) {
  const status = this.$util.get(error, 'response.status')
  const message = actionFailMessage(error)

  const showMessage = (type, lang = undefined) => {
    if (message) {
      this.$message[type](lang || message)
      return
    }
    if (error.type) {
      this.$message[type](this.$lang(lang || `validation.${error.type}`))
      return
    }
    this.$message[type](this.$lang(lang || fail))
  }

  if (status !== 400) {
    showMessage('error')
    return
  }

  showMessage('warning', validation)

  const errors = actionFailErrors(error)
  if (!Array.isArray(errors)) {
    return
  }

  this.errors = {}
  this.inheritErrors = {}

  errors.forEach((error) => {
    const propertyPath = String(error['property_path']).split('.')
    const property = propertyPath[0]
    if (!this.components[property]) {
      this.triggerHook('validate:error', { error })
      return
    }
    const entry = {
      validation: error['message'],
      parameters: error['parameters'] || {}
    }
    this.errors[property] = entry

    if (propertyPath.length > 1) {
      propertyPath.shift()
      this.inheritErrors[property] = { [propertyPath.join('.')]: entry }
    }
  }, {})
}
