<template>
	<div id="histogram"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue'
let myChart2: echarts.ECharts

const MAX = [
	6000, 6000, 6000, 6000, 6000, 5000, 4000, 3000, 2000, 4000, 3000, 2000,
]
const VALUE = [
	2012, 1230, 3790, 2349, 1654, 1230, 3790, 2349, 1654, 3790, 2349, 1654,
]

let option = reactive({
	backgroundColor: 'transparent',
	tooltip: {},
	title: {
		text: '淅川县',
		textStyle: {
			color: '#fff',
		},
		left: '45%',
	},
	grid: {
		bottom: '10%',
		// top: 107,
		let: 0,
		containLabel: true,
	},
	xAxis: {
		type: 'category',
		data: [
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
			'淅川县',
		],
		axisLine: {
			show: true,
			lineStyle: {
				color: 'white',
			},
		},
		offset: 20,
		axisTick: {
			show: false,
			length: 9,
			alignWithLabel: true,
			lineStyle: {
				color: '#7DFFFD',
			},
		},
		axisLabel: {
			fontSize: 10,
		},
	},
	yAxis: {
		type: 'value',
		axisLine: {
			show: true,
			lineStyle: {
				color: 'white',
			},
		},
		splitLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			fontSize: 14,
		},
		boundaryGap: ['20%', '20%'],
	},
	series: [
		{
			type: 'custom',
			renderItem: function (_params: any, api: any) {
				const location = api.coord([api.value(0), api.value(1)])
				return {
					type: 'group',
					children: [
						{
							type: 'CubeLeft',
							shape: {
								api,
								xValue: api.value(0),
								yValue: api.value(1),
								x: location[0],
								y: location[1],
								xAxisPoint: api.coord([api.value(0), 0]),
							},
							style: {
								fill: 'rgba(7,29,97,.6)',
							},
						},
						{
							type: 'CubeRight',
							shape: {
								api,
								xValue: api.value(0),
								yValue: api.value(1),
								x: location[0],
								y: location[1],
								xAxisPoint: api.coord([api.value(0), 0]),
							},
							style: {
								fill: 'rgba(10,35,108,.7)',
							},
						},
						{
							type: 'CubeTop',
							shape: {
								api,
								xValue: api.value(0),
								yValue: api.value(1),
								x: location[0],
								y: location[1],
								xAxisPoint: api.coord([api.value(0), 0]),
							},
							style: {
								fill: 'rgba(11,42,106,.8)',
							},
						},
					],
				}
			},
			data: MAX,
		},
		{
			type: 'custom',
			renderItem: (_params: any, api: any) => {
				const location = api.coord([api.value(0), api.value(1)])
				return {
					type: 'group',
					children: [
						{
							type: 'CubeLeft',
							shape: {
								api,
								xValue: api.value(0),
								yValue: api.value(1),
								x: location[0],
								y: location[1],
								xAxisPoint: api.coord([api.value(0), 0]),
							},
							style: {
								fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: '#3B80E2',
									},
									{
										offset: 1,
										color: '#49BEE5',
									},
								]),
							},
						},
						{
							type: 'CubeRight',
							shape: {
								api,
								xValue: api.value(0),
								yValue: api.value(1),
								x: location[0],
								y: location[1],
								xAxisPoint: api.coord([api.value(0), 0]),
							},
							style: {
								fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: '#3B80E2',
									},
									{
										offset: 1,
										color: '#49BEE5',
									},
								]),
							},
						},
						{
							type: 'CubeTop',
							shape: {
								api,
								xValue: api.value(0),
								yValue: api.value(1),
								x: location[0],
								y: location[1],
								xAxisPoint: api.coord([api.value(0), 0]),
							},
							style: {
								fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: '#3B80E2',
									},
									{
										offset: 1,
										color: '#49BEE5',
									},
								]),
							},
						},
					],
				}
			},
			data: VALUE,
		},
		{
			type: 'bar',
			itemStyle: {
				color: 'transparent',
			},

			data: MAX,
		},
	],
})

onMounted(() => {
	const CubeLeft = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0,
		},
		buildPath: function (ctx, shape) {
			const xAxisPoint = shape.xAxisPoint
			const c0 = [shape.x, shape.y]
			const c1 = [shape.x - 9, shape.y - 9]
			const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
			const c3 = [xAxisPoint[0], xAxisPoint[1]]
			let pre = ctx.moveTo(c0[0], c0[1]) as any
			pre
				.lineTo(c1[0], c1[1])
				.lineTo(c2[0], c2[1])
				.lineTo(c3[0], c3[1])
				.closePath()
		},
	})
	const CubeRight = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0,
		},
		buildPath: function (ctx, shape) {
			const xAxisPoint = shape.xAxisPoint
			const c1 = [shape.x, shape.y]
			const c2 = [xAxisPoint[0], xAxisPoint[1]]
			const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
			const c4 = [shape.x + 18, shape.y - 9]
			let pre = ctx.moveTo(c1[0], c1[1]) as any
			pre
				.lineTo(c2[0], c2[1])
				.lineTo(c3[0], c3[1])
				.lineTo(c4[0], c4[1])
				.closePath()
		},
	})
	const CubeTop = echarts.graphic.extendShape({
		shape: {
			x: 0,
			y: 0,
		},
		buildPath: function (ctx, shape) {
			const c1 = [shape.x, shape.y]
			const c2 = [shape.x + 18, shape.y - 9]
			const c3 = [shape.x + 9, shape.y - 18]
			const c4 = [shape.x - 9, shape.y - 9]
			let pre = ctx.moveTo(c1[0], c1[1]) as any
			pre
				.lineTo(c2[0], c2[1])
				.lineTo(c3[0], c3[1])
				.lineTo(c4[0], c4[1])
				.closePath()
		},
	})
	echarts.graphic.registerShape('CubeLeft', CubeLeft)
	echarts.graphic.registerShape('CubeRight', CubeRight)
	echarts.graphic.registerShape('CubeTop', CubeTop)

	let dom = document.getElementById('histogram') as HTMLElement
	myChart2 = echarts.init(dom)

	myChart2.setOption(option)
})

window.addEventListener('resize', function () {
	myChart2.resize()
})
</script>

<style lang="less">
#histogram {
	position: absolute;
	z-index: 2;
	border-radius: 10px;
	// overflow: hidden;
	left: 0;
	// top: 0%;
}

@media screen and (min-width: 992px) {
	#histogram {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
}

// @media screen and (max-width: 992px) {
// 	#histogram {
// 		width: 100%;
// 		height: 60%;
// 	}
// }
</style>
