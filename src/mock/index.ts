import { MockMethod } from 'vite-plugin-mock'
import login from './login'
import notice from './notice'
import user from './user'
export default [...login, ...notice, ...user] as MockMethod[]
