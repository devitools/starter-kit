// domains/Admin
import profile from 'source/domains/Admin/Profile/en-us'
import user from 'source/domains/Admin/User/en-us'

// domains/General
import category from 'source/domains/General/Category/en-us'

// domains/Home
import settingsAccount from 'source/domains/Settings/Account/en-us'

// domains/Report
import report from 'source/domains/Report/en-us'

/**
 */
export default {
  settings: {
    account: settingsAccount
  },
  admin: {
    profile, user
  },
  general: {
    category
  },
  report
}
