<template>
	<div class="login">
		<div class="my-login-box">
			<h2>{{ t('login.login') }}</h2>
			<form>
				<div class="user-box">
					<a-input v-model:value="username"></a-input>
					<label>{{ t('login.userName') }}</label>
				</div>
				<div class="user-box">
					<a-input v-model:value="password"></a-input>
					<label>{{ t('login.password') }}</label>
				</div>
				<a href="#" @click="login">
					<span></span>
					<span></span>
					<span></span>
					<span></span> {{ t('login.login') }}
				</a>
			</form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { userLogin } from '@/api/user'
import { TOKEN_STORE_NAME } from '@/config/setting'
import { setToken } from '@/utils/token-util'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const router = useRouter()
const { t } = useI18n()
let username = ref('')
let password = ref('')

const login = () => {
	let u = username.value
	let p = password.value
	if (!p || !u) {
		message.error('密码或账号为空!')
		return
	}
	userLogin({ username: u, password: p }).then((res) => {
		if (res.data) {
			setToken(res[TOKEN_STORE_NAME])
			router.replace({ path: '/home' })
		}
	})
}
</script>
<style lang="less" scoped>
.login {
	width: 100%;
	height: 100%;
	background-image: url('@/assets/images/bg.png');
	background-size: cover;
	.my-login-box {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 400px;
		padding: 40px;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.5);
		box-sizing: border-box;
		box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
		border-radius: 10px;
	}
	.my-login-box h2 {
		margin: 0 0 30px;
		padding: 0;
		color: #fff;
		text-align: center;
	}
	.my-login-box .user-box {
		position: relative;
	}
	.my-login-box .user-box input {
		width: 100%;
		padding: 10px 0;
		font-size: 16px;
		color: #fff;
		margin-bottom: 30px;
		border: none;
		border-bottom: 1px solid #fff;
		outline: none;
		background: transparent;
	}
	.my-login-box .user-box label {
		position: absolute;
		top: 0;
		left: 0;
		padding: 10px 0;
		font-size: 16px;
		color: #fff;
		pointer-events: none;
		transition: 0.5s;
	}
	.my-login-box .user-box input:focus ~ label,
	.my-login-box .user-box input:valid ~ label {
		top: -30px;
		left: 0;
		color: #03e9f4;
		font-size: 12px;
	}
	.my-login-box form a {
		position: relative;
		display: inline-block;
		padding: 10px 20px;
		color: #03e9f4;
		font-size: 16px;
		text-decoration: none;
		text-transform: uppercase;
		overflow: hidden;
		transition: 0.5s;
		margin-top: 40px;
		letter-spacing: 4px;
	}
	.my-login-box a:hover {
		background: #03e9f4;
		color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
			0 0 100px #03e9f4;
	}
	.my-login-box a span {
		position: absolute;
		display: block;
	}
	.my-login-box a span:nth-child(1) {
		top: 0;
		left: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #03e9f4);
		animation: btn-anim1 1s linear infinite;
	}
	@keyframes btn-anim1 {
		0% {
			left: -100%;
		}
		50%,
		100% {
			left: 100%;
		}
	}
	.my-login-box a span:nth-child(2) {
		top: -100%;
		right: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg, transparent, #03e9f4);
		animation: btn-anim2 1s linear infinite;
		animation-delay: 0.25s;
	}
	@keyframes btn-anim2 {
		0% {
			top: -100%;
		}
		50%,
		100% {
			top: 100%;
		}
	}
	.my-login-box a span:nth-child(3) {
		bottom: 0;
		right: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(270deg, transparent, #03e9f4);
		animation: btn-anim3 1s linear infinite;
		animation-delay: 0.5s;
	}
	@keyframes btn-anim3 {
		0% {
			right: -100%;
		}
		50%,
		100% {
			right: 100%;
		}
	}
	.my-login-box a span:nth-child(4) {
		bottom: -100%;
		left: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(360deg, transparent, #03e9f4);
		animation: btn-anim4 1s linear infinite;
		animation-delay: 0.75s;
	}
	@keyframes btn-anim4 {
		0% {
			bottom: -100%;
		}
		50%,
		100% {
			bottom: 100%;
		}
	}
}
</style>
