<template>
	<div class="header">
		L站后台管理系统可视化面板
		<div class="f-h" @click="goIndex">返回</div>
	</div>
	<div class="number-center">
		<template v-for="(item, index) in numberList" :key="item">
			<div v-if="isNaN(Number(item))" class="number" style="width: 20px">
				{{ item }}
			</div>
			<div v-else class="number">
				<span ref="numberItem" :data-number="item" :data-index="index"
					>0123456789</span
				>
			</div>
		</template>
	</div>
	<v-border>
		<template #default>
			<v-map></v-map>
		</template>
	</v-border>
	<v-border2 class="histogr">
		<v-histogram></v-histogram>
	</v-border2>
	<v-border2 class="pie3" height="50%">
		<v-pie2></v-pie2>
	</v-border2>

	<div class="right-pi">
		<v-border2 class="histogr2" width="50%" height="50%">
			<div class="title">河南省各市区销售榜单</div>
			<div class="params">
				<div>排名</div>
				<div>商品名称</div>
				<div>销量</div>
			</div>
			<div class="content">
				<div class="scrool" :style="{ top: top + 'px' }">
					<div
						v-for="(item, index) in shopData"
						:key="item.ranking"
						class="item"
						:class="[index === selectIndex ? 'selectItem' : '']"
					>
						<div class="ranking">
							<div class="round" :style="{ backgroundColor: colorHex() }">
								{{ item.ranking }}
							</div>
						</div>
						<div>{{ item.name }}</div>
						<div style="font-family: electronicFont">
							{{ bigToW(item.sales) }}
						</div>
					</div>
				</div>
			</div>
		</v-border2>
		<v-border2 class="pie2" width="50%" height="50%">
			<v-pie></v-pie>
		</v-border2>
	</div>
	<div class="right-pi2">
		<v-border2 class="pie" width="50%" height="50%">
			<v-word-cloud></v-word-cloud>
		</v-border2>
	</div>
	<v-border2 class="line" width="34%" height="53%">
		<v-line></v-line>
	</v-border2>
</template>
<script setup lang="ts">
import vMap from './v-map.vue'
import vHistogram from './v-histogram.vue'
import vPie from './v-pie.vue'
import vWordCloud from './v-wordCloud.vue'
import vPie2 from './v-pie2.vue'
import vLine from './v-line.vue'
import vBorder from './components/v-border.vue'
import vBorder2 from './components/v-border2.vue'
import { useRouter } from 'vue-router'
import {
	computed,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	watch,
	nextTick,
} from 'vue'
import { colorHex, bigToW } from '@/utils'
const router = useRouter()
const numberList = computed(() => {
	let arr = String(sales.value).split('')
	let index = Math.ceil(arr.length / 3 - 1)
	for (let i = 1; i <= index; i++) {
		arr.splice(arr.length - i * 3 - (i - 1), 0, ',')
	}
	console.log(arr, 'arr')
	return arr
})
var saleTimer: string | number | NodeJS.Timer | undefined
onMounted(() => {
	saleTimer = setInterval(() => {
		if (top.value !== 0 - shopData.length * 32) {
			top.value -= 32
			selectIndex.value += 1
			if (selectIndex.value == shopData.length) {
				selectIndex.value = 0
				top.value = 0
			}
		}
	}, 1000)
	setNumberTransform()

	setInterval(() => {
		sales.value += 1
	}, 3000)
})

const goIndex = () => {
	router.push({ path: '/dashboard/workbench' })
}

onBeforeUnmount(() => {
	clearInterval(saleTimer)
})

let numberItem = ref<Array<HTMLSpanElement> | null>(null)

const setNumberTransform = () => {
	let obj: any = {}
	;(numberItem.value as Array<HTMLSpanElement>).forEach((ele) => {
		let key = String(ele.dataset.index)
		let value = Number(ele.dataset.number)
		let init = 0
		obj[key] = setInterval(() => {
			if (init < value * 10) {
				init += 1
				ele.style.transform = `translateY(-${init * 4}px)`
			} else {
				clearInterval(obj[key])
				obj[key] = null
			}
		}, 16)
	})
}

let sales = ref(1000000)
let top = ref(0)
let selectIndex = ref(0)

