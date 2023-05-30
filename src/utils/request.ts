import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { ApiResult } from '../api'
import { API_BASE_URL } from '../config/setting'
// import { getToken } from './token-util'
const service = axios.create({
	baseURL: API_BASE_URL,
})

service.interceptors.request.use(
	(config) => {
		// const token = getToken()
		// if (token && config.headers) {
		//   config.headers.common[TOKEN_HEADER_NAME] = token
		// }
		return config
	},
	(error: AxiosError) => {
		console.log(error, 'error')
		return Promise.reject(error)
	}
)

service.interceptors.response.use((res: AxiosResponse<ApiResult<any>>) => {
	return res
})

export default service
