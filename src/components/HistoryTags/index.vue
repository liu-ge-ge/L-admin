<template>
	<div class="tags" :style="{ backgroundColor: props.topBarTheme }">
		<div
			v-for="(item, index) in routeList"
			:key="item.title"
			class="boxTag"
			:style="{
				backgroundColor:
					route.meta.title === item.title ? 'var(--ant-primary-3)' : '',
				color: route.meta.title === item.title ? 'var(--ant-primary-7)' : '',
			}"
			@click="routePush(item)"
		>
			<div
				class="round"
				:style="{
					backgroundColor:
						route.meta.title === item.title ? 'var(--ant-primary-6)' : '#999',
				}"
			></div>
			{{ item.title }}
			<close-outlined
				v-if="route.name === item.name"
				style="margin-left: 5px; font-size: 12px"
				@click="delTags(index)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import HistoryTags, { Item } from './index'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
interface HistoryProps {
	topBarTheme: string
}
const props = defineProps<HistoryProps>()
let routeList = ref(HistoryTags.routeList)
watch(
	() => routeList,
	(newVal) => {
		console.log(newVal, 'newVal')
	}
)
const routePush = (item: Item) => {
	if (item.name != route.meta.name) {
		router.push({ name: item.name })
	}
}

const delTags = (index: number) => {
	HistoryTags.delRoute(index)
	console.log(routeList.value, 'historyh')
	// routePush(routeList[index - 1])
}
</script>

<style lang="less" scoped>
.tags {
	width: 100%;
	height: 55px;
	padding: 0px 20px;
	display: flex;
	align-items: center;
	.boxTag {
		padding: 0 20px;
		height: 35px;
		// background-color: var(--ant-primary-3);
		// color: var(--ant-primary-7);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
		.round {
			width: 10px;
			height: 10px;
			border-radius: 5px;
			background-color: var(--ant-primary-6);
			margin-right: 10px;
		}
	}
}
</style>
