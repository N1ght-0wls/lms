<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { RouterView } from 'vue-router'

const colorMode = useColorMode()
</script>

<template>
	<RouterView />
</template>
