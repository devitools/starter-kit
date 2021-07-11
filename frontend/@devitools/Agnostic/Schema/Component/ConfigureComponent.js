import { reject } from '../../../Util/general'
import { SCOPES } from '../../enum'
import initialize from './initialize'

/**
 * @class {ConfigureComponent}
 */
export default class ConfigureComponent {
  /**
   * Component created hook
   * @param {Schema} schema
   */
  createdHook (schema) {
    // will override by schemas
  }

  /**
   * Method that perform all configure events
   * It call the methods of all default scopes
   */
  configureComponentInitialization () {
    const schema = this

    this.addHook('created:default', function () {
      // call component initialize method
      if (this.initialize && typeof this.initialize === 'function') {
        this.initialize()
      }

      // call configure of each field
      this.configure()

      if (initialize[this.scope]) {
        initialize[this.scope].call(this, schema)
      }

      // call global prototype configure
      /**
       * @fires.createdHook
       */
      schema.createdHook.call(this, schema)
    })
  }

  /**
   * Install hook to handle the data event fetchRecords
   * The hook 'request:records' is triggered when component needs a list of entity
   */
  configureRequestRecords () {
    const schema = this

    this.addHook('request:records', function ({ parameters, filters }) {
      if (!schema.service) {
        return reject({})
      }
      const trash = this.$route.meta.scope === SCOPES.SCOPE_TRASH
      return schema.$service().paginate(parameters, filters, trash)
    })
  }

  /**
   * Install hook to handle the data event fetchDownload
   * The hook 'request:download' is triggered when component needs download the table data
   */
  configureRequestDownload () {
    const schema = this

    this.addHook('request:download', function ({ parameters, filters }) {
      if (!schema.service) {
        return reject({})
      }
      return schema.$service().download(parameters, filters)
    })
  }

  /**
   * Install hook to handle the data event fetchRecord
   * The hook 'request:record' is triggered when component need a record of entity
   */
  configureRequestRecord () {
    const schema = this

    this.addHook('request:record', function ({ id }) {
      if (!schema.service) {
        return reject({})
      }
      if (id) {
        const trash = this.$route.query.trash
        return schema.$service().read(id, trash)
      }
      return new Promise(function (resolve, reject) {
        reject()
      })
    })
  }
}
