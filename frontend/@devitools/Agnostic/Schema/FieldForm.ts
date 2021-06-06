import Base from '../Base'
import { fieldsReorder } from '../Helper'

/**
 * @class {FieldForm}
 */
export default abstract class FieldForm extends Base {
  /**
   * @param {number} formWidth
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormWidth (formWidth: number, scopes?: Record<string, unknown>): this {
    this.setLayout({ formWidth })
    if (scopes) {
      this.registerCreated('$layout.formWidth', scopes)
    }
    return this
  }

  /**
   * @param {number} formHeight
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormHeight (formHeight: number, scopes?: Record<string, unknown>): this {
    this.setLayout({ formHeight })
    if (scopes) {
      this.registerCreated('$layout.formHeight', scopes)
    }
    return this
  }

  /**
   * @param {boolean} formHidden
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormHidden (formHidden = true, scopes?: Record<string, unknown>): this {
    this.setLayout({ formHidden })
    if (scopes) {
      this.registerCreated('$layout.formHidden', scopes)
    }
    return this
  }

  /**
   * @param {string} formName
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormName (formName: string, scopes?: Record<string, unknown>): this {
    this.setLayout({ formName })
    if (scopes) {
      this.registerCreated('$layout.formName', scopes)
    }
    return this
  }

  /**
   * @param {Boolean} disable
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormDisabled (disable = true, scopes?: Record<string, unknown>): this {
    this.appendAttrs({ disable })
    if (scopes) {
      this.registerCreated('attrs.disable', scopes)
    }
    return this
  }

  /*
  * @param {Boolean} type
   * @param {Record<string, unknown>} [scopes]
  * @returns {Screen}
  */
  fieldFormAutofocus (autofocus = true, scopes?: Record<string, unknown>): this {
    this.appendAttrs({ autofocus })
    if (scopes) {
      this.registerCreated('attrs.autofocus', scopes)
    }
    return this
  }

  /**
   * @param {*} value
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormDefaultValue (value: unknown, scopes?: Record<string, unknown>): this {
    this.appendAttrs({ value })
    if (scopes) {
      this.registerCreated('attrs.value', scopes)
    }
    return this
  }

  /**
   * @param {Boolean} upperCase
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormUpperCase (upperCase = true, scopes?: Record<string, unknown>): this {
    this.appendAttrs({ upperCase })
    if (scopes) {
      this.registerCreated('attrs.upperCase', scopes)
    }
    return this
  }

  /**
   * @param {string} placeholder
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormPlaceholder (placeholder = '', scopes?: Record<string, unknown>): this {
    if (!placeholder) {
      placeholder = String(this.$lang(`fields.${this.__currentField}.placeholder`))
    }
    this.appendAttrs({ placeholder })
    if (scopes) {
      this.registerCreated('attrs.placeholder', scopes)
    }
    return this
  }

  /**
   * @param {string} formBackground
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormBackground (formBackground: string, scopes?: Record<string, unknown>): this {
    this.setLayout({ formBackground })
    if (scopes) {
      this.registerCreated('$layout.formBackground', scopes)
    }
    return this
  }

  /**
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormErrorHide (scopes?: Record<string, unknown>): this {
    this.setLayout({ formError: false })
    if (scopes) {
      this.registerCreated('$layout.formError', scopes)
    }
    return this
  }

  /**
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormErrorShow (scopes?: Record<string, unknown>): this {
    this.setLayout({ formError: true })
    if (scopes) {
      this.registerCreated('$layout.formError', scopes)
    }
    return this
  }

  /**
   * @param {number} order
   * @param {boolean} updateOthers
   * @param {Record<string, unknown>} [scopes]
   * @returns {this}
   */
  fieldFormOrder (order: number, updateOthers = false, scopes?: Record<string, unknown>): this {
    this.setLayout({ formOrder: order })
    if (updateOthers) {
      fieldsReorder(this.__fields, this.__currentField, 'formOrder', order)
    }
    if (scopes) {
      this.registerCreated('$layout.formOrder', scopes)
    }
    return this
  }

  /**
   * @param {string | Function} filler
   * @param {Record<string, unknown>} parameters
   * @returns {this}
   */
  fieldFormFill (filler?: string | Function, parameters?: Record<string, unknown>): this {
    if (typeof filler === 'function') {
      this.setFill(filler)
      return this
    }

    if (typeof filler !== 'string') {
      const type = String(this.__fields[this.__currentField].$type)
      this.setFill({ method: `default-${type}`, parameters: {} })
      return this
    }

    this.setFill({ method: filler, parameters: (parameters || {}) })
    return this
  }
}
