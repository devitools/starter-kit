import { Store } from 'vuex'
import { QVueGlobals } from 'quasar'
import Schema from '../Schema'

/**
 * @interface {Provide}
 */
export interface Provide {
  groupType: string
  domain: string
  primaryKey: string
  displayKey: string
  hooks: Function
  groups: Function
  fields: Function
  actions: Function
  watches: Function
  avoids: Function
  settings?: Record<string, unknown>
}

/**
 * @interface {ProvideReport}
 */
export interface ProvideReport {
  report: string
  groupType: string
  domain: string
  hooks: Function
  groups: Function
  fields: Function
  actions: Function
  watches: Function
  settings?: Record<string, unknown>
}

/**
 * @interface {Pagination}
 */
export interface Pagination {
  rows: Record<string, unknown>[]
  rowsNumber: number
  pagesNumber: number
  rowsPerPage: number
  page: number
  sortBy?: string
  descending?: boolean
}

/**
 * @interface {Group}
 */
export interface Group {
  label?: string
  icon?: string
}

/**
 * @interface {Field}
 */
export interface Field {
  $key: string
  $primaryKey?: boolean
  is: unknown
  attrs: Record<string, unknown>
  on: Record<string, Function[]>
  $type: string
  $validations: Record<string, unknown>
  $parseInput?: Function
  $parseOutput?: Function
  $layout: {
    formLabel: string
    formWidth: number
    formHeight: number
    formHidden: boolean
    formOrder: number
    formError: boolean
    tableLabel: string
    tableWidth: string
    tableHidden: boolean
    tableRequired: boolean
    tableAlign: string
    tableSortable: boolean
    tableOrder: number
    tableFormat?: Function
    tableWhere?: string
    tableWhereComponent?: unknown
  }
  scopes: string[]
  $visible?: Function
  $created?: Configure[]
  $fill?: Fill | Function
  group?: string
  $configure?: Function
  chars?: string

  label?: string
  listeners?: Record<string, Function | Function[]>
}

/**
 * @typedef {Configure}
 */
export type Configure = {
  path: string
  scope: string
  value: unknown
}

/**
 * @typedef {Fill}
 */
export type Fill = {
  method: string
  parameters: Record<string, unknown>
}

/**
 * @interface {Action}
 */
export interface Action {
  $key: string
  hidden: boolean
  dropdown: boolean
  on: Record<string, Function>
  scopes: string[]
  positions: string[]
  class: string[]
  order: number
  attrs: Record<string, unknown>
  validate?: Function
  levels?: string[]
  namespace?: string
  configure?: Function
  actions?: Action[]
}

/**
 * @interface {Watch}
 */
export interface Watch {
  handler: Function
  options: Record<string, unknown>
}

/**
 * @typedef {Timestamp}
 */
export type Timestamp = {
  name: string
  type: string
}

/**
 * @typedef {Payload}
 */
export type Payload = {
  $event: unknown
  field: Field
  parameters: Record<string, unknown>
}

/**
 * @typedef {EventContext}
 */
export type EventContext = {
  $event: unknown
  context: Context
  schema: Schema
}

/**
 * @typedef {ConfigureContext}
 */
export type ConfigureContext = {
  scope: string
  position: string
  context: Context
}

/**
 * @typedef {Context}
 */
export type Context = {
  record: Record<string, unknown>
  records: Record<string, unknown>[]
}

/**
 * @typedef {Option}
 */
export type Option = { value: unknown, label: string }

/**
 * @typedef {Keys}
 */
export type Keys = string | number

/**
 * @typedef {Styles}
 */
export type Styles = string | Record<string, string>

/**
 * @typedef {ClassNames}
 */
export type ClassNames = string | string[]

/**
 * @interface {Message}
 */
export interface Message {
  notify (options: Record<string, unknown>, action?: Record<string, unknown>): void
  toast (message: string | Record<string, unknown>, options?: Record<string, unknown>): void
  success (message: string | Record<string, unknown>, options?: Record<string, unknown>): void
  error (message: string | Record<string, unknown>, options?: Record<string, unknown>): void
  warning (message: string | Record<string, unknown>, options?: Record<string, unknown>): void
}

/**
 * @interface {Util}
 */
