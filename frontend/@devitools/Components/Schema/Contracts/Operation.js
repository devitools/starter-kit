import { actionSuccessMessage } from 'src/settings/schema'
import { parseRestError } from 'src/settings/rest'

/**
 * @mixin Operation
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Object} context
     * @param {function} success
     * @param {function} noItems
     * @param {function} tooManySelected
     */
    withRecord (context, success, noItems = undefined, tooManySelected = undefined) {
      let { record, records } = context
      if (!record && !(Array.isArray(records) && records.length)) {
        noItems ? noItems() : this.$alert(this.$lang('agnostic.actions.view.noItems'))
        return
      }
      if (Array.isArray(records) && records.length) {
        if (records.length > 1) {
          tooManySelected ? tooManySelected() : this.$alert(this.$lang('agnostic.actions.view.tooManySelected'))
          return
        }
        record = records[0]
      }
      success(record)
    },
    /**
     * @param {Object} payload
     * @param {function} success
     * @param {function} noItems
     */
    withRecords (payload, success, noItems = undefined) {
      const { record, records } = payload
      if (!record && !(Array.isArray(records) && records.length)) {
        noItems ? noItems() : this.$alert(this.$lang('agnostic.actions.view.noItems'))
        return
      }
      if (record) {
        success(record)
        return
      }
      success(records, true)
    },
    /**
     */
    actionSchemaAttempt () {
      this.$q.loading.show()
    },
    /**
     * @param {Object} response
     * @param {string|Array} success
     * @returns {string}
     */
    actionSchemaSuccess (response, success) {
      this.$q.loading.hide()
      let message = actionSuccessMessage(response)
      if (!message) {
        message = this.$lang(success)
      }
      this.$message.success(message)
      let id = response[this.primaryKey]
      if (!id) {
        id = this.$util.get(response, 'data.ticket')
      }
      return id
    },
    /**
     * @param {Object} error
     * @param {string|Array} fail
     * @param {string|Array} validation
     */
    actionSchemaFail (error, fail, validation = undefined) {
      this.$q.loading.hide()
      if (!error.response) {
        return Promise.reject(error)
      }
      parseRestError.call(this, error, fail, validation)
    },
    /**
     * @param {Object} payload
     * @param {function} action
     * @param {string|Array} success
     * @param {string|Array} question
     * @param {boolean} prompt
     */
    actionSchemaPerform (payload, action, success, question, prompt = false) {
      this.withRecord(payload, (record) => {
        const then = () => {
          this.$message.success(this.$lang(success))
          if (this.fetchRecords) {
            this.fetchRecords()
          }
        }

        const accept = (text) => {
          if (!text) {
            this.$message.warning('Preencha os campos corretamente e tente novamente')
            return
          }
          this.loadingShow(false)
          action(record, text)
            .then(then)
            .finally(() => this.loadingHide())
        }

        const ignore = () => '// silent is gold'

        if (prompt) {
          this.$prompt(this.$lang(question))
            .then(accept)
            .catch(ignore)
          return
        }
        this.$confirm(this.$lang(question))
          .then(accept)
          .catch(ignore)
      })
    },
    /**
     * @param {Context} payload
     * @param {function(Record<string, unknown>)} action
     * @param {string} alias
     */
    actionSchemaConfirm (payload, action, alias) {
      const { context } = payload
      this.withRecord(context, async (record) => {
        try {
          const confirm = await this.$confirm(this.$lang(`actions.${alias}.confirm`))
          if (!confirm) {
            return
          }
        } catch (e) {
          return
        }

        let response
        try {
          this.loadingShow(false)
          response = await action(record)
        } catch (e) {
          this.$message.error(this.$lang(`actions.${alias}.error`))
          return
        } finally {
          this.loadingHide()
        }

        this.$message.success(this.$lang(`actions.${alias}.success`))
        if (this.fetchRecords) {
          this.fetchRecords()
        }
        return response
      })
    }
  }
}
