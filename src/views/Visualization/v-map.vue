<template>
	<div id="main"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import * as echarts from 'echarts'
import request from '@/utils/request'

let option = reactive({
	backgroundColor: 'transparent',
	tooltip: {},
	geo: {
		map: '河南',
		label: {
			show: true,
			color: '#fff',
		},
		aspectScale: 0.75, //长宽比
		zoom: 1.1,
		roam: false,
		itemStyle: {
			areaColor: '#013C62',
			shadowColor: '#182f68',
			shadowOffsetX: 5,
			shadowOffsetY: 15,
			borderColor: '#2AB8FF',
		},
		emphasis: {
			itemStyle: {
				areaColor: '#2AB8FF',
				borderWidth: 0,
				color: 'green',
			},

			label: {
				show: false,
			},
		},
	},
})
var myChart: echarts.ECharts
onMounted(() => {
	let dom = document.getElementById('main') as HTMLElement
	myChart = echarts.init(dom, 'dark')
	// 基于准备好的dom，初始化echarts实例
	request
		.get('https://geo.datav.aliyun.com/areas_v3/bound/410000_full.json')
		.then((res) => {
			echarts.registerMap('河南', res.data)
			myChart.setOption(option)
		})
})

watch(
	() => option,
	() => {
		myChart.resize()
	}
)

window.addEventListener('resize', function () {
	myChart.resize()
})
</script>

<style lang="less">
#main {
	position: absolute;
	z-index: 2;
	border-radius: 10px;
	top: 0%;
	left: 0%;
}

@media screen and (min-width: 992px) {
	#main {
		width: 100%;
		height: 95%;
	}
}
</style>
