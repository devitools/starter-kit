// domains/Admin
import profile from 'source/domains/Admin/Profile/pt-br'
import user from 'source/domains/Admin/User/pt-br'

// domains/Settings
import settingsAccount from 'source/domains/Settings/Account/pt-br'

// domains/Report
import report from 'source/domains/Report/pt-br'

/**
 */
export default {
  settings: {
    account: settingsAccount
  },
  admin: {
    profile, user
  },
  report
}
