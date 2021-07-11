import { remoteKey, searchKey } from 'src/settings/schema'

import Base from './Base'

import Groups from './Schema/Groups'
import Fields from './Schema/Fields'
import FieldAs from './Schema/FieldAs'
import FieldTable from './Schema/FieldTable'
import FieldForm from './Schema/FieldForm'
import FieldIs from './Schema/FieldIs'
import FieldValidation from './Schema/FieldValidation'
import Actions from './Schema/Actions'
import Hooks from './Schema/Hooks'
import Watches from './Schema/Watches'
import Avoids from './Schema/Avoids'
import ComponentActions from './Schema/Component/ComponentActions'
import ConfigureComponent from './Schema/Component/ConfigureComponent'

import Service from '../Services/Rest'
import { OPERATORS } from './enum'
import { clone, objectToFormData, set, withSeparator } from '../Util/general'

import mixin from './Helper/mixin'
import { Component } from './Helper/interfaces'

/**
 * @class {Skeleton}
 */
abstract class Skeleton extends Base {
  /**
   * @type {Skeleton}
   */
  protected static __instance: Skeleton

  /**
   * @type {Service}
   */
  public service?: unknown

  /**
   * @type {boolean}
   */
  useFormData = false

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
   * @return {Service}
   */
  $service (): Service {
    if (!this.service) {
      throw new Error('The service is not defined')
    }
    // @ts-ignore
    return this.service.instance()
  }

  /**
   * @param {Object} record
   * @param {boolean} creating
   * @return {Record<string, unknown>}
   */
  prepareRecord (record: Record<string, unknown>, creating = false) {
    let data = clone(record)

    const schema = this.$self()
    if (creating && (!schema.useUuid && !schema.keepPrimaryKey)) {
      delete data[schema.primaryKey]
    }

    let useDotNotation = false
    let useFormData = this.useFormData

    const reducer = (accumulator: Record<string, unknown>, entry: [string, unknown]) => {
      const [field, value] = entry
      if (field.includes('.')) {
        useDotNotation = true
      }
      if (value instanceof File) {
        useFormData = true
      }
      if (!this.__avoids.includes(field)) {
        accumulator[field] = value
      }
      return accumulator
    }
    data = Object.entries(data).reduce(reducer, {})

    if (useDotNotation) {
      const applyDotNotation = (accumulator: Record<string, unknown>, entry: [string, unknown]) => {
        const [field, value] = entry
        accumulator = set(accumulator, field, value)
        return accumulator
      }
      data = Object.entries(data).reduce(applyDotNotation, {})
    }

    if (useFormData) {
      data = objectToFormData(data)
    }

    return data
  }

  /**
   * @param {Record<string, *>} options
   * @returns {Record<string, unknown>}
   */
  static provideRemote (options: Record<string, unknown> = {}): Record<string, unknown> {
    let { widget, path, query, operator } = options
    if (widget === undefined) {
      widget = false
    }
    if (path === undefined) {
      path = ''
    }
    if (operator === undefined) {
      operator = OPERATORS.LIKE
    }

    return {
      widget: widget,
      path: path,
      query: query,
      keyValue: this.primaryKey,
      keyLabel: this.displayKey,
      domain: this.domain,
      format: undefined,
      remote: (filter = '', pagination = undefined, query: Record<string, unknown> = {}) => {
        const where = { ...query }

        if (this.remoteKey) {
          where[remoteKey] = withSeparator(filter, this.remoteKey)
        } else if (filter) {
          where[this.displayKey] = operator ? withSeparator(filter, String(operator)) : filter
        }

        const parameters = { [searchKey]: where }

        if (pagination) {
          return this
            .$instance()
            .$service()
            .paginate({ ...parameters, pagination })
        }

        return this
          .$instance()
          .$service()
          .paginate(parameters)
          .then((response) => response.rows)
      }
    }
  }
}

/**
 * @interface {Skeleton}
 */
interface Skeleton extends Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  FieldAs,
  Actions,
  Hooks,
  Watches,
  Avoids,
  ComponentActions,
  ConfigureComponent {
}

mixin(Skeleton, [
  Groups,
  Fields,
  FieldTable,
  FieldForm,
  FieldIs,
  FieldValidation,
  FieldAs,
  Actions,
  Hooks,
  Watches,
  Avoids,
  ComponentActions,
  ConfigureComponent
])

export default Skeleton
