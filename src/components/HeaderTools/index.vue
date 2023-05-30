<template>
	<a-dropdown class="drop">
		<a-badge count="10">
			<bell-outlined style="font-size: 20px" />
		</a-badge>
		<template #overlay>
			<div class="antd-tabs">
				<a-tabs
					v-model:activeKey="activeKey"
					style="width: 80%"
					:centered="true"
				>
					<a-tab-pane key="1" tab="通知" style="justify-content: center">
						<a-list
							item-layout="horizontal"
							:data-source="notice"
							style="max-height: 400px; overflow-y: auto"
						>
							<template #renderItem="{ item }">
								<a-list-item class="list-item">
									<a-list-item-meta
										:description="item.date"
										:title="item.title"
									>
										<template #avatar>
											<a-avatar
												:style="{
													backgroundColor: colorHex(),
												}"
											>
												<template #icon>
													<UserOutlined />
												</template>
											</a-avatar>
										</template>
									</a-list-item-meta>
								</a-list-item>
							</template>
						</a-list>
						<div class="bottom">
							<div class="left">清空通知</div>
							<div class="right">查看更多</div>
						</div>
					</a-tab-pane>
					<a-tab-pane key="2" tab="私信" force-render>
						<a-list item-layout="horizontal" :data-source="privateMessage">
							<template #renderItem="{ item }">
								<a-list-item class="list-item">
									<a-list-item-meta :title="item.title">
										<template #avatar>
											<a-avatar
												:style="{
													backgroundColor: colorHex(),
												}"
											>
												<template #icon>
													<UserOutlined />
												</template>
											</a-avatar>
										</template>
										<template #description>
											<div>{{ item.content }}</div>
											<div>{{ item.date }}</div>
										</template>
									</a-list-item-meta>
								</a-list-item>
							</template>
						</a-list>
						<div class="bottom">
							<div class="left">清空私信</div>
							<div class="right">查看更多</div>
						</div>
					</a-tab-pane>
					<a-tab-pane key="3" tab="待办">
						<a-list item-layout="horizontal" :data-source="todo">
							<template #renderItem="{ item }">
								<a-list-item class="list-item">
									<a-list-item-meta>
										<template #avatar>
											<a-avatar
												:style="{
													backgroundColor: colorHex(),
												}"
											>
												<template #icon>
													<UserOutlined />
												</template>
											</a-avatar>
										</template>
										<template #title>
											<div class="titleTodo">
												<div>{{ item.title }}</div>
												<a-tag color="pink">将要到期</a-tag>
											</div>
										</template>
										<template #description>
											<div>{{ item.date }}</div>
										</template>
									</a-list-item-meta>
								</a-list-item>
							</template>
						</a-list>
						<div class="bottom">
							<div class="left">清空待办</div>
							<div class="right">查看更多</div>
						</div>
					</a-tab-pane>
				</a-tabs>
			</div>
		</template>
	</a-dropdown>
</template>

<script setup lang="ts">
import { BellOutlined } from '@ant-design/icons-vue'
import { ref, reactive } from 'vue'
import { getUserNotice } from '@/api/user/index'
import { colorHex } from '@/utils'
let activeKey = ref('1')
let notice = reactive([])
let privateMessage = reactive([])
let todo = reactive([])

getUserNotice().then((res) => {
	notice = res.notice
	privateMessage = res.privateMessage
	todo = res.todo
})
</script>
<style scoped lang="less">
.antd-tabs {
	width: 460px;
	background-color: #fff;
	box-shadow: 0 0px 5px @primary-color;
	display: flex;
	margin-top: 50px;
	justify-content: center;
	.bottom {
		display: flex;
		align-items: center;
		height: 50px;
		width: 100%;
		justify-content: space-between;
		.left,
		.right {
			width: 50%;
			text-align: center;
			border-top: 1px solid #999;
			line-height: 50px;
			&:hover {
				box-shadow: 0px 0px 5px @primary-color;
			}
		}
		.left {
			border-right: 1px solid #faf8f8;
		}
	}

	.titleTodo {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list-item {
		width: 100%;
	}
}
</style>
