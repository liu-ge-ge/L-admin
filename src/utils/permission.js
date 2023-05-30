// 规划路由
export function matchRoutes(
	routeList,
	permission,
	parentArr = [],
	parentId = -2
) {
	if (parentId === -2) {
		routeList = routeList.filter(
			(item) =>
				!item.meta.permission || permission.includes(item.meta.permission)
		)
	}
	parentArr = []
	routeList = [...routeList]
	parentArr = routeList.filter((item) => item.meta.parent === parentId)
	routeList = routeList.filter((item) => item.meta.parent !== parentId)
	parentArr.forEach((item) => {
		item.children = matchRoutes(routeList, permission, [], item.meta.id)
	})
	return parentArr
}
