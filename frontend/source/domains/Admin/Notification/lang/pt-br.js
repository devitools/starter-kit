import { routes } from 'resources/lang/pt-br/helper'

const parent = 'Administração'
const singular = 'Notificação'
const plural = 'Notificações'

export const print = {
  title: `Imprimir ${singular}`
}

export const fields = {
  user: {
    label: 'User'
  },
  subject: {
    label: 'Subject'
  },
  message: {
    label: 'Message'
  },
  readAt: {
    label: 'Read At'
  },
  read: {
    label: 'Read'
  }
}

/**
 */
export default {
  routes: routes(parent, plural, singular),
  print,
  fields
}
