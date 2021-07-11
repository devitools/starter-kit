/**
 * @param {function} after
 * @param {function} action
 * @param {string} alias
 * @return {function(*=, *=): Promise}
 */
export function handlerAction (after, action, alias) {
  return function (data) {
    const success = (response) => {
      const path = this.getActionPath()
      const id = this.actionSchemaSuccess(response, [
        `domains.${this.domain}.actions.${alias}.success`,
        `agnostic.actions.${alias}.success`
      ])
      after(path, id, response)
    }

    const fail = (error) => {
      this.actionSchemaFail(
        error,
        [
          `domains.${this.domain}.actions.${alias}.fail`,
          `agnostic.actions.${alias}.fail`
        ],
        [
          `domains.${this.domain}.actions.${alias}.validation`,
          `agnostic.actions.${alias}.validation`
        ]
      )
    }

    // execute the action
    this.actionSchemaAttempt()
    return action(data, success, fail)
  }
}

/**
 * @param {function} after
 * @param {function} action
 * @param {string} alias
 * @return {function(*=, *=): Promise}
 */
export function createAction (after, action, alias = 'create') {
  return handlerAction(after, action, alias)
}

/**
 * @param {function} after
 * @param {function} action
 * @param {string} alias
 * @return {function(*=, *=): Promise}
 */
export function updateAction (after, action, alias = 'update') {
  return handlerAction(after, action, alias)
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
      const a = [
        `domains.${this.domain}.actions.destroy.success`,
        'agnostic.actions.destroy.success'
      ]
      const b = [
        `domains.${this.domain}.actions.erase.success`,
        'agnostic.actions.erase.success'
      ]
      const paths = !erase ? a : b
      this.actionSchemaSuccess(response, paths)
      const path = this.getActionPath()
      return after(path)
    }

    // if destroy or remove fail
    const fail = (error) => {
      const a = [
        `domains.${this.domain}.actions.destroy.fail`,
        'agnostic.actions.destroy.fail'
      ]
      const b = [
        `domains.${this.domain}.actions.erase.fail`,
        'agnostic.actions.erase.fail'
      ]
      const paths = !erase ? a : b
      this.actionSchemaFail(error, paths)
    }

    // if user confirm
    const confirm = () => {
      this.actionSchemaAttempt()
      action(data, success, fail, isArray)
    }

    // if user don't confirm the action
    const ignore = () => '// silent is gold'

    const a = [
      `domains.${this.domain}.actions.destroy.confirm`,
      'agnostic.actions.destroy.confirm'
    ]
    const b = [
      `domains.${this.domain}.actions.erase.confirm`,
      'agnostic.actions.erase.confirm'
    ]
    const paths = !erase ? a : b
    return this.$confirm(this.$lang(paths))
      .then(confirm)
      .catch(ignore)
  }
}
