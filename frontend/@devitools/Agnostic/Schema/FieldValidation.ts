import Base from '../Base'
// @ts-ignore
import { helpers } from 'vuelidate/lib/validators'

import { withValidation } from '../../Util/validation'

/**
 * @class {FieldTable}
 */
export default abstract class FieldTable extends Base {
  /**
   * @param {string} alias
   * @param {Function|Object|Array|number|string} options
   * @returns {this}
   */
  validationAdd (alias: string, options: unknown): this {
    const name = this.__currentField
    this.__fields[name].$validations[alias] = options
    return this
  }

  /**
   * Register custom validator to field
   * @param {string} alias
   * @param {function} handler
   * @returns {this}
   */
  validationAs (alias: string, handler: Function): this {
    return this.validationAdd(alias, withValidation(handler))
  }

  /**
   * Requires non-empty data. Checks for empty arrays and strings containing only whitespaces.
   * @param {Boolean} required
   * @returns {this}
   */
  validationRequired (required = true): this {
    return this.validationAdd('required', required)
  }

  /**
   * Requires non-empty data only if provided property or predicate is true.
   * @params {Function} locator
   * @returns {this}
   */
  validationRequiredIf (locator: Function): this {
    return this.validationAdd('requiredIf', locator)
  }

  /**
   * Requires non-empty data only if provided property or predicate is true.
   * @params {Function} criteria
   * @returns {this}
   */
  validationRequiredWhen (criteria: Function): this {
    return this.validationAdd('requiredIf', function (value: unknown) {
      // @ts-ignore
      const validate = criteria.call(this)
      if (!validate) {
        return true
      }
      return !!value
    })
  }

  /**
   * Requires non-empty data only if provided property or predicate is false.
   * @params {Function} locator
   * @returns {this}
   */
  validationRequiredUnless (locator: Function): this {
    return this.validationAdd('requiredUnless', locator)
  }

  /**
   * Requires the input to have a minimum specified length, inclusive. Works with arrays.
   * @param {number} minLength
   * @returns {this}
   */
  validationMinLength (minLength = 3): this {
    return this.validationAdd('minLength', [minLength])
  }

  /**
   * Requires the input to have a maximum specified length, inclusive. Works with arrays.
   * @param {number} maxLength
   * @returns {this}
   */
  validationMaxLength (maxLength = 10): this {
    return this.validationAdd('maxLength', [maxLength])
  }

  /**
   * Requires entry to have a specified minimum numeric value or Date.
   * @params {number} min
   * @returns {this}
   */
  validationMinValue (min: number): this {
    return this.validationAdd('minValue', [min])
  }

  /**
   * Requires entry to have a specified maximum numeric value or Date.
   * @params {number} max
   * @returns {this}
   */
  validationMaxValue (max: number): this {
    return this.validationAdd('maxValue', [max])
  }

  /**
   * Checks if a number or Date is in specified bounds. Min and max are both inclusive.
   * @params {number} min
   * @params {number} max
   * @returns {this}
   */
  validationBetween (min: number, max: number): this {
    return this.validationAdd('between', [min, max])
  }

  /**
   * Accepts only alphabet characters.
   * @returns {this}
   */
  validationAlpha (): this {
    return this.validationAdd('alpha', true)
  }

  /**
   * Accepts only alphanumerics.
   * @returns {this}
   */
  validationAlphaNum (): this {
    return this.validationAdd('alphaNum', true)
  }

  /**
   * Accepts only numerics.
   * @returns {this}
   */
  validationNumeric (): this {
    return this.validationAdd('numeric', true)
  }

  /**
   * Accepts positive and negative integers.
   * @returns {this}
   */
  validationInteger (): this {
    return this.validationAdd('integer', true)
  }

  /**
   * Accepts positive and negative decimal numbers.
   * @returns {this}
   */
  validationDecimal (): this {
    return this.validationAdd('decimal', true)
  }

  /**
   * Accepts valid email addresses. Keep in mind you still have to carefully verify it on your server, as it is impossible to tell if the address is real without sending verification email.
   * @returns {this}
   */
  validationEmail (): this {
    return this.validationAdd('email', true)
  }

  /**
   * Accepts valid IPv4 addresses in dotted decimal notation like 127.0.0.1.
   * @returns {this}
   */
  validationIpAddress (): this {
    return this.validationAdd('ipAddress', true)
  }

  /**
   * Accepts valid MAC addresses like 00:ff:11:22:33:44:55. Don't forget to call it macAddress(), as it has optional parameter. You can specify your own separator instead of ':'. Provide empty separator macAddress('') to validate MAC addresses like 00ff1122334455.
   * @params separator=':'
   * @returns {this}
   */
  validationMacAddress (): this {
    return this.validationAdd('macAddress', true)
  }

  /**
   * Test if value is a password
   * @returns {this}
   */
  validationPassword (): this {
    return this.validationAdd('password', helpers.regex('password', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$^+=!*()@%&]?).{6,}$/))
  }

  /**
   * Checks for equality with a given property.
   * @params {Function | string[]} locator
   * @returns {this}
   */
  validationSameAs (locator: Function | string[]): this {
    return this.validationAdd('sameAs', locator)
  }

  /**
   * Accepts only URLs.
   * @returns {this}
   */
  validationUrl (): this {
    return this.validationAdd('url', true)
  }

  /**
   * @param {number} size "Size in mb (20 * 1024 = 20mb)"
   * @return {this}
   */
  validationMaxFileSize (size: number): this {
    const handler = helpers.withParams({ size }, (value: File) => {
      if (!value) {
        return true
      }
      const fileSizeInKb = value.size / 1024
      const valueSize = Math.round(fileSizeInKb * 100) / 100
      return valueSize <= size
    })
    return this.validationAs('maxFileSize', handler)
  }

  /**
   * @return {this}
   */
  validationDate (): this {
    const handler = helpers.withParams({}, (value: string|unknown|undefined) => {
      if (!value) {
        return true
      }
      if (typeof value !== 'string') {
        return false
      }
      return /\d{4}-[01]\d-[0-3]\d/.test(value)
    })
    return this.validationAs('date', handler)
  }

  /**
   * @returns {this}
   */
  validationClear (): this {
    const name = this.__currentField
    this.__fields[name].$validations = {}
    return this
  }

  /**
   * @param {string} validation
   * @returns {this}
   */
  validationRemove (validation: string): this {
    const name = this.__currentField
    delete this.__fields[name].$validations[validation]
    return this
  }
}
