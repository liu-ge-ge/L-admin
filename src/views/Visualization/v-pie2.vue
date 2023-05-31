<template>
	<div id="pie2"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue'

let option = reactive({
	// legend: {
	// 	top: 'bottom',
	// },
	tooltip: {},
	toolbox: {
		show: true,
		feature: {
			// mark: { show: true },
			// dataView: { show: true, readOnly: false },
			// restore: { show: true },
			// saveAsImage: { show: true },
		},
	},
	series: [
		{
			name: '河南省各市区L站占比',
			type: 'pie',
			radius: [40, 180],
			center: ['50%', '50%'],
			roseType: 'area',
			itemStyle: {
				borderRadius: 8,
			},
			data: [
				{ value: 4.89, name: '南阳市' },
				{ value: 4.24, name: '安阳市' },
				{ value: 2.96, name: '新乡市' },
				{ value: 2.09, name: '鹤壁市' },
				{ value: 3.92, name: '濮阳市' },
				{ value: 3.65, name: '焦作市' },
				{ value: 4.71, name: '三门峡市' },
				{ value: 4.91, name: '郑州' },
				{ value: 3.41, name: '商丘市' },
				{ value: 3.27, name: '周口市' },
				{ value: 2.65, name: '驻马店市' },
				{ value: 3.54, name: '信阳市' },
				{ value: 2.51, name: '洛阳市' },
				{ value: 2.51, name: '许昌市' },
				{ value: 2.51, name: '漯河市' },
				{ value: 2.51, name: '平顶山市' },
				{ value: 2.51, name: '开封市' },
				{ value: 2.51, name: '济源市' },
			],
		},
	],
})
let myChart5: echarts.ECharts
onMounted(() => {
	let dom = document.getElementById('pie2') as HTMLElement
	myChart5 = echarts.init(dom)
	myChart5.setOption(option)
})
window.addEventListener('resize', function () {
	myChart5.resize()
})
</script>
<style lang="less">
#pie2 {
	position: absolute;
	z-index: 2;
	border-radius: 10px;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	width: 90%;
	height: 90%;
}
</style>
