import Http from '@devitools/Services/Http'

/**
 * @type {AuthService}
 */
export default class AuthService extends Http {
  /**
   * @type {string}
   */
  path = '/api'

  /**
   * @param {{readonly VUE_APP_COUNTRY_CODE?: string; readonly VUE_APP_STATIC_URL?: string; readonly VUE_APP_SENTRY_DSN?: string; readonly VUE_APP_IPINFO_TOKEN?: string; readonly VUE_APP_DEV?: string; readonly VUE_APP_REST_BASE_URL?: string; readonly VUE_APP_REPORT_BASE_URL?: string; readonly VUE_APP_DEFAULT_NAME?: string; readonly VUE_APP_DEV_USERNAME?: string; readonly VUE_APP_DEV_PASSWORD?: string; readonly NUMBER_OF_PROCESSORS?: string; readonly CommonProgramFiles?: string; readonly SESSIONNAME?: string; readonly ChocolateyInstall?: string; readonly HOMEPATH?: string; readonly OneDriveConsumer?: string; readonly SystemDrive?: string; readonly LOGONSERVER?: string; readonly TEMP?: string; readonly TMP?: string; readonly __COMPAT_LAYER?: string; readonly PATHEXT?: string; readonly IDEA_INITIAL_DIRECTORY?: string; readonly POWERSHELL_DISTRIBUTION_CHANNEL?: string; readonly HOMEDRIVE?: string; readonly USERNAME?: string; readonly ProgramFiles?: string; readonly USERDOMAIN_ROAMINGPROFILE?: string; readonly LOCALAPPDATA?: string; readonly PROCESSOR_REVISION?: string; readonly ProgramData?: string; readonly PROCESSOR_IDENTIFIER?: string; readonly DriverData?: string; readonly APPDATA?: string; readonly ChocolateyToolsLocation?: string; readonly ALLUSERSPROFILE?: string; readonly USERDOMAIN?: string; readonly '=::'?: string; readonly NVM_SYMLINK?: string; readonly PROCESSOR_LEVEL?: string; readonly ChocolateyLastPathUpdate?: string; readonly ComSpec?: string; readonly PROCESSOR_ARCHITECTURE?: string; readonly NVM_HOME?: string; readonly SystemRoot?: string; readonly CMDER_ROOT?: string; readonly OneDrive?: string; readonly PSModulePath?: string; readonly Path?: string; readonly 'ProgramFiles(x86)'?: string; readonly USERPROFILE?: string; readonly windir?: string; readonly ProgramW6432?: string; readonly OS?: string; readonly 'CommonProgramFiles(x86)'?: string; readonly PUBLIC?: string; readonly COMPUTERNAME?: string; readonly CommonProgramW6432?: string; [p: string]: string}} username
   * @param {string} password
   * @returns {Promise}
   */
  login (username, password) {
    return this.post('/v1/auth/sign-in', { username, password })
  }

  /**
   * @param {Object} form
   * @returns {Promise}
   */
  register (form) {
    return this.post('/v1/auth/register', form)
  }

  /**
   * @returns {Promise}
   */
  refresh () {
    return this.get('/v1/auth/refresh')
  }
}
