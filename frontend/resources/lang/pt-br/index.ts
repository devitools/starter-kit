import { agnostic, app, auth, geo, validation, worker } from '@devitools/Lang/pt-br'

import domains from './domains'
import menu from './menu'
import pages from './pages'
import permissions from './permissions'

const name = process.env.VUE_APP_NAME

const ptBR = {
  agnostic,
  auth,
  app,
  domains,
  geo,
  menu,
  name,
  pages,
  permissions,
  validation,
  worker
}

/**
 * put all messages together
 */
export default ptBR