watch(
	() => sales.value,
	() => {
		nextTick(() => {
			setNumberTransform()
		})
	}
)

let shopData = reactive([
	{
		ranking: 1,
		sales: 100000000,
		name: '毛衣1',
	},
	{
		ranking: 2,
		sales: 100000000,
		name: '毛衣2',
	},
	{
		ranking: 3,
		sales: 100000000,
		name: '毛衣3',
	},
	{
		ranking: 4,
		sales: 100000000,
		name: '毛衣4',
	},

	{
		ranking: 5,
		sales: 100000000,
		name: '毛衣5',
	},
	{
		ranking: 6,
		sales: 100000000,
		name: '毛衣6',
	},
	{
		ranking: 7,
		sales: 100000000,
		name: '毛衣7',
	},
	{
		ranking: 8,
		sales: 100000000,
		name: '毛衣8',
	},

	{
		ranking: 9,
		sales: 100000000,
		name: '毛衣9',
	},
	{
		ranking: 10,
		sales: 100000000,
		name: '毛衣10',
	},
	{
		ranking: 11,
		sales: 100000000,
		name: '毛衣11',
	},
	{
		ranking: 12,
		sales: 100000000,
		name: '毛衣12',
	},
])
</script>
<style lang="less">
@font-face {
	font-family: electronicFont;
	src: url('@/assets/fonts/DS-DIGI-1.ttf');
}
.line {
	position: absolute;
	right: 0;
	top: 340px;
}
.pie {
	position: absolute;
	left: 0;
	// top: 410px;
	top: 83%;
}

.pie3 {
	position: absolute;
	left: 0;
	top: 370px;
}
.right-pi2 {
	position: absolute;
	bottom: 16%;
	width: 68%;
	left: 31%;
	height: 48%;
}
.right-pi {
	position: absolute;
	right: 0;
	width: 34%;
	height: 60%;

	.pie2 {
		width: 50%;
		position: absolute;
		left: 0;
	}
	.histogr2 {
		right: 0;
		width: 50%;
		position: absolute;
		overflow: hidden;
		.title {
			height: 40px;
			line-height: 40px;
			color: #fff;
			margin-left: 20px;
		}
		.params {
			display: flex;
			margin-bottom: 10px;
			div {
				flex: 1;
				text-align: center;
				color: rgb(78, 211, 211);
			}
		}
		.content {
			position: relative;
			overflow: hidden;
			height: 100%;
			.scrool {
				width: 100%;
				position: absolute;
				display: flex;
				flex-direction: column;
				.selectItem {
					background-color: #013c62;
					border-radius: 5px;
					box-shadow: inset 0px 0px 16px 0px rgba(0, 145, 255, 1);
				}
				.item {
					display: flex;
					margin-bottom: 10px;
					div {
						flex: 1;
						text-align: center;
						color: #fff;
					}
					.ranking {
						font-family: electronicFont;
						display: flex;
						align-items: center;
						justify-content: center;
						.round {
							max-width: 40px;
							border-radius: 5px;
						}
					}
				}
			}
		}
	}
}

body {
	background-image: url('@/assets/images/kbg.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	box-sizing: border-box;
	overflow: hidden;
}
.header {
	color: #fff;
	text-align: center;
	font-size: 1.4rem;
	line-height: 45px;
	background-image: url('@/assets/images/head_bg.png');
	height: 55px;
	background-size: 100% 100%;
	.f-h {
		border: 1px solid #eee;
		border-radius: 25px;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		width: 100px;
		position: absolute;
		right: 20px;
		top: 10px;
		&:hover {
			background-color: rgb(78, 211, 211);
		}
	}
}

.number-center {
	position: absolute;
	left: 47%;
	top: 13%;
	font-size: 40px;
	transform: translateX(-50%);
	font-family: electronicFont;
	color: #fff;
	height: 40px;
	overflow: hidden;
	display: flex;
	.number {
		writing-mode: vertical-rl;
		text-orientation: upright;
		position: relative;
		width: 40px;
		span {
			width: 30px;
			position: absolute;
		}
	}
}

.histogr {
	position: absolute;
	// top: 20%;
}
</style>
