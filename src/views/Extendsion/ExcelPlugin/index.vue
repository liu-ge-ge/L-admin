<template>
	<a-card>
		<table-plus
			:data-source="data"
			:columns="columns"
			:pagination="{ showSizeChanger: true }"
		>
			<template #plusTitle>
				<a-button
					type="primary"
					@click="exportExcelFormServe(['name', 'chinese'])"
				>
					<download-outlined />
					导出
				</a-button>
			</template>
		</table-plus>
		<a-spin tip="Loading...">
			<a-alert
				message="Alert message title"
				description="Further details about the context of this alert."
			></a-alert>
		</a-spin>
	</a-card>
</template>
<script setup lang="ts">
import TablePlus from '@/components/TablePlus/index.vue'
import { message } from 'ant-design-vue'
import * as XLSX from 'xlsx'

const data = [
	{
		key: '1',
		name: 'John Brown',
		chinese: 98,
		math: 60,
		english: 70,
	},
	{
		key: '2',
		name: 'Jim Green',
		chinese: 98,
		math: 66,
		english: 89,
	},
	{
		key: '3',
		name: 'Joe Black',
		chinese: 98,
		math: 90,
		english: 70,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},

	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},

	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
	{
		key: '4',
		name: 'Jim Red',
		chinese: 88,
		math: 99,
		english: 89,
	},
]
const exportExcelFormServe = (titleArr: string[]) => {
	message.info('正在导出表格...')
	let arr: any[][] = []
	data.forEach((item: any) => {
		let arr2: any[] = []
		titleArr.forEach((item2) => {
			arr2.push(item[item2])
		})
		arr.push(arr2)
	})
	let sourceData = [titleArr, ...arr]

	const options = {
		'!cols': [{ wpx: 100 }, { wpx: 100 }, { wpx: 100 }],
	}

	const worksheet = XLSX.utils.aoa_to_sheet(sourceData)
	worksheet['!cols'] = options['!cols']
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
	XLSX.writeFile(workbook, '表格.xlsx')
	message.success('导出表格成功!')
}
const columns = [
	{
		title: 'Index',
		customRender: ({ index }: { index: number }) => {
			return index
		},
	},
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Chinese Score',
		dataIndex: 'chinese',
		sorter: {
			compare: (a: { chinese: number }, b: { chinese: number }) =>
				a.chinese - b.chinese,
			multiple: 3,
		},
	},
	{
		title: 'Math Score',
		dataIndex: 'math',
		sorter: {
			compare: (a: { math: number }, b: { math: number }) => a.math - b.math,
			multiple: 2,
		},
	},
	{
		title: 'English Score',
		dataIndex: 'english',
		sorter: {
			compare: (a: { english: number }, b: { english: number }) =>
				a.english - b.english,
			multiple: 1,
		},
	},
]
</script>
