import { v1 as uuidV1 } from 'uuid'

import { $router } from 'src/router'
import { SEPARATION_OPERATOR } from 'src/settings/schema'
import { replacement } from './string'
import { toast } from '../message'
import $lang from '../Lang'

/**
 * @param {*} element
 * @param {String|Array} path
 * @param {*} fallback
 * @returns {*}
 */
export const get = (element, path, fallback = undefined) => {
  if (element === undefined || element === null) {
    return fallback
  }

  // break the path in pieces bt dot
  let search = path
  if (!Array.isArray(path)) {
    search = String(path).split('.').filter((pieces) => pieces && pieces.length)
  }

  // try to access a property that has a dot in its name
  const alias = search.join('.')
  // if the property exists...
  if (element[alias]) {
    // ...then the job is done
    return element[alias]
  }

  // search is over...
  if (!search.length) {
    // return the element
    return element
  }

  // remove a property of the list
  let property = search.shift()
  if (Array.isArray(element)) {
    // configure the accessor
    // eslint-disable-next-line no-useless-escape
    property = String(property).replace(/[\[\]]+/g, '')
  }
  // try again
  return get(element[property], search, fallback)
}

/**
 * @param {Object|Array} element
 * @param {string|Array} path
 * @param {*} value
 * @returns {Record<string, unknown>}
 */
export const set = (element, path, value) => {
  if (Object(element) !== element) {
    // When obj is not an object
    return element
  }
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || []
  }

  /*
   * @param {*} accumulator
   * @param {*} current
   * @param {*} key
   */
  const reducer = (accumulator, current, key) => {
    const value = Object(
      accumulator[current]) === accumulator[current] // Does the key exist and is its value an object?
      // Yes: then follow that path
      ? accumulator[current]
      // No: create the key. Is the next key a potential array-index?
      : accumulator[current] = Math.abs(path[key + 1]) >> 0 === +path[key + 1]
        ? [] // Yes: assign a new array object
        : {} // No: assign a new plain object
    return value
  }

  path.slice(0, -1).reduce(reducer, element)[path[path.length - 1]] = value // Finally assign the value to the last key
  return element // Return the top-level object to allow chaining
}

/**
 * @param target
 * @param options
 */
export const browse = (target, options = undefined) => {
  if (typeof target === 'undefined') {
    return
  }

  if (typeof target === 'string' && options && options.blank) {
    window.location.assign(target)
    return
  }

  if (typeof target === 'number') {
    $router.go(target)
    return
  }

  if (typeof target === 'string') {
    target = { path: target, query: {} }
  }

  if (options === true || (options && typeof options === 'object' && options.keep)) {
    target.query = { ...$router.currentRoute.query, ...target.query }
  }
  if (options && typeof options === 'object' && options.exclude) {
    delete target.query[options.exclude]
  }

  const regex = (expression) => new RegExp(`:${expression}`, 'g')
  target.path = replacement(target.path, $router.currentRoute.params, regex)

  $router.push(target)
}

/**
 * @param {*} element
 * @param {function} action
 * @returns {*}
 */
export const clone = (element, action = (value) => value) => {
  // Handle the 3 simple types, and null or undefined
  if (element === null || element === undefined || typeof element !== 'object') {
    return action(element)
  }

  // Handle File
  if (element instanceof File) {
    return new File([element], element.name)
  }

  // Handle Date
  if (element instanceof Date) {
    const date = new Date()
    date.setTime(element.getTime())
    return action(date)
  }

  // Handle Array
  if (element instanceof Array) {
    return element.map((item) => clone(item, action))
  }

  // Handle Object
  if (element instanceof Object) {
    const reduce = (accumulate, property) => {
      accumulate[property] = clone(element[property], action)
      return accumulate
    }
    return Object.keys(element).reduce(reduce, {})
  }

  throw new Error('Unable to copy element! Its type isn\'t supported.')
}

/**
 * @returns {string}
 */
