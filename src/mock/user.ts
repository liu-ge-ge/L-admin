export default [
	{
		url: '/api/getUserInfo',
		method: 'get',
		statusCode: 200,
		response: () => {
			return {
				code: 200,
				message: '获取成功！',
				data: {
					roles: {
						comments: '管理员',
						createTime: '2023-5-20 13:09',
						roleName: '管理员',
						ruleId: 'judfsfsdfdfs',
					},
					sexName: '男',
					routes: [
						'dashboard',
						'workbench',
						'user',
						'profile',
						'extension',
						'excel',
						'table',
						'watermark',
						'markdown',
						'map',
						'visualization',
					],
					buttons: [],
					routeList: [
						{
							path: '/',
							name: '/',
							redirect: {
								path: '/home',
							},
							meta: {
								id: -1,
								parent: -2,
							},
						},
						{
							path: '/dashboard',
							name: 'dashboard',
							meta: {
								icon: 'BulbOutlined',
								permission: 'dashboard',
								parent: 0,
								title: '工作面板',
								id: '00',
							},
							redirect: {
								path: '/dashboard/workbench',
							},
						},
						{
							path: '/home',
							name: 'home',
							redirect: {
								path: '/dashboard',
							},
							meta: {
								id: 0,
								parent: -1,
							},
							component: '../views/Home/index.vue',
						},
						{
							path: '/dashboard/workbench',
							name: 'workbench',
							component: '../views/Dashboard/WorkBench/index.vue',
							meta: {
								icon: 'BulbOutlined',
								title: '主页',
								permission: 'workbench',
								parent: '00',
								id: '01',
							},
						},
						{
							path: '/user',
							name: 'user',
							redirect: {
								path: '/user/profile',
							},
							meta: {
								icon: 'BulbOutlined',
								title: '个人中心',
								permission: 'user',
								parent: 0,
								id: '10',
							},
						},
						{
							path: '/user/profile',
							name: 'profile',
							component: '../views/User/Profile/index.vue',
							meta: {
								icon: 'BulbOutlined',
								title: '个人资料',
								permission: 'profile',
								parent: '10',
								id: '11',
							},
						},
						{
							path: '/extension',
							name: 'extension',
							redirect: {
								path: '/extension/table',
							},
							meta: {
								icon: 'BulbOutlined',
								title: '扩展组件',
								permission: 'extension',
								parent: 0,
								id: '20',
							},
						},
						{
							path: '/extension/table',
							name: 'table',
							meta: {
								icon: 'BulbOutlined',
								title: '表单组件',
								permission: 'table',
								parent: '20',
								id: '21',
							},
							component: '../views/Extendsion/Table/index.vue',
						},
						{
							path: '/extension/excel',
							name: 'excel',
							meta: {
								icon: 'BulbOutlined',
								title: '表格插件',
								permission: 'excel',
								parent: '20',
								id: '22',
							},
							component: '../views/Extendsion/ExcelPlugin/index.vue',
						},
						{
							path: '/extension/watermark',
							name: 'watermark',
							meta: {
								icon: 'BulbOutlined',
								title: '水印组件',
								permission: 'watermark',
								parent: '20',
								id: '23',
							},
							component: '../views/Extendsion/Watermark/index.vue',
						},
						{
							path: '/extension/markdown',
							name: 'markdown',
							meta: {
								icon: 'BulbOutlined',
								title: 'markdonw',
								permission: 'markdown',
								parent: '20',
								id: '24',
							},
							component: '../views/Extendsion/Markdown/index.vue',
						},
						{
							path: '/extension/map',
							name: 'map',
							meta: {
								icon: 'BulbOutlined',
								title: '地图组件',
								permission: 'map',
								parent: '20',
								id: '25',
							},
							component: '../views/Extendsion/Map/index.vue',
						},
						{
							path: '/exception',
							name: 'exception',
							redirect: {
								path: '/exception/404',
							},
							meta: {
								icon: 'BulbOutlined',
								title: '异常页面',
								parent: 0,
								id: '30',
							},
						},
						{
							path: '/exception/404',
							name: '404',
							component: '../views/Exception/404/index.vue',
							meta: {
								icon: 'BulbOutlined',
								title: '404',
								parent: '30',
								id: '32',
							},
						},
						{
							path: '/exception/403',
							name: '403',
							component: '../views/Exception/403/index.vue',
							meta: {
								icon: 'BulbOutlined',
								title: '403',
								parent: '30',
								id: '31',
							},
						},
						{
							path: '/exception/500',
							name: '500',
							component: '../views/Exception/500/index.vue',
							meta: {
								icon: 'BulbOutlined',
								title: '500',
								parent: '30',
								id: '33',
							},
						},
						{
							path: '/system',
							name: 'systemAdmin',
							redirect: {
								path: '/system/roleManage',
							},
							meta: {
								icon: 'BulbOutlined',
								title: '系统管理',
								parent: 0,
								id: '40',
							},
						},
						{
							path: '/system/roleManage',
							name: 'roleManage',
							meta: {
								icon: 'BulbOutlined',
								title: '角色管理',
								parent: '40',
								id: '41',
							},
							component: '../views/System/RoleManage/index.vue',
						},
						{
							path: '/visualization',
							name: 'visualization',
							component: '../views/Visualization/index.vue',
							meta: {
								icon: 'BulbOutlined',
								permission: 'visualization',
								parent: -1,
								title: '可视化面板',
								id: '01',
							},
						},
					],
				},
			}
		},
	},
]
