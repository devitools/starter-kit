import { displayKey, primaryKey } from 'src/settings/schema'
import components from 'src/settings/components'

import { Action, Component, Field, Fill, Group, SchemaForm, SchemaTable, Watch } from './Helper/interfaces'
import { scopes } from './enum'
import { clone } from '../Util/general'
import $lang from '../Lang'
import $performance from '../Plugins/$performance'

/**
 * @class {Base}
 */
export default abstract class Base {
  /**
   * @type {string}
   */
  static primaryKey = primaryKey

  /**
   * @type {string}
   */
  static displayKey = displayKey

  /**
   * @type {string}
   */
  static remoteKey = ''

  /**
   * @type {string}
   */
  static domain = ''

  /**
   * @type {string}
   */
  static groupType = 'sections'

  /**
   * @type {boolean}
   */
  static useUuid = false

  /**
   * @type {boolean}
   */
  static keepPrimaryKey = true

  /**
   * @type {Record<string, Group>}
   */
  protected __groups: Record<string, Group>

  /**
   * @type {Record<string, Field>}
   */
  protected __fields: Record<string, Field>

  /**
   * @type {Record<string, Action>}
   */
  protected __actions: Record<string, Action>

  /**
   * @type {Record<string, Function>}
   */
  protected __hooks: Record<string, Function>

  /**
   * @type {Record<string, Watch[]>}
   */
  protected __watches: Record<string, Watch[]>

  /**
   * @type {string[]}
   */
  protected __avoids: string[]

  /**
   * @type {string}
   */
  protected __currentField = ''

  /**
   * @type {string}
   */
  protected __currentAction = ''

  /**
   * @type {string[]}
   */
  protected scopes: string[]

  /**
   * @type {Boolean}
   */
  protected safe = true

  /**
   * @type {Base}
   */
  protected static __instance: Base

  /**
   * @param {Component} $component
   * @param {Record<string, unknown>} dependencies
   * @return {this}
   */
  static build ($component?: Component, dependencies?: Record<string, unknown>) {
    // @ts-ignore
    return new this($component, dependencies)
  }

  /**
   * @param {Component} $component
   * @param {Record<string, unknown>} dependencies
   * @return {this}
   */
  static $instance ($component?: Component, dependencies?: Record<string, unknown>) {
    if (!this.__instance) {
      this.__instance = this.build($component, dependencies)
    }
    return this.__instance
  }

  /**
   * @return {string[]}
   */
  initScopes (): string[] {
    return scopes()
  }

  /**
   * @param {unknown} element
   * @param {Function} [action]
   */
  $clone (element: unknown, action?: Function) {
    return clone(element, action)
  }

  /**
   * @param {string | string[]} key
   * @param {string | string[] | unknown} [fallback]
   * @returns {string | string[] | Record<string, unknown>}
   */
  $lang (key: string | string[], fallback: string | string[] | unknown = ''): string | string[] | Record<string, unknown> |
    Record<string, unknown>[] {
    if (typeof key === 'string') {
      key = [key, `domains.${this.$self().domain}.${key}`]
    }
    return $lang(key, fallback)
  }

  /**
   */
  $self () {
    return <typeof Base>this.constructor
  }

  /**
   * @param {Component} $component
   * @param {Record<string, unknown>} dependencies
   * Call schema builder method
   */
  abstract construct ($component?: Component, dependencies?: Record<string, unknown>): void

  /**
   * Bootstrap everything
   * @param {SchemaForm | SchemaTable} $component
   */
  bootstrap ($component?: SchemaForm | SchemaTable) {
  }

  /**
   * Bootstrap everything
   */
  timestamps () {
  }

  /**
   * @param {Component} $component
   * @param {Record<string, unknown>} dependencies
   * Base constructor
   */
  constructor ($component?: Component, dependencies?: Record<string, unknown>) {
    const reference = `Base.construct(${this.$self().domain})`
    $performance.start(reference)
    this.scopes = this.initScopes()
    this.__groups = {}
    this.__fields = {}
    this.__actions = {}
    this.__hooks = {}
    this.__watches = {}

    this.__avoids = []

    this.bootstrap()
    this.timestamps()
    this.construct($component, dependencies)
    $performance.end(reference)
  }

