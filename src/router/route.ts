const module = import.meta.glob('../views/**/*.vue')
/**
 * 解析路由
 */
export function getComponent(routeList: any[]) {
  routeList.forEach((item) => {
    if (item.component) {
      const component = module[item.component]
      item.component = component
    }
  })
  return routeList
}
