/**
 * @param {function} after
 * @param {function} action
 * @return {function(*=, *=): Promise}
 */
export function createAction (after, action) {
  return function (data) {
    const success = (response) => {
      const path = this.getActionPath()
      const id = this.actionSchemaSuccess(response, [
        `domains.${this.domain}.actions.create.success`,
        'agnostic.actions.create.success'
      ])
      after(path, id)
    }

    const fail = (error) => {
      this.actionSchemaFail(error, [
        `domains.${this.domain}.actions.create.fail`,
        'agnostic.actions.create.fail'
      ])
      if (!error.response) {
        return
      }
      const response = error.response
      if (response.status !== 400) {
        return
      }
      const errors = this.$util.get(response, 'data.meta.errors')
      if (!Array.isArray(errors)) {
        return
      }
      this.errors = errors.reduce((accumulator, error) => {
        if (!this.components[error['property_path']]) {
          this.triggerHook('validate:error', { error })
          return accumulator
        }
        accumulator[error['property_path']] = error['message']
        return accumulator
      }, {})
    }

    // execute the action
    this.actionSchemaAttempt()
    return action(data, success, fail)
  }
}

/**
 * @param {function} after
 * @param {function} action
 * @return {function(*=, *=): Promise}
 */
export function updateAction (after, action) {
  return function (data) {
    // perform after destroy or remove
    const success = (response) => {
      this.actionSchemaSuccess(response, [
        `domains.${this.domain}.actions.update.success`,
        'agnostic.actions.update.success'
      ])
      const path = this.getActionPath()
      return after(path)
    }

    // if destroy or remove fail
    const fail = (error) => {
      return this.actionSchemaFail(error, [
        `domains.${this.domain}.actions.update.fail`,
        'agnostic.actions.update.fail'
      ])
    }

    // execute the action
    this.actionSchemaAttempt()
    return action(data, success, fail)
  }
}

/**
 * @param {function} after
 * @param {function} action
 * @param {boolean} erase
 * @return {function(*=, *=): Promise}
 */
export function destroyAction (after, action, erase = false) {
  return function (data, isArray) {
    // perform after destroy or remove
    const success = (response) => {
      const paths = !erase
        ? [
          `domains.${this.domain}.actions.destroy.success`,
          'agnostic.actions.destroy.success'
        ]
        : [
          `domains.${this.domain}.actions.erase.success`,
          'agnostic.actions.erase.success'
        ]
      this.actionSchemaSuccess(response, paths)
      const path = this.getActionPath()
      return after(path)
    }

    // if destroy or remove fail
    const fail = (error) => {
      const paths = !erase
        ? [
          `domains.${this.domain}.actions.destroy.fail`,
          'agnostic.actions.destroy.fail'
        ]
        : [
          `domains.${this.domain}.actions.erase.fail`,
          'agnostic.actions.erase.fail'
        ]
      this.actionSchemaFail(error, paths)
    }

    // if user confirm
    const confirm = () => {
      this.actionSchemaAttempt()
      action(data, success, fail, isArray)
    }

    // if user don't confirm the action
    const ignore = () => '// silent is gold'

    const paths = !erase
      ? [
        `domains.${this.domain}.actions.destroy.confirm`,
        'agnostic.actions.destroy.confirm'
      ]
      : [
        `domains.${this.domain}.actions.erase.confirm`,
        'agnostic.actions.erase.confirm'
      ]
    return this.$confirm(this.$lang(paths))
      .then(confirm)
      .catch(ignore)
  }
}
