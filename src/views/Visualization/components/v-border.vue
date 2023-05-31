<template>
	<div class="box">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
<style lang="less">
.box {
	position: absolute;
	top: 50%;
	left: 48%;
	transform: translate(-50%, -50%);
	width: 35%;
	height: 50%;
	background: #111845a6;
	box-sizing: border-box;
	overflow: hidden;
	box-shadow: 0 20px 50px rgb(23, 32, 90);
	border: 2px solid #2a3cad;
	color: white;
	padding: 20px;
}

.box .content {
	width: 98%;
	height: 98%;
	border: 1px solid #f0a591;
	// padding: 20px;
	// text-align: center;
	box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
}

.box span {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: block;
	box-sizing: border-box;
}

.box span:nth-child(1) {
	transform: rotate(0deg);
}

// .box span:nth-child(2) {
// 	left: 76px;
// 	transform: rotate(90deg);
// }

.box span:nth-child(3) {
	transform: rotate(180deg);
}

// .box span:nth-child(4) {
// 	left: -76px;
// 	transform: rotate(270deg);
// }

.box span:before {
	content: '';
	position: absolute;
	width: 100%;
	height: 2px;
	background: #50dfdb;
	animation: animate 4s linear infinite;
}

@keyframes animate {
	0% {
		transform: scaleX(0);
		transform-origin: left;
	}
	50% {
		transform: scaleX(1);
		transform-origin: left;
	}
	50.1% {
		transform: scaleX(1);
		transform-origin: right;
	}

	100% {
		transform: scaleX(0);
		transform-origin: right;
	}
}
</style>
