import request from '@/utils/request'
import type { Login, UserLogin } from './type'
import { ApiResult } from '..'

function ReturnIf(data: any): Promise<any> {
	if (data) {
		return data
	}
	return Promise.reject(new Error())
}

/*
   登录
*/

export async function userLogin(params: UserLogin): Promise<any> {
	const res = await request.get<ApiResult<Login>>('/api/login', { params })
	return ReturnIf(res.data.data)
}

/**
 * 获取消息
 */

export async function getUserNotice(): Promise<any> {
	const res = await request.get<ApiResult<Login>>('/api/getUserNotice')
	return ReturnIf(res.data.data)
}

/**
 * 获取用户信息
 */

export async function getUserInfo(): Promise<any> {
	const res = await request.get<ApiResult<any>>('/api/getUserInfo')
	return ReturnIf(res.data.data)
}
