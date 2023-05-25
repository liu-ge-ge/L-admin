import { getUserInfo } from '@/api/user'
import { getComponent } from '@/router/route'
import { matchRoutes } from '@/utils/permission'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

interface UserStore {
  routes: Array<string>
  sexName: string
  buttons: string[]
  routeList: RouteRecordRaw[]
}

const useUserStore = defineStore('user', {
  state: (): UserStore => ({ routes: [], sexName: '男', buttons: [], routeList: [] }),
  actions: {
    async userInfo() {
      let res = await getUserInfo()
      this.routes = res.routes
      this.sexName = res.sexName
      this.buttons = res.buttons
      this.routeList = matchRoutes(getComponent(res.routeList), res.routes, [])
      localStorage.setItem('routeList', JSON.stringify(this.routeList))
    },
  },
})

export default useUserStore
