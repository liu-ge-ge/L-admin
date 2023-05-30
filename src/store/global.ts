import { SYSTEM_SIDEBAR_NAME, SYSTEM_TOPBAR_NAME } from '@/config/setting'
import { defineStore } from 'pinia'
interface GlobalSotre {
	sidebarTheme: string
	topBarTheme: string
}

const useGlobalStore = defineStore('global', {
	state: (): GlobalSotre => ({ sidebarTheme: 'dark', topBarTheme: '#fff' }),
	actions: {
		setSidevarTheme(val: string) {
			this.sidebarTheme = val
			localStorage.setItem(SYSTEM_SIDEBAR_NAME, val)
		},
		setTopBarTheme(val: string) {
			this.topBarTheme = val
			localStorage.setItem(SYSTEM_TOPBAR_NAME, val)
		},
	},
})

export default useGlobalStore
