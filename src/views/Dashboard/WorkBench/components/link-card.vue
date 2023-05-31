<template>
	<a-row ref="wrapRef" :gutter="16" style="margin-top: 20px">
		<a-col
			v-for="item in data"
			:key="item.color"
			:lg="3"
			:md="6"
			:sm="12"
			:span="3"
			style="margin-bottom: 10px"
		>
			<a-card :bordered="false" hoverable :body-style="{ padding: 0 }">
				<router-link :to="item.url" class="link-block">
					<component
						:is="item.icon"
						class="link-icon"
						:style="{ color: item.color }"
					></component>
					<div class="title">{{ item.title }}</div>
				</router-link>
			</a-card>
		</a-col>
	</a-row>
</template>
<script setup lang="ts">
import type { Row as ARow } from 'ant-design-vue/es'
import SortableJs from 'sortablejs'
import { onBeforeMount, onMounted, ref } from 'vue'
const blockList = [
	{
		icon: 'mail-outlined',
		title: '消息',
		url: '/user/message',
		color: '#5cdbd3v',
	},
	{
		icon: 'mail-outlined',
		title: '消息',
		url: '/user/message',
		color: '#5cdbd3v',
	},
	{
		icon: 'mail-outlined',
		title: '消息',
		url: '/user/message',
		color: '#5cdbd3v',
	},
	{
		icon: 'fund-two-tone',
		title: '可视化展示数据',
		url: '/visualization',
		color: '#5cdbd3v',
	},
]

let data = ref(blockList)

let wrapRef = ref<InstanceType<typeof ARow> | null>(null)
let sortableIns: SortableJs | null = null
onMounted(() => {
	sortableIns = new SortableJs(wrapRef.value?.$el, {
		animation: 300,
		onUpdate: ({ oldIndex, newIndex }) => {
			if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
				const temp = [...data.value]
				temp.splice(newIndex, 0, temp.splice(oldIndex, 1)[0])
				data.value = temp
			}
		},
	})
})

onBeforeMount(() => {
	if (sortableIns) {
		sortableIns.destroy()
	}
})
</script>
<style lang="less">
.link-block {
	padding: 10px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	.link-icon {
		font-size: 30px;
		margin: 6px 0 10px 0;
	}
	.title {
		color: @system-text-color;
		text-align: center;
	}
}
</style>
