<template>
	<div class="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
*{ touch-action: pan-y; }
body{height: 100%;width: 100%;}
</style>
