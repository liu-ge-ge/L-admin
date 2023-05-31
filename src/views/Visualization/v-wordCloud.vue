<template>
	<div id="word"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue'

var data = [
	{ value: 3, name: '计算机' },
	{ value: 3, name: '计算机' },
	{ value: 3, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '计算机' },
	{ value: 2, name: '红灯' },
	{ value: 2, name: '体验' },
	{ value: 2, name: '安东路外滩' },
	{ value: 2, name: '试车' },
	{ value: 2, name: '速递' },
	{ value: 2, name: '站台' },
	{ value: 2, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '客流' },
	{ value: 1, name: '车厢' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '红绿灯' },
	{ value: 1, name: '正式' },
	{ value: 1, name: '路权' },
	{ value: 1, name: '新片' },
	{ value: 1, name: '视频' },
	{ value: 1, name: '头班车' },
	{ value: 1, name: '中路' },
	{ value: 1, name: '北路站' },
	{ value: 1, name: '传说' },
	{ value: 1, name: '小时' },
	{ value: 1, name: '路试' },
	{ value: 1, name: '单程' },
	{ value: 1, name: '路上' },
	{ value: 1, name: '拥堵' },
	{ value: 1, name: '启用' },
	{ value: 1, name: '换乘' },
	{ value: 1, name: '调试' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '路线' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
	{ value: 1, name: '淅川' },
]

let option = reactive({
	tooltip: {},
	series: [
		{
			type: 'wordCloud',
			shape: 'circle',
			rotationRange: [-90, 90],
			rotationStep: 1,
			data: data,
			height: '100%',
			width: '75%',
			sizeRange: [18, 80],
			textStyle: {
				color: function () {
					// Random color
					return (
						'rgb(' +
						[
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160),
						].join(',') +
						')'
					)
				},
			},
		},
	],
})
let myChart3: echarts.ECharts
onMounted(() => {
	let dom = document.getElementById('word') as HTMLElement
	myChart3 = echarts.init(dom)
	myChart3.setOption(option)
})
window.addEventListener('resize', function () {
	myChart3.resize()
})
</script>
<style lang="less">
#word {
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