export const uuid = () => {
  return uuidV1()
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function is (value) {
  if (typeof value === 'undefined') {
    return false
  }
  if (value === null) {
    return false
  }
  if (typeof value === 'string') {
    return value.length > 0
  }
  if (typeof value === 'number') {
    return true
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0
  }
  return !!value
}

/**
 * Deep merge two objects.
 *
 * @param target
 * @param sources
 */
export const mergeDeep = (target, ...sources) => {
  if (!sources.length) {
    return target
  }

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (!source.hasOwnProperty(key)) {
        continue
      }

      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        mergeDeep(target[key], source[key])
        continue
      }

      Object.assign(target, { [key]: source[key] })
    }
  }

  return mergeDeep(target, ...sources)
}

/**
 * @param {unknown} object
 * @param {string} prefix
 * @returns {string}
 */
export const serialize = (object, prefix = '') => {
  const string = []
  for (const property in object) {
    if (!object.hasOwnProperty(property)) {
      continue
    }
    const key = prefix ? `${prefix}[${property}]` : property
    const value = object[property]
    if (value === undefined) {
      continue
    }
    let serialized = `${key}=${value}`
    if (typeof value === 'object') {
      serialized = serialize(value, key)
    }
    string.push(serialized)
  }
  return string.join('&')
}

/**
 * @param {string} url
 * @param {string} prefix
 * @returns {Record<string, unknown>}
 */
export const unSerialize = (url, prefix = '') => {
  const object = {}
  const regex = /(^|&)([^=]+)=([^&]+)/g
  let matches
  let key
  let value

  while ((matches = regex.exec(url)) !== null) {
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++
    }
    matches.forEach((match, groupIndex) => {
      if (groupIndex === 0 || groupIndex === 1) {
        return
      }
      if (groupIndex === 2) {
        key = !prefix ? match : match.substring(prefix.length + 1, match.length - 1)
        return
      }
      value = match
    })
    if (!key || !value) {
      continue
    }
    object[key] = value
  }
  return object
}

/**
 * @param {string|number|boolean} value
 * @param {string} operator
 * @returns {string}
 */
export const withSeparator = (value, operator = undefined) => {
  if (operator) {
    return `${operator}${SEPARATION_OPERATOR}${value}`
  }
  if (typeof value === 'number' || typeof value === 'boolean' || !isNaN(Number(operator))) {
    return `eq${SEPARATION_OPERATOR}${value}`
  }
  return `like${SEPARATION_OPERATOR}${value}`
}

/**
 * @param string
 */
export const withoutSeparator = (string) => {
  return String(string.split(SEPARATION_OPERATOR).pop())
}

/**
 * @param {*} response
 * @param {number} time
 * @returns {Promise<any>}
 */
export const resolve = (response, time = 500) => {
  return new Promise(function (resolve) {
    window.setTimeout(() => resolve(response), time)
  })
}

/**
 * @param {*} response
 * @param {number} time
 * @returns {Promise<any>}
 */
export const reject = (response, time = 500) => {
  return new Promise(function (resolve, reject) {
    window.setTimeout(() => reject(response), time)
  })
}

/**
 * @param {Array} options
 * @param {*} value
 * @returns {*}
 */
export const findValueInOptions = (options, value) => {
  const element = options.find((option) => String(option.value) === String(value))
  if (element && element.label) {
    return element.label
  }
  return value
}

/**
 * @param {Function|Object} value
 * @returns {*}
 */
export const run = (value) => {
  return clone(typeof value === 'function' ? value() : value)
}

/**
 * @param {Object} payload
 * @param {number} timeout
 * @return {Promise<unknown>}
 */
export const promisify = (payload, timeout = 800) => {
  return new Promise(function (resolve) {
    const handler = () => resolve(payload)
    window.setTimeout(handler, timeout)
  })
}

/**
 * @return {string}
 */
