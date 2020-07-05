// domains/Admin
import profile from 'source/domains/Admin/Profile/pt-br'
import user from 'source/domains/Admin/User/pt-br'

// domains/General
import category from 'source/domains/General/Category/pt-br'
import marker from 'source/domains/General/Marker/pt-br'
import type from 'source/domains/General/Type/pt-br'

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
  general: {
    category, marker, type
  },
  report
}