  /**
   * @param {string} path
   * @param {Record<string, unknown>} scopes
   * @return {this}
   */
  registerCreated (path: string, scopes: Record<string, unknown>): this {
    const name = this.__currentField
    if (!this.__fields[name].$created) {
      this.__fields[name].$created = []
    }
    const created = this.__fields[name].$created || []
    Object.entries(scopes).forEach((entry) => {
      const [scope, value] = entry
      created.push({
        path,
        scope,
        value
      })
    })
    return this
  }

  /**
   * @param {Fill| Function} fill
   * @returns {this}
   */
  setFill (fill: Fill | Function): this {
    this.__fields[this.__currentField].$fill = fill
    return this
  }

  /**
   * @param {Record<string, unknown>} layout
   * @returns {this}
   */
  setLayout (layout: Record<string, unknown>): this {
    Object.assign(this.__fields[this.__currentField].$layout, layout)
    return this
  }

  /**
   * @deprecated
   * @param {Record<string, unknown>} attrs
   * @returns {this}
   */
  setAttrs (attrs: Record<string, unknown>): this {
    Object.assign(this.__fields[this.__currentField].attrs, attrs || {})
    return this
  }

  /**
   * @param {Record<string, unknown>} attrs
   * @returns {this}
   */
  appendAttrs (attrs: Record<string, unknown>): this {
    Object.assign(this.__fields[this.__currentField].attrs, attrs)
    return this
  }

  /**
   * @param {string} type
   * @returns {this}
   */
  setType (type: string): this {
    this.__fields[this.__currentField].$type = type
    return this
  }

  /**
   * @param {unknown} is
   * @returns {this}
   */
  setIs (is: unknown) {
    this.__fields[this.__currentField].is = is
    return this
  }

  /**
   * @param {Function} parseOutput
   * @returns {this}
   */
  setParseOutput (parseOutput: Function) {
    this.__fields[this.__currentField].$parseOutput = parseOutput
    return this
  }

  /**
   * @param {Function} parseInput
   * @returns {this}
   */
  setParseInput (parseInput: Function) {
    this.__fields[this.__currentField].$parseInput = parseInput
    return this
  }

  /**
   * @deprecated
   * @param {Function[]} listeners
   * @returns {this}
   */
  setListeners (listeners: Function[]) {
    const name = this.__currentField
    const field = this.__fields[name]
    Object.assign(field.on, listeners)
    return this
  }

  /**
   * @param {Function[]} listeners
   * @returns {this}
   */
  appendListeners (listeners: Function[]) {
    const name = this.__currentField
    const field = this.__fields[name]
    Object.assign(field.on, listeners)
    return this
  }

  /**
   * @param {string} event
   * @param {function} callable
   * @param {Boolean} reset
   * @returns {this}
   */
  setOn (event: string, callable: Function, reset = false) {
    const name = this.__currentField
    if (!this.__fields[name].on[event] || reset) {
      this.__fields[name].on[event] = []
    }
    this.__fields[name].on[event].push(callable)
    return this
  }

  /**
   * @param {string} component
   * @param {Record<string, unknown>} attrs
   * @param type
   * @returns {this}
   */
  setComponent (component: string, attrs: Record<string, unknown> = {}, type = 'string'): this {
    const name = this.__currentField
    const field = this.__fields[name]

    // @ts-ignore
    const properties = components[component]
    if (!properties) {
      field.is = component
      Object.assign(field.attrs, attrs)
      return this
    }

    field.is = properties.is

    const inherit = typeof properties.attrs === 'function' ? properties.attrs() : properties.attrs

    this.__fields[name].$type = type
    this.__fields[name].$parseInput = properties.parseInput
    this.__fields[name].$parseOutput = properties.parseOutput
    Object.assign(this.__fields[name].attrs, inherit, attrs)
    Object.assign(this.__fields[name].on, properties.listeners)
    return this
  }
}
