<template>
	<a-card class="l-card" title="高德地图">
		<div class="searchBox">
			<a-input
				v-model:value="keyword"
				placeholder="请输入搜索关键词"
				style="width: 40%; border-radius: 20px; height: 40px"
			></a-input>
			<div v-if="keyword" class="searchResult">
				<div
					v-for="item in poiList?.pois"
					:key="item.id"
					class="item"
					@click="setMapCenter(item)"
				>
					<span>{{ item.name }}</span>
					<environment-outlined />
				</div>
			</div>
		</div>
		<div id="container"></div>
		<transition name="map">
			<div v-if="isShowTheme" class="select">
				<a-radio-group v-model:value="themeValue" @change="changeMapTheme">
					<a-radio :style="radioStyle" value="normal" class="radio"
						>标准</a-radio
					>
					<a-radio :style="radioStyle" value="macaron" class="radio"
						>马卡龙</a-radio
					>
					<a-radio :style="radioStyle" value="graffiti" class="radio"
						>涂鸦</a-radio
					>
					<a-radio :style="radioStyle" value="whitesmoke" class="radio"
						>远山黛</a-radio
					>
					<a-radio :style="radioStyle" value="dark" class="radio"
						>幻影黑</a-radio
					>
					<a-radio :style="radioStyle" value="fresh" class="radio"
						>草青色</a-radio
					>
					<a-radio :style="radioStyle" value="darkblue" class="radio"
						>极夜蓝</a-radio
					>
					<a-radio :style="radioStyle" value="blue" class="radio"
						>靛青蓝</a-radio
					>
					<a-radio :style="radioStyle" value="light" class="radio"
						>月光银</a-radio
					>
					<a-radio :style="radioStyle" value="grey" class="radio"
						>雅士灰</a-radio
					>
				</a-radio-group>
			</div>
		</transition>

		<div
			class="control"
			:style="{
				color: isShowTheme
					? 'var(--ant-primary-color)'
					: 'var(--ant-text-color)',
			}"
			@click="changeShowTheme"
		>
			<alert-outlined style="margin-right: 3px" />
			地图主题
		</div>

		<div
			class="control3D"
			:style="{
				color: isShow3D ? 'var(--ant-primary-color)' : 'var(--ant-text-color)',
			}"
			@click="changeMapMode"
		>
			<codepen-outlined style="margin-right: 3px" />
			3D
		</div>
	</a-card>
</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, reactive, ref, shallowRef, watch } from 'vue'

interface PoiList {
	count?: number
	pageIndex?: number
	pageSize?: number
	pois?: Array<any>
}

const map = shallowRef<any>(null)
let isShowTheme = ref(false)
let themeValue = ref('normal')
let isShow3D = ref(false)
const keyword = ref('')
let placeSearch: any = null
let poiList = reactive<PoiList>({})
const radioStyle = reactive({
	display: 'flex',
	height: '30px',
	lineHeight: '30px',
})

onMounted(() => {
	initMap()
	//   navigator.geolocation.getCurrentPosition(
	//     (position) => {
	//       console.log(position)
	//     },
	//     (error) => {
	//       let err = error.code
	//       switch (err) {
	//         case 1:
	//           alert('用户拒绝了位置服务')
	//           break
	//         case 2:
	//           alert('获取不到位置信息')
	//           break
	//         case 3:
	//           alert('获取信息超时')
	//       }
	//     }
	//   )
})

const changeShowTheme = () => {
	isShowTheme.value = !isShowTheme.value
}

const changeMapTheme = () => {
	map.value.setMapStyle(`amap://styles/${themeValue.value}`)
}

const changeMapMode = () => {
	isShow3D.value = isShow3D.value ? false : true
	initMap()
}

const setMapCenter = (item: any) => {
	const { lat, lng } = item.location
	map.value.setCenter([lng, lat])
	console.log(item.location, 'item')
}

watch(
	() => keyword.value,
	(newVal) => {
		console.log(newVal, '搜索')
		placeSearch.search(newVal, function (status: number, result: any) {
			console.log(result, 'result', status)
			poiList = result.poiList
		})
	}
)

