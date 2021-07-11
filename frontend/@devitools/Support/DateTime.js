import { dateFormatDefault } from 'src/settings/date'
import NamedRegExp from 'named-regexp-groups'

/**
 * @type {DateTime}
 */
export default class DateTime extends Date {
  /**
   * @param {string} string
   * @param {string|Array} format
   * @returns {DateTime}
   */
  static fromFormat (string, format = dateFormatDefault) {
    const formatters = {
      YYYY: '(?<YYYY>\\w+)',
      MM: '(?<MM>\\w+)',
      DD: '(?<DD>\\w+)',
      HH: '(?<HH>\\w+)',
      mm: '(?<mm>\\w+)',
      ss: '(?<ss>\\w+)'
    }
    const match = DateTime.parseMatch(format, formatters, string)
    if (!match) {
      return undefined
    }
    const defaults = {
      DD: 1, HH: 0, mm: 0, ss: 0
    }
    const g = Object.assign(defaults, match.groups)
    return new this(g.YYYY, g.MM - 1, g.DD, g.HH, g.mm, g.ss)
  }

  /**
   * @param formats
   * @param formatters
   * @param string
   */
  static parseMatch (formats, formatters, string) {
    if (!Array.isArray(formats)) {
      formats = [formats]
    }
    for (const index in formats) {
      if (!formats.hasOwnProperty(index)) {
        continue
      }
      const pattern = formats[index].replaceWith(formatters)
      const regex = new NamedRegExp(pattern)
      const match = regex.exec(string)
      if (match) {
        return match
      }
    }
  }

  /**
   * @param {string} base
   * @param {string} compare
   * @param {string} format
   * @returns {boolean}
   */
  static compareGreaterEqualThen (base, compare, format = undefined) {
    return DateTime
      .fromFormat(base, format)
      .isGreaterEqualThen(DateTime.fromFormat(compare, format))
  }

  /**
   * @param {string} base
   * @param {string} compare
   * @param {string} format
   * @returns {boolean}
   */
  static compareLessEqualThen (base, compare, format = undefined) {
    return DateTime
      .fromFormat(base, format)
      .isLessEqualThen(DateTime.fromFormat(compare, format))
  }

  /**
   * @param {string} base
   * @param {string} compare
   * @param {string} format
   * @returns {boolean}
   */
  static compareGreaterThen (base, compare, format = undefined) {
    return DateTime
      .fromFormat(base, format)
      .isGreaterThen(DateTime.fromFormat(compare, format))
  }

  /**
   * @param {string} base
   * @param {string} compare
   * @param {string} format
   * @returns {boolean}
   */
  static compareLessThen (base, compare, format = undefined) {
    return DateTime
      .fromFormat(base, format)
      .isLessThen(DateTime.fromFormat(compare, format))
  }

  /**
   * @param {Date|DateTime} date
   * @returns {boolean}
   */
  isLessEqualThen (date) {
    return this.getTime() <= date.getTime()
  }

  /**
   * @param {Date|DateTime} date
   * @returns {boolean}
   */
  isGreaterEqualThen (date) {
    return this.getTime() >= date.getTime()
  }

  /**
   * @param {Date|DateTime} date
   * @returns {boolean}
   */
  isLessThen (date) {
    return this.getTime() < date.getTime()
  }

  /**
   * @param {Date|DateTime} date
   * @returns {boolean}
   */
  isGreaterThen (date) {
    return this.getTime() > date.getTime()
  }

  /**
   * @returns {boolean}
   */
  isValid () {
    return true
  }

  /**
   * @returns {number}
   */
  month () {
    return this.getMonth()
  }

  /**
   * @returns {number}
   */
  year () {
    return this.getFullYear()
  }

  /**
   * @param {number} days
   * @returns {Date}
   */
  addDays (days) {
    const date = new DateTime(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }

  /**
   * @return {boolean}
   */
  __isLeapYear (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
  }

  /**
   * @return {*}
   */
  __getDaysInMonth (year, month) {
    return [31, (this.__isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
  }

  /**
   * @return {*}
   */
  isLeapYear () {
    return this.__isLeapYear(this.getFullYear())
  }

  /**
   * @return {*}
   */
  getDaysInMonth () {
    return this.__getDaysInMonth(this.getFullYear(), this.getMonth())
  }

  /**
   * @param value
   * @param followLast
   * @return {DateTime}
   */
  addMonths (value, followLast) {
    const current = this.getDate()
    this.setDate(1)
    const wasLast = current === this.getDaysInMonth()
    this.setMonth(this.getMonth() + value)
    if (followLast && wasLast) {
      this.setDate(this.getDaysInMonth())
      return this
    }
    this.setDate(Math.min(current, this.getDaysInMonth()))
    return this
  }

  /**
   * @param {string} base
   * @param {string} compare
   * @param {string} format
   * @returns {number}
   */
  static compareDiffDays (base, compare, format = undefined) {
    return DateTime
      .fromFormat(base, format)
      .diffDays(DateTime.fromFormat(compare, format))
  }

  /**
   * @param {Date|DateTime} compare
   * @returns {number}
   */
  diffDays (compare) {
    return Math.round((this - compare) / (1000 * 60 * 60 * 24))
  }

  /**
   * @param {string} format
   */
  format (format) {
    if (typeof format !== 'string') {
      return undefined
    }
    const YYYY = this.getFullYear()
    const MM = (this.getMonth() + 1).pad(2)
    const DD = this.getDate().pad(2)
    const HH = this.getHours().pad(2)
    const mm = this.getMinutes().pad(2)
    const ss = this.getSeconds().pad(2)
    return format.replaceWith({ YYYY, MM, DD, HH, mm, ss })
  }
}
