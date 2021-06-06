import axios from 'axios'

/**
 * @type {AxiosInstance}
 */
const http = axios.create({ baseURL: process.env.VUE_APP_REST_BASE_URL })

/**
 * It is just an axios instance to execute the perform http local queries
 */
export default http
