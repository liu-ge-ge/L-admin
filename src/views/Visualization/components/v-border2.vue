<template>
	<div
		class="border-box"
		:style="{ height: props.height || '300px', width: props.width || '30%' }"
	>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
let props = defineProps<{ height?: string; width?: string }>()
</script>
<style lang="less">
.border-box {
	// position: relative;
	// margin: 300px auto;
	// width: 30%;
	// height: 300px;
	background: rgba(1, 19, 67, 0.8);
	border: 2px solid #00a1ff;
	border-radius: 8px;
}
.border-box::before {
	position: absolute;
	top: -2px;
	bottom: -2px;
	left: 30px;
	width: calc(100% - 60px);
	content: '';
	border-top: 2px solid #016886;
	border-bottom: 2px solid #016886;
	z-index: 0;
}
.border-box::after {
	position: absolute;
	top: 30px;
	right: -2px;
	left: -2px;
	height: calc(100% - 60px);
	content: '';
	border-right: 2px solid #016886;
	border-left: 2px solid #016886;
	z-index: 0;
}
.border-box p {
	line-height: 100px;
	text-align: center;
	color: #00a1ff;
}
</style>
