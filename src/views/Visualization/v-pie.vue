<template>
	<div id="pie"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue'

let myChart4: echarts.ECharts
let data = [
	{
		name: '已发货',
		value: 100,
	},
	{
		name: '待发货',
		value: 75,
	},
	{
		name: '已收货',
		value: 50,
	},
	{
		name: '待退款',
		value: 25,
	},
]

let arrName = getArrayValue(data, 'name')
let arrValue = getArrayValue(data, 'value')
let sumValue = eval(arrValue.join('+'))
let objData = array2obj(data, 'name')
let optionData = getData(data)

function getArrayValue(array: any, key: any) {
	var key = key || 'value'
	var res = [] as any
	if (array) {
		array.forEach(function (t: any) {
			res.push(t[key])
		})
	}
	return res
}

function array2obj(array: any, key: any) {
	var resObj = {} as any
	for (var i = 0; i < array.length; i++) {
		resObj[array[i][key]] = array[i]
	}
	return resObj
}

function getData(data: any) {
	var res = {
		series: [],
		yAxis: [],
	} as any
	for (let i = 0; i < data.length; i++) {
		res.series.push({
			name: '',
			type: 'pie',
			clockWise: false, //顺时加载
			hoverAnimation: false, //鼠标移入变大
			radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
			center: ['50%', '50%'],
			label: {
				show: false,
			},
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false,
				},
				borderWidth: 5,
			},
			data: [
				{
					value: data[i].value,
					name: data[i].name,
				},
				{
					value: sumValue - data[i].value,
					name: '',
					itemStyle: {
						color: 'rgba(0,0,0,0)',
						borderWidth: 0,
					},
					tooltip: {
						show: false,
					},
					hoverAnimation: false,
				},
			],
		})
		res.series.push({
			name: '',
			type: 'pie',
			silent: true,
			z: 1,
			clockWise: false, //顺时加载
			hoverAnimation: false, //鼠标移入变大
			radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
			center: ['50%', '50%'],
			label: {
				show: false,
			},
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false,
				},
				borderWidth: 5,
			},
			data: [
				{
					value: 7.5,
					itemStyle: {
						color: 'rgb(3, 31, 62)',
						borderWidth: 0,
					},
					tooltip: {
						show: false,
					},
					hoverAnimation: false,
				},
				{
					value: 2.5,
					name: '',
					itemStyle: {
						color: 'rgba(0,0,0,0)',
						borderWidth: 0,
					},
					tooltip: {
						show: false,
					},
					hoverAnimation: false,
				},
			],
		})
		res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(2) + '%')
	}
	return res
}

let option = reactive({
	backgroundColor: 'transparent',
	title: {
		text: '快递情况',
		left: '45%',
		top: '0%',
		textStyle: {
			color: '#fff',
		},
	},
	legend: {
		show: true,
		icon: 'circle',
		// top: "center",
		top: '15%',
		bottom: '53%',
		left: '50%',
		data: arrName,
		width: 30,
		padding: [0, 5],
		itemGap: 6,
		formatter: function (name: string) {
			return '{title|' + name + '} {value|' + objData[name].value + '}{title|%}'
		},

		textStyle: {
			rich: {
				title: {
					fontSize: 14,
					lineHeight: 30,
					color: 'rgb(0, 178, 246)',
				},
				value: {
					fontSize: 13,
					lineHeight: 20,
					color: '#fff',
				},
			},
		},
	},
	tooltip: {
		show: true,
		trigger: 'item',
		formatter: '{a}<br>{b}:{c}({d}%)',
	},
	color: [
		'rgb(9,187,247)',
		'rgb(184,254,165)',
		'rgb(253,218,23)',
		'rgb(252,152,12)',
	],
	xAxis: [
		{
			show: false,
		},
	],
	series: optionData.series,
})

onMounted(() => {
	let dom = document.getElementById('pie') as HTMLElement
	let myChart4 = echarts.init(dom)
	myChart4.setOption(option)
	window.addEventListener('resize', function () {
		myChart4.resize()
	})
})
</script>
<style lang="less">
#pie {
	position: absolute;
	z-index: 2;
	border-radius: 10px;
	top: 10%;
	left: 0%;
	width: 90%;
	height: 90%;
}
</style>
