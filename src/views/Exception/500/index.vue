<template>
	<a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
		<template #extra>
			<a-button type="primary">
				<router-link :to="{ path: '/' }">Back Home</router-link>
			</a-button>
		</template>
	</a-result>
</template>