const initMap = () => {
	AMapLoader.load({
		key: '68d5f0dd471934d674511932f8d8c8d6',
		version: '2.0',
		plugins: [
			'AMap.ToolBar',
			'AMap.Driving',
			'AMap.ControlBar',
			'AMap.PlaceSearch',
			'AMap.AutoComplete',
		],
		Loca: {
			version: '2.0.0',
		},
	})
		.then((AMap) => {
			map.value = new AMap.Map('container', {
				mapStyle: `amap://styles/${themeValue.value}`, //设置地图的显示样式
				viewMode: isShow3D.value ? '3D' : '2D',
				pitch: 75,
				zoom: 13,
				// zooms: [2, 22],
				center: [111.48323, 33.139874],
				terrain: true,
				resizeEnable: true,
			})

			console.log(map.value, 'value')

			searchMap(AMap)
			if (isShow3D.value) {
				AMap.plugin(['AMap.ControlBar'], function () {
					// 添加 3D 罗盘控制
					map.value.addControl(
						new AMap.ControlBar({
							position: {
								right: '20px',
								top: '20px',
							},
							showControlButton: true, // 是否显示倾斜、旋转按钮。默认为 true
						})
					)
				})
			}

			let positionArr = [[111.48323, 33.139874]]

			for (let item of positionArr) {
				let marker = new AMap.Marker({
					position: [item[0], item[1]],
					title: '淅川县',
				})
				map.value.add(marker)
				marker.setLabel({
					direction: 'right',
					offset: new AMap.Pixel(10, 0), //设置文本标注偏移量
					content: "<div style='border:none;'>这里是淅川县,哥在这里呐!</div>", //设置文本标注内容
				})
			}
		})
		.catch((e) => {
			console.log(e, 'eee')
		})
}

const searchMap = (AMap: any) => {
	AMap.plugin(['AMap.AutoComplete', 'AMap.PlaceSearch'], function () {
		// var autoOptions = {
		//   //city 限定城市，默认全国
		//   city: '全国',
		//   input: 'tipinput',
		// }
		// 实例化AutoComplete
		// var autoComplete = new AMap.AutoComplete(autoOptions)
		placeSearch = new AMap.PlaceSearch({
			map: map.value,
		})

		// autoComplete.on('select', (e: any) => {
		//   placeSearch.setCity(e.poi.adcode)
		//   placeSearch.search(e.poi.name) //关键字查询查询
		// })
	})
}
</script>

<style lang="less" scoped>
.searchBox {
	position: absolute;
	top: 10%;
	left: 22%;
	padding: 20px;
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.searchResult {
		box-sizing: border-box;
		width: 40%;
		.item {
			background-color: @system-content;
			color: @system-text-color;
			padding: 3px 6px;
			box-shadow: 0 1px 3px @primary-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&:hover {
				background-color: @primary-color;
				color: #fff;
			}
		}
	}
}
.l-card {
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 0;
	#container {
		width: 90%;
		height: 85%;
		position: absolute;
		top: 70px;
		right: 5%;
		// transform: translateX(-42%) translateY(-44%);
		z-index: 1;
	}
}
.select {
	top: 50%;
	right: 10%;
	width: 200px;
	background-color: @primary-color;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	.radio {
		padding: 3px 10px;
	}
}

.control,
.select,
.control3D,
.searchBox {
	position: absolute;
	z-index: 99999 !important;
}

.control {
	right: 5%;
}

.control3D {
	right: 13%;
	display: flex;
	align-items: center;
}
.control3D,
.control {
	top: 91%;
	color: @system-text-color;
	background-color: @system-content;
	border-radius: 2px;
	font-size: 12px;
	padding: 4px 10px;
}

.map-enter-from,
.map-leave-to {
	opacity: 0;
}
.map-center-to,
.map-leave-from {
	opacity: 1;
}
.map-enter-active,
.map-leave-active {
	transition: opacity 1s ease;
}

.map-enter-active {
	animation: bounce 1s ease;
}

.map-leave-active {
	animation: lik 1s ease;
}

@keyframes bounce {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes lik {
	0% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
}
</style>
