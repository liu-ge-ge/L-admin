<template>
	<div class="userInfo">
		<a-avatar style="background-color: #87d068">
			<template #icon>
				<UserOutlined />
			</template>
		</a-avatar>
		<a-dropdown class="drop">
			<div class="admin" @click.prevent>
				<span v-show="isShowName">{{ t('header.admin') }}</span>
				<DownOutlined />
			</div>
			<template #overlay>
				<a-menu>
					<a-menu-item>
						<user-outlined style="margin-right: 5px" />
						<a href="javascript:;">个人中心</a>
					</a-menu-item>
					<a-menu-item>
						<key-outlined style="margin-right: 5px" />
						<a href="javascript:;">修改密码</a>
					</a-menu-item>
					<a-menu-item @click="signOut">
						<login-outlined style="margin-right: 5px" />
						<a href="javascript:;">退出登录</a>
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
	</div>
</template>
<script setup lang="ts">
import { removeToken } from '@/utils/token-util'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const { t } = useI18n()
const router = useRouter()
let isShowName = ref(true)
const signOut = () => {
	removeToken()
	router.replace({ path: '/login' })
}

const resize = () => {
	if (document.body.clientWidth <= 768) {
		isShowName.value = false
	} else {
		isShowName.value = true
	}
}

onMounted(() => {
	window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', resize)
})
</script>
<style lang="less" scoped>
.userInfo {
	display: flex;
	align-items: center;
	margin-left: 20px;
	.drop {
		margin-left: 10px;
		.admin {
			color: @primary-system-l;
		}
	}
}
</style>
