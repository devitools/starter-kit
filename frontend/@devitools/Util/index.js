import { clone, get, set, uuid, run } from './general'

/**
 * @return {Record<string, Function>}
 */
export default () => {
  return {
    clone, get, set, uuid, run
  }
}
