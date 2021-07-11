import { primaryKey } from 'src/settings/schema'
import { createAction, destroyAction, updateAction } from 'src/settings/executors'
import { SCOPES } from '../../enum'
import { reject } from '../../../Util/general'
import $emporium from '../../../emporium'

/**
 * @class {ComponentActions}
 */
export default class ComponentActions {
  /**
   */
  actionBack () {
    this.$browse(-1)
  }

  /**
   * @return {Promise|undefined}
   */
  actionPrint () {
    const name = this.$options.name
    if (name !== 'SchemaForm') {
      return
    }
    return $emporium.commit('updatePrinting', {
      user: this.$util.get(this.$store.getters['auth/getUser'], 'name'),
      domain: this.domain,
      components: this.components,
      record: this.record
    })
  }

  /**
   * @returns {Object}
   */
  actionHome () {
    if (this.$route.meta.scope === SCOPES.SCOPE_VIEW && this.$route.query.trash) {
      this.$browse(`${this.getActionPath()}/trash`, {
        keep: true,
        exclude: 'trash'
      })
      return
    }
    this.$browse(this.getActionPath(), true)
  }

  /**
   * @param {Schema} schema
   * @param {Object} record
   * @param {function(Object): Promise} executor
   * @param {function(string)} after
   * @returns {Object}
   */
  actionCreate ({
    schema,
    record,
    executor,
    after
  }) {
    if (!schema.service) {
      return reject({ error: 'destroy.invalid-service' })
    }

    const ok = this.formCheckIntegrity(schema, [
      `domains.${this.domain}.actions.create.validation`,
      'agnostic.actions.create.validation'
    ])
    if (!ok) {
      return
    }

    const afterCreateDefault = (path, id) => {
      $emporium.commit('updateModified', false)

      if (schema.afterCreate === 'view') {
        this.$browse(`${path}/${id}`, true)
        return
      }
      if (schema.afterCreate === 'edit') {
        this.$browse(`${path}/${id}/edit`, true)
        return
      }
      this.$browse(path, true)
    }
    if (!after) {
      after = afterCreateDefault
    }

    const action = (data, success, fail) => {
      const record = schema.prepareRecord(data, true)
      if (executor) {
        return executor(record)
          .then(success)
          .catch(fail)
      }
      return schema.$service()
        .create(record)
        .then(success)
        .catch(fail)
    }

    const success = createAction(after, action)
    this.withRecord({ record }, success.bind(this))
  }

  /**
   * @param {Schema} schema
   * @param {Object} record
   * @param {function(Object): Promise} executor
   * @param {function(string)} after
   * @param {string} alias
   * @returns {Object}
   */
  actionUpdate ({
    schema,
    record,
    executor,
    after,
    alias
  }) {
    if (!schema.service) {
      return reject({ error: 'destroy.invalid-service' })
    }

    const ok = this.formCheckIntegrity(schema, [
      `domains.${this.domain}.actions.update.validation`,
      'agnostic.actions.update.validation'
    ])
    if (!ok) {
      return
    }

    const afterUpdateDefault = (path) => {
      $emporium.commit('updateModified', false)

      if (schema.afterUpdate !== 'index') {
        return
      }
      this.$browse(path, true)
    }
    if (!after) {
      after = afterUpdateDefault
    }

    const action = (data, success, fail) => {
      const record = schema.prepareRecord(data, false)
      if (executor) {
        return executor(record)
          .then(success)
          .catch(fail)
      }
      return schema.$service()
        .update(record)
        .then(success)
        .catch(fail)
    }
    const success = updateAction(after, action, alias)
    this.withRecord({ record }, success.bind(this))
  }

  /**
   * @param {Schema} schema
   * @param {Object} record
   * @param {Array} records
   * @param {function(Object): Promise} executor
   * @param {function(Object): Promise} after
   * @param {boolean} erase
   * @returns {Promise<any>|undefined}
   */
  actionDestroy ({
    schema,
    record,
    records,
    executor,
    after,
    erase
  }) {
    if (!schema.service) {
      return reject({ error: 'destroy.invalid-service' })
    }

    const afterDestroyDefault = (path) => {
      if (this.fetchRecords) {
        this.fetchRecords()
        return
      }
      this.$browse(path, true)
    }
    if (!after) {
      after = afterDestroyDefault
    }

    const executorDestroyDefault = (data, success, fail, isArray) => {
      if (isArray) {
        return schema.$service()
          .remove(data, { erase })
          .then(success)
          .catch(fail)
      }
      return schema.$service()
        .destroy(data, { erase })
        .then(success)
        .catch(fail)
    }
    if (!executor) {
      executor = executorDestroyDefault
    }

    const success = destroyAction(after, executor, erase)
    this.withRecords({
      record,
      records
    }, success.bind(this))
  }

  /**
   * @param {Object} payload
   */
  actionView (payload) {
    const trash = this.$route.meta.scope === SCOPES.SCOPE_TRASH
    const view = (record) => {
      const target = { path: `${this.getActionPath()}/${record[this.primaryKey]}` }
      if (trash) {
        target.query = { trash }
      }
      this.$browse(target, true)
    }
    this.withRecord(payload, view)
  }

  /**
   * @param {Object} payload
   */
  actionEdit (payload) {
    const edit = (record) => this.$browse(`${this.getActionPath()}/${record[this.primaryKey]}/edit`, true)
    this.withRecord(payload, edit)
  }

  /**
   */
  actionSortClear () {
    if (!this.$route.query.sort) {
      return this.$alert(this.$lang('agnostic.actions.sortClear.noSort'))
    }
    this.$browse({ query: { sort: undefined } }, true)
  }

  /**
   */
  actionRefresh () {
    this.fetchRecords()
  }

  /**
   */
  actionExport () {
    this.fetchDownload()
  }

  /**
   */
  actionTrash () {
    this.$browse(`${this.getActionPath()}/trash`, false)
  }

  /**
   * @param {Object} payload
   * @returns {Promise<any>|undefined}
   */
  actionRestore (payload) {
    const { schema } = payload
    if (!schema.service) {
      return reject({ error: 'restore.invalid-service' })
    }

    const restore = (data, isArray) => {
      // perform after restore or remove
      const success = (response) => {
        this.actionSchemaSuccess(response, 'agnostic.actions.restore.success')
        if (this.fetchRecords) {
          this.fetchRecords()
        }
      }
      // if restore or remove fail
      const fail = (error) => this.actionSchemaFail(error, 'agnostic.actions.restore.fail')
      // if user confirm
      const confirm = () => {
        this.actionSchemaAttempt()
        if (isArray) {
          const callback = (record) => record[primaryKey]
          const list = data.map(callback).join(',')
          data = `[${list}]`
        }
        return schema.$service()
          .restore(data)
          .then(success)
          .catch(fail)
      }
      // if user don't confirm the action
      const ignore = () => '// silent is gold'

      return this.$confirm(this.$lang('agnostic.actions.restore.confirm'))
        .then(confirm)
        .catch(ignore)
    }
    this.withRecords(payload, restore)
  }

  /**
   */
  actionAdd () {
    this.$browse(`${this.getActionPath()}/add`, true)
  }

  /**
   */
  actionValidationClear () {
    this.errors = {}
    this.$v.$reset()
  }

  /**
   * @component {SchemaTableWhere}
   */
  actionSearch () {
    this.searchApply()
  }

  /**
   * @component {SchemaTableWhere}
   */
  actionSearchCancel () {
    this.searchCancel()
  }
}
