import { primaryKey } from 'src/settings/schema'

import Base from '../Base'
import Skeleton from '../Skeleton'
import Schema from '../../Agnostic/Schema'
import { Payload, UserEvent } from '../../Agnostic/Helper/interfaces'

import { format } from '../../Util/formatter'

/**
 * @class {FieldAs}
 */
export default abstract class FieldAs extends Base {
  /**
   * @param {Object} options
   * @returns {this}
   */
  fieldAsPrimaryKey (this: Skeleton, options: Record<string, unknown> = {}) {
    options = {
      tableWith: '80px',
      formWidth: 100,
      tableShow: false,
      key: primaryKey,
      hiddenForm: true,
      ...options
    }

    this.addField(String(options.key), 'string')
      .fieldTableWidth(String(options.tableWith))
      .fieldFormWidth(Number(options.formWidth))
      .fieldTableShow(Boolean(options.tableShow))
      .fieldFormHidden(Boolean(options.hiddenForm))
      .fieldFormDisabled(true)
      .fieldPrimaryKey()
      .fieldAppendAttrs({ uppercase: false })

    return this
  }

  /**
   * @param {Object} attrs
   * @returns {this}
   */
  fieldAsZip (attrs = {}) {
    this.fieldAsMasked('#####-###', { placeholder: '39500-201' })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {this}
   */
  fieldAsPhone (attrs = {}) {
    this.fieldAsMasked('(##) ####-####', { placeholder: '(21) 3289-3950' })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {this}
   */
  fieldAsCell (attrs = {}) {
    this.fieldAsMasked('(##) #####-####', { placeholder: '(44) 98956-3049' })
    this.setType('string')
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {this}
   */
  fieldAsPhoneMultiMask (this: Schema, attrs = {}) {
    this.fieldAsMasked('(##) #####-####', { placeholder: '(44) 98956-3049' })
      .fieldOn('keypress', function (payload: Payload) {
        const $event = payload.$event as UserEvent<HTMLInputElement>
        const value = String($event.target.value)
        let mask = '(##) ####-####'
        if (value.length >= 14) {
          mask = '(##) #####-####'
        }
        payload.field.attrs.mask = mask
      })
      .fieldOn('input', function (payload: Payload) {
        const $event = payload.$event as UserEvent<HTMLInputElement>
        const value = String($event)
        if (value.length >= 11) {
          return
        }
        payload.field.attrs.mask = '(##) ####-####'
      })
    this.setType('string')
    return this
  }

  /**
   * Mask tokens:
   * |------|----------------------------------------------------|
   * | #    | Numeric                                            |
   * |------|----------------------------------------------------|
   * | S    | Letter, a to z, case insensitive                   |
   * | N    | Alphanumeric, case insensitive for letters         |
   * | A    | Letter, transformed to uppercase                   |
   * | a    | Letter, transformed to lowercase                   |
   * | X    | Alphanumeric, transformed to uppercase for letters |
   * | x    | Alphanumeric, transformed to lowercase for letters |
   * |------|----------------------------------------------------|
   *
   * @param {string} mask
   * @param {Record<string, unknown>} attrs
   * @returns {this}
   */
  fieldAsMasked (mask: string, attrs: Record<string, unknown> = {}) {
    let { placeholder, tableFormat } = attrs
    if (!placeholder) {
      placeholder = mask.replace(/#/g, '9')
    }
    if (!tableFormat) {
      tableFormat = (value: string) => {
        if (typeof value === 'undefined' || value === null) {
          return '-'
        }
        return format(String(value), mask)
      }
    }
    this.appendAttrs({
      mask,
      unmaskedValue: true,
      ...attrs,
      placeholder: `ex.: ${placeholder}`
    })
    this.setLayout({ tableFormat })
    this.setType('string')
    return this
  }
}
