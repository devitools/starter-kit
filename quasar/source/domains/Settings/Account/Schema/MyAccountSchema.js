import UserSchema from '../../../Admin/User/Schema/UserSchema'

/**
 * @class {MyAccountSchema}
 */
export default class MyAccountSchema extends UserSchema {
  /**
   * available: ['none', 'index']
   * @type {string}
   */
  afterUpdate = 'none'

  /**
   */
  construct () {
    super.construct()

    // fields

    this.getField('profile')
      .fieldFormHidden()
      .validationClear()

    this.getField('active')
      .fieldFormHidden()

    // actions

    this.removeActions(['home', 'print', 'destroy'])

    // hooks

    this.addHook('after:update.click', function () {
      this.$store.dispatch('auth/setNameUser', this.$getField('name').$getValue())
      this.$store.dispatch('auth/setUserEmail', this.$getField('email').$getValue())
      const fields = ['password', 'confirmPassword']
      fields.forEach((field) => this.$getField(field).$setValue(''))
    })
  }

  /**
   * Component created hook
   * @param schema
   * @override
   */
  createdHook (schema = undefined) {
    const user = this.$store.getters['auth/getUser']

    const fields = [this.primaryKey, 'name', 'username']
    fields.forEach((field) => this.$getField(field).$setValue(user[field]))
  }
}
