import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/token-util'
import HistoryTags, { Item } from '@/components/HistoryTags'
import { close, start } from '@/utils/nprogress'
import { SYSTEM_NAME } from '@/config/setting'
import useUserStore from '@/store/user'
// const module = import.meta.glob('../views/**/index.vue')
const routes: Array<RouteRecordRaw> = [
	// {
	//   path: '/',
	//   name: '/',
	//   redirect: {
	//     path: '/home',
	//   },
	//   children: [
	//     {
	//       path: '/home',
	//       name: 'home',
	//       redirect: {
	//         path: '/dashboard',
	//       },
	//       component: () => import('../views/Home/index.vue'),
	//       children: [
	//         {
	//           path: '/dashboard',
	//           name: 'dashboard',
	//           meta: {
	//             icon: 'BulbOutlined',
	//             permission: 'dashboard',
	//           },
	//           redirect: {
	//             path: '/dashboard/workbench',
	//           },
	//           children: [
	//             {
	//               path: '/dashboard/workbench',
	//               name: 'workbench',
	//               component: () => import('../views/Dashboard/WorkBench/index.vue'),
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '主页',
	//                 permission: 'workbench',
	//               },
	//             },
	//           ],
	//         },
	//         {
	//           path: '/user',
	//           name: 'user',
	//           redirect: {
	//             path: '/user/profile',
	//           },
	//           meta: {
	//             icon: 'BulbOutlined',
	//             title: '个人中心',
	//             permission: 'user',
	//           },
	//           children: [
	//             {
	//               path: '/user/profile',
	//               name: 'profile',
	//               component: () => import('../views/User/Profile/index.vue'),
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '个人资料',
	//                 permission: 'profile',
	//               },
	//             },
	//           ],
	//         },
	//         {
	//           path: '/extension',
	//           name: 'extension',
	//           redirect: {
	//             path: '/extension/table',
	//           },
	//           meta: {
	//             icon: 'BulbOutlined',
	//             title: '扩展组件',
	//             permission: 'extension',
	//           },
	//           children: [
	//             {
	//               path: '/extension/table',
	//               name: 'table',
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '表单组件',
	//                 permission: 'table',
	//               },
	//               component: () => import('../views/Extendsion/Table/index.vue'),
	//             },
	//             {
	//               path: '/extension/excel',
	//               name: 'excel',
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '表格插件',
	//                 permission: 'excel',
	//               },
	//               component: () => import('../views/Extendsion/ExcelPlugin/index.vue'),
	//             },
	//             {
	//               path: '/extension/watermark',
	//               name: 'watermark',
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '水印组件',
	//                 permission: 'watermark',
	//               },
	//               component: () => import('../views/Extendsion/Watermark/index.vue'),
	//             },
	//             {
	//               path: '/extension/markdown',
	//               name: 'markdown',
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: 'markdonw',
	//                 permission: 'markdown',
	//               },
	//               component: () => import('../views/Extendsion/Markdown/index.vue'),
	//             },
	//             {
	//               path: '/extension/map',
	//               name: 'map',
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '地图组件',
	//                 permission: 'map',
	//               },
	//               component: () => import('../views/Extendsion/Map/index.vue'),
	//             },
	//           ],
	//         },
	//         {
	//           path: '/exception',
	//           name: 'exception',
	//           redirect: {
	//             path: '/exception/404',
	//           },
	//           meta: {
	//             icon: 'BulbOutlined',
	//             title: '异常页面',
	//           },
	//           children: [
	//             {
	//               path: '/exception/403',
	//               name: '403',
	//               component: () => import('../views/Exception/403/index.vue'),
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '403',
	//               },
	//             },
	//             {
	//               path: '/exception/404',
	//               name: '404',
	//               component: () => import('../views/Exception/404/index.vue'),
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '404',
	//               },
	//             },
	//             {
	//               path: '/exception/500',
	//               name: '500',
	//               component: () => import('../views/Exception/500/index.vue'),
	//               meta: {
	//                 icon: 'BulbOutlined',
	//                 title: '500',
	//               },
	//             },
	//           ],
	//         },
	//       ],
	//     },
	//   ],
	// },
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/:pathMatch(.*)',
		name: 'notfund',
		beforeEnter: (to, _, next) => {
			console.log(to, 'tooo')
			next({
				path: to.fullPath,
			})
		},
		component: () => import('../views/Home/index.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

// const routeList = JSON.parse(localStorage.getItem('routeList') as string)
// const path = window.location.pathname
// if (!router.hasRoute(path)) {
// 	router.addRoute(routeList)
// }

router.beforeEach(async (to, from, next) => {
	// 网页title

	document.title = to.meta.title
		? to.meta.title + '-' + SYSTEM_NAME
		: SYSTEM_NAME
	// 进度条
	start()

	if (!getToken() && to.name !== 'login') {
		console.log('没有登录')
		next({
			path: '/login',
		})
	} else if (getToken() && to.name == 'login') {
		console.log('登录状态下', from.fullPath)
		next({
			path: from.fullPath,
			replace: true,
		})
	} else {
		// 注册动态路由
		const userStore = useUserStore()
		if (!userStore.routeList.length) {
			console.log('注册动态路由', to)
			await userStore.userInfo()
			router.addRoute(userStore.routeList[0])
			next({
				path: to.path,
				replace: true,
			})
		} else {
			console.log('已经有路由了')

			// 收集tags
			const obj = {
				title: to.meta.title,
				name: to.name,
			} as Item
			HistoryTags.addRoute(obj)
			if (to.matched.length === 0) {
				next({
					name: '404',
				})
			} else {
				next()
			}
		}
	}

	// console.log('哈哈', to.matched)
	// if (to.matched.length == 0) {
	//   return {
	//     path: '/exception/404',
	//   }
	// }
	return
})

router.afterEach(() => {
	close()
})

export default router
