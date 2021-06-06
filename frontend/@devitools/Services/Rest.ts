import Basic from './Rest/Basic'

import mixin from '../Agnostic/Helper/mixin'

import Create from './Rest/Create'
import Read from './Rest/Read'
import Update from './Rest/Update'
import Destroy from './Rest/Destroy'
import Search from './Rest/Search'
import File from './Rest/File'

/**
 * @class {Rest}
 */
abstract class Rest extends Basic {
}

/**
 * @interface {Rest}
 */
interface Rest extends Create, Read, Update, Destroy, Search, File {}

mixin(Rest, [Create, Read, Update, Destroy, Search, File])

export default Rest
