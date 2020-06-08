import { read } from '@devitools/Util/storage'

export default {
  name: process.env.VUE_APP_NAME,
  subTitle: process.env.VUE_APP_SUB_TITLE,
  drawer: read('appDrawer') || [],
  offline: !!read('appOffline'),
  options: [],
  clipboard: {},
  query: {},
  print: undefined,
  device: undefined,
  route: undefined
}
