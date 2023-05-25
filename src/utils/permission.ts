import { RouteRecordRaw } from 'vue-router'

export declare function matchRoutes(
  routeList: RouteRecordRaw[],
  permission: Array<string>,
  parentArr: Array<RouteRecordRaw>
): RouteRecordRaw[]
