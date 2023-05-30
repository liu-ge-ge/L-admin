export interface Item {
	title?: string
	name?: string
}
class HistoryTags {
	routeList: Array<Item>
	constructor() {
		this.routeList = []
	}
	addRoute(obj: Item) {
		console.log(obj)
		if (obj.name == 'login' || obj.name == 'notfund') return
		const index: number = this.routeList.findIndex(
			(item) => item.title === obj.title
		)
		if (index === -1) {
			this.routeList.push(obj)
			return this.routeList.length
		} else {
			return index
		}
	}
	delRoute(index: number) {
		if (this.routeList.length <= 1) return 0
		this.routeList.splice(index, 1)
		return index
	}
}

export default new HistoryTags()
