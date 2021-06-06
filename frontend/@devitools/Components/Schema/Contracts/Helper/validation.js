import * as Validators from 'vuelidate/lib/validators'

/**
 * @param {Object} validations
 * @returns {Object}
 */
export const parseValidations = (validations) => {
  for (const validator in validations) {
    if (!validations[validator]) {
      continue
    }
    if (typeof validations[validator] === 'function') {
      continue
    }
    if (Validators[validator]) {
      let action = Validators[validator]
      if (Array.isArray(validations[validator])) {
        // eslint-disable-next-line prefer-spread
        action = action.apply(null, validations[validator])
      }
      validations[validator] = action
      continue
    }
    throw Error(`Invalid validator ${validator}`)
  }
  return validations
}