export const unique = () => (new Date()).getTime().toString(32)

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isUndefined = value => value === undefined

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isNull = value => value === null

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isBoolean = value => typeof value === 'boolean'

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isArray = value => Array.isArray(value)

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isDate = value => value instanceof Date

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isBlob = value =>
  value &&
  typeof value.size === 'number' &&
  typeof value.type === 'string' &&
  typeof value.slice === 'function'

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isFile = value =>
  isBlob(value) &&
  typeof value.name === 'string' &&
  (typeof value.lastModifiedDate === 'object' ||
    typeof value.lastModified === 'number')

/**
 * @param {Object} object
 * @param {FormData} [formData]
 * @param {string} [prefix]
 * @param {Object} [options]
 * @returns {FormData}
 */
export const objectToFormData = (object, formData = undefined, prefix = '', options = {}) => {
  options = options || {}

  options.indices = isUndefined(options.indices) ? true : options.indices
  options.nullsAsUndefineds = isUndefined(options.nullsAsUndefineds)
    ? false
    : options.nullsAsUndefineds
  options.booleansAsIntegers = isUndefined(options.booleansAsIntegers)
    ? false
    : options.booleansAsIntegers

  formData = formData || new FormData()

  if (isUndefined(object)) {
    return formData
  }

  if (isNull(object)) {
    if (!options.nullsAsUndefineds) {
      formData.append(prefix, '')
    }
    return formData
  }

  if (isBoolean(object)) {
    let value = object
    if (options.booleansAsIntegers) {
      value = object ? 1 : 0
    }
    formData.append(prefix, value)
    return formData
  }

  if (isDate(object)) {
    formData.append(prefix, object.toISOString())
    return formData
  }

  if (isArray(object)) {
    if (!object.length) {
      return formData
    }
    object.forEach((value, index) => {
      const key = prefix + '[' + (options.indices ? index : '') + ']'
      objectToFormData(value, formData, key, options)
    })
    return formData
  }

  if (isObject(object) && !isFile(object) && !isBlob(object)) {
    Object.keys(object).forEach(prop => {
      const value = object[prop]
      if (isArray(value)) {
        while (prop.length > 2 && prop.endsWith('[]')) {
          prop = prop.substring(0, prop.length - 2)
        }
      }
      const key = prefix ? prefix + '[' + prop + ']' : prop
      objectToFormData(value, formData, key, options)
    })
    return formData
  }

  formData.append(prefix, object)
  return formData
}

/**
 * @param {number} length
 * @return {string}
 */
export const generatePassword = (length) => {
  // noinspection SpellCheckingInspection
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '123456789'
  const specials = '!@#_'

  const lengthSpecials = Math.ceil(Math.random() * (length * 0.10))
  const lengthNumbers = Math.ceil(Math.random() * (length * 0.30))
  const lengthUppers = Math.ceil(Math.random() * (length * 0.30))
  const lengthLowers = length - (lengthSpecials + lengthNumbers + lengthUppers)

  const chars = []

  for (let i = 0; i < lengthSpecials; i++) {
    chars.push(specials.charAt(Math.floor(Math.random() * specials.length)))
  }
  for (let i = 0; i < lengthNumbers; i++) {
    chars.push(numbers.charAt(Math.floor(Math.random() * numbers.length)))
  }
  for (let i = 0; i < lengthUppers; i++) {
    chars.push(letters.charAt(Math.floor(Math.random() * letters.length)).toUpperCase())
  }
  for (let i = 0; i < lengthLowers; i++) {
    chars.push(letters.charAt(Math.floor(Math.random() * letters.length)))
  }

  return chars.sort(() => 0.5 - Math.random()).join('')
}

/**
 * @param {number} length
 * @returns {string}
 */
export const secret = (length = 32) => {
  const result = []
  // noinspection SpellCheckingInspection
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

/**
 * @param {HTMLTextAreaElement} element
 * @param {string} [i18n]
 */
export const copyContent = (element, i18n = 'app.clipboard.copy') => {
  if (!element.value) {
    return
  }

  try {
    element.select()
    document.execCommand('copy')
    toast($lang(i18n))
  } catch (e) {
    // silent is gold
  }
}