export interface Util {
  clone (element: Record<string, unknown>, action?: Record<string, unknown>): unknown
  get (element: string | Record<string, unknown> | unknown, path: string, fallback?: Record<string, unknown>): unknown
  set (element: string | Record<string, unknown>, path?: Record<string, unknown>, value?: Record<string, unknown>): Record<string, unknown>
  uuid (): string
  run (value: Function | unknown): Function
}

/**
 * @interface {Clipboard}
 */
export interface Clipboard {
  register (index: string, value: unknown): void
  recover(index: string): undefined | unknown
  clear(): void
}

/**
 * @typedef {RouteRecord}
 */
export type RouteRecord = {
  name: string
  path: string
  meta: Record<string, unknown>
  query: Record<string, unknown>
  params: Record<string, unknown>
}

/**
 * @interface {Component}
 */
export interface Component extends Vue {
  $q: QVueGlobals

  scope: string
  domain: string
  primaryKey: string
  payload: Record<string, unknown>
  settings: Record<string, unknown>
  value: Record<string, unknown>

  getActionPath(): string
  getRecord(): Record<string, unknown>
  loadingShow (wait?: boolean): void
  loadingHide (): void
  withRecord (context: Context, success: Function, noItems?: Function, tooManySelected?: Function): void
  actionSchemaConfirm (payload: Record<string, unknown>, action: Function, alias: string): void
  getComponent (field: string): Promise<unknown>

  $static(path: string, external?: boolean): string
  $browse(target: undefined | number | string | Record<string, unknown>, options?: Record<string, unknown> | boolean): void

  $setIs (is: string): Component
  $setLayout (property: string, value: number | string): Component
  $getLayout (property: string): Component

  $getField (name: string): Component
  $fieldFormHidden (formHidden?: boolean): Component
  $fieldFormWidth (formWidth: number): Component
  $fieldFormHeight (formHeight: number): Component
  $fieldAttr (property: string, value: unknown): Component
  $fieldFormDisabled (disable: boolean): Component
  $fieldFormOrder (formOrder: number, updateOthers?: boolean): Component
  $fieldTableHidden (tableHidden?: boolean): Component
  $fieldTableWhere (tableWhere?: string | null): Component

  $getAction (key: string): Component
  $actionOrder (order: number): Component
  $actionLabel (label: string): Component
  $actionIcon (icon?: string): Component
  $actionTooltip (tooltip?: string): Component
  $actionColor (color: string): Component
  $actionTextColor (textColor: string): Component
  $actionDisabled (disabled?: boolean): Component
  $actionFloatRight (): Component
  $actionFloatLeft (): Component
  $actionNoMinWidth (): Component
  $actionAddClassName (className: string): Component
  $actionHidden (hidden?: boolean): Component
  $actionDropdown (actions: Action[]): Component
  $actionValidate (validate: () => boolean): Component
  $actionConfigure (configure: () => boolean): Component
  $actionOn (event: string, handler: () => boolean): Component

  $setError (validation?: string, parameters?: Record<string, unknown>): Component
  $getValue (): unknown
  $setValue (value: unknown): Component
  $confirm (message: string | Record<string, unknown>, options?: Record<string, unknown>): Promise<Record<string, unknown>>
  $alert (message: string | Record<string, unknown>, options?: Record<string, unknown>): void
  $lang (path: string, fallback?: string | string[]): string | Record<string, unknown>
  $can (namespace: string): boolean
  $user (property: string): string | number | boolean | Record<string, unknown> | undefined
  $setFocus (name: string): void

  $message: Message
  $clipboard: Clipboard
  $store: Store<unknown>
  $util: Util
  $payload: Record<string, unknown>

  createdHook(schema: unknown): void
}

/**
 * @typedef {SchemaForm}
 */
export interface SchemaForm extends Component {
  showPlaceholderContent: boolean
  useFormReadonly: boolean
  fetchRecord(id: string | number): Promise<Record<string, unknown>>
}

/**
 * @typedef {SchemaTable}
 */
export interface SchemaTable extends Component {
  fetchRecords (): Promise<Record<string, unknown>>
}

/**
 * @typedef {UserEvent}
 */
export type UserEvent<T extends HTMLElement> = Event & {
  target: T
  // probably you might want to add the currentTarget as well
  currentTarget: T
}
