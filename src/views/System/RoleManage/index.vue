<template>
	<a-card class="l-card">
		<table-plus :data-source="data" :columns="columns" :is-show-tools="true">
			<!-- <template #plusTitle>
        <a-button type="primary">新建</a-button>
      </template> -->
			<template #bodyCell="{ column }">
				<template v-if="column.key == 'action'">
					<a-space>
						<a @click="editVisible = true">修改</a>
						<a-divider type="vertical" />
						<a @click="authVisible = true">分配权限</a>
						<a-divider type="vertical" />
						<a>删除</a>
						<a-divider type="vertical" />
					</a-space>
				</template>
			</template>
		</table-plus>

		<role-auth :visible="authVisible" @cancel="roleCancel"></role-auth>
		<role-edit :visible="editVisible" @cancel="editCancel"></role-edit>
	</a-card>
</template>
<script setup lang="ts">
import TablePlus from '@/components/TablePlus/index.vue'
import RoleAuth from './components/role-auth.vue'
import RoleEdit from './components/role-edit.vue'
import { ColumnsType } from 'ant-design-vue/lib/table'
import { ref } from 'vue'
const authVisible = ref(false)
const editVisible = ref(false)
const roleCancel = () => {
	console.log('关闭')
	authVisible.value = false
}

const editCancel = () => {
	editVisible.value = false
}

const data = [
	{
		comments: '管理员',
		createTime: '2023-05-21 15:13',
		roleCode: 'admin',
		roleId: 4,
		roleName: '管理员',
	},
	{
		comments: '普通用户',
		createTime: '2023-05-21 15:13',
		roleCode: 'user',
		roleId: 4,
		roleName: '普通用户',
	},
	{
		comments: '游客',
		createTime: '2023-05-21 15:13',
		roleCode: 'guest',
		roleId: 4,
		roleName: '游客',
	},
]

const columns: ColumnsType = [
	{
		title: '角色名称',
		dataIndex: 'roleName',
		align: 'center',
	},
	{
		title: '角色标识',
		dataIndex: 'roleCode',
		align: 'center',
	},
	{
		title: '备注',
		dataIndex: 'comments',
		align: 'center',
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		align: 'center',
	},
	{
		title: '操作',
		align: 'center',
		key: 'action',
	},
]
</script>
<style lang="less">
.l-card {
	background-color: @system-content;
	color: @system-text-color;
	width: 100%;
	height: 100%;
}
</style>
