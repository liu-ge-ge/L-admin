<template>
	<div id="line"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue'
let option = reactive({
	backgroundColor: 'transparent',
	title: {
		text: '昨日,今日销售对比',
		textStyle: {
			align: 'center',
			color: '#fff',
			fontSize: 20,
		},
		top: '5%',
		left: 'center',
	},
	legend: {},
	tooltip: {},
	grid: {
		top: '15%',
		left: '5%',
		right: '5%',
		bottom: '15%',
		// containLabel: true
	},
	xAxis: [
		{
			type: 'category',
			axisLine: {
				show: true,
			},
			splitArea: {
				// show: true,
				color: '#f00',
				lineStyle: {
					color: '#f00',
				},
			},
			axisLabel: {
				color: '#fff',
			},
			splitLine: {
				show: false,
			},
			boundaryGap: false,
			data: ['毛衣', '短袖', '飞机', 'RPG', '大炮', 'm416'],
		},
	],

	yAxis: [
		{
			type: 'value',
			min: 0,
			// max: 140,
			splitNumber: 4,
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255,255,255,0.1)',
				},
			},
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: false,
				margin: 20,
				textStyle: {
					color: '#d1e6eb',
				},
			},
			axisTick: {
				show: false,
			},
		},
	],
	series: [
		{
			name: '昨日销售',
			type: 'line',
			// smooth: true, //是否平滑
			showAllSymbol: true,
			// symbol: 'image://./static/images/guang-circle.png',
			symbol: 'circle',
			symbolSize: 25,
			lineStyle: {
				normal: {
					color: '#6c50f3',
					shadowColor: 'rgba(0, 0, 0, .3)',
					shadowBlur: 0,
					shadowOffsetY: 5,
					shadowOffsetX: 5,
				},
			},
			label: {
				show: true,
				position: 'top',
				textStyle: {
					color: '#6c50f3',
				},
			},
			itemStyle: {
				color: '#6c50f3',
				borderColor: '#fff',
				borderWidth: 3,
				shadowColor: 'rgba(0, 0, 0, .3)',
				shadowBlur: 0,
				shadowOffsetY: 2,
				shadowOffsetX: 2,
			},
			tooltip: {
				show: false,
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: 'rgba(108,80,243,0.3)',
							},
							{
								offset: 1,
								color: 'rgba(108,80,243,0)',
							},
						],
						false
					),
					shadowColor: 'rgba(108,80,243, 0.9)',
					shadowBlur: 20,
				},
			},
			data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
		},
		{
			name: '今日销售',
			type: 'line',
			// smooth: true, //是否平滑
			showAllSymbol: true,
			// symbol: 'image://./static/images/guang-circle.png',
			symbol: 'circle',
			symbolSize: 25,
			lineStyle: {
				normal: {
					color: '#00ca95',
					shadowColor: 'rgba(0, 0, 0, .3)',
					shadowBlur: 0,
					shadowOffsetY: 5,
					shadowOffsetX: 5,
				},
			},
			label: {
				show: true,
				position: 'top',
				textStyle: {
					color: '#00ca95',
				},
			},

			itemStyle: {
				color: '#00ca95',
				borderColor: '#fff',
				borderWidth: 3,
				shadowColor: 'rgba(0, 0, 0, .3)',
				shadowBlur: 0,
				shadowOffsetY: 2,
				shadowOffsetX: 2,
			},
			tooltip: {
				show: false,
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: 'rgba(0,202,149,0.3)',
							},
							{
								offset: 1,
								color: 'rgba(0,202,149,0)',
							},
						],
						false
					),
					shadowColor: 'rgba(0,202,149, 0.9)',
					shadowBlur: 20,
				},
			},
			data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
		},
	],
})
let myChart6: echarts.ECharts

onMounted(() => {
	let dom = document.getElementById('line') as HTMLElement
	myChart6 = echarts.init(dom)

	myChart6.setOption(option)
})
window.addEventListener('resize', function () {
	myChart6.resize()
})
</script>
<style lang="less">
#line {
	position: absolute;
	z-index: 2;
	border-radius: 10px;
	top: 50%;
	left: 50%;
	height: 90%;
	width: 90%;
	transform: translateX(-50%) translateY(-50%);
}
</style>
