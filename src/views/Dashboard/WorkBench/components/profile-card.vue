<template>
	<a-card class="l-card" :bordered="false" :body-style="{ padding: '20px' }">
		<div class="proLeft">
			<a-avatar
				class="avatar"
				:size="68"
				src="https://th.bing.com/th?id=OIP.vWWQdfSG8V8xmetkmEOKFQHaIA&w=240&h=260&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
			></a-avatar>
			<div class="info-cell">
				<div class="top">工作一切顺利!加油!加油!加油!</div>
				<div class="bottom">
					<cloud-outlined />
					<div>今日多云转阴，18℃ - 22℃，出门记得穿外套哦~</div>
				</div>
			</div>
		</div>
		<div class="proRight">
			<div class="item-1">
				<div class="top">
					<div class="icon icon-bg-1">
						<appstore-filled class="icon-1" />
					</div>
					<span>项目数</span>
				</div>
				<h2 class="bottom">3</h2>
			</div>
			<div class="item-1">
				<div class="top">
					<div class="icon icon-bg-2">
						<check-square-outlined class="icon-2" />
					</div>
					<span>待办项</span>
				</div>
				<h2 class="bottom">6 / 24</h2>
			</div>
			<div class="item-1">
				<div class="top">
					<div class="icon icon-bg-3">
						<bell-filled class="icon-3" />
					</div>
					<span>消息</span>
				</div>
				<h2 class="bottom">1689</h2>
			</div>
		</div>
	</a-card>
</template>
<script setup lang="ts"></script>

<style lang="less">
.l-card {
	background-color: @system-content;
	color: @system-text-color;
	overflow: hidden;
	.proLeft {
		display: flex;
		flex: 1;
		.avatar {
			border: 1px solid #eee;
			margin-right: 30px;
		}
		.info-cell {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.top {
				font-size: 1.2rem;
				display: flex;
			}
			.bottom {
				color: #b1a6a6;
				display: flex;
				align-items: center;

				div {
					margin-left: 10px;
					width: 300px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
	.proRight {
		display: flex;
		.item-1 {
			margin-right: 20px;
			display: flex;
			flex-direction: column;
			.top {
				align-items: center;
				display: flex;
				.icon-bg-1 {
					border: 1px solid blue;
					background-color: #e6f7ff;
					color: blue;
				}
				.icon-bg-2 {
					background-color: #fff716;
					color: orange;
					border: 1px solid orange;
				}
				.icon-bg-3 {
					background-color: #f6ffed;
					border: 1px solid green;
					color: green;
				}
				.icon {
					width: 30px;
					height: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					margin-right: 10px;
				}
			}
			.bottom {
				text-align: end;
			}
		}
	}
}

@media screen and (min-width: 992px) {
	.ant-card-body {
		display: flex;
		justify-content: space-between;
	}
}

@media screen and (max-width: 992px) {
	.ant-card-body {
		display: block;
	}
	.proRight {
		justify-content: flex-end;
		margin-top: 20px;
	}
}
</style>
