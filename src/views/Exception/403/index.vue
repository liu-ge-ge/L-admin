<template>
	<a-result
		status="403"
		title="403"
		sub-title="Sorry, you are not authorized to access this page."
	>
		<template #extra>
			<a-button type="primary">
				<router-link :to="{ path: '/' }">Back Home</router-link></a-button
			>
		</template>
	</a-result>
</template>
