/**
 * @param {function} validation
 * @returns {function}
 */
export const withValidation = (validation) => {
  return function (value) {
    if (!value) {
      return true
    }
    return validation.call(this, value)
  }
}
