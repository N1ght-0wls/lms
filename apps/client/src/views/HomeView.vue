<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
import { useTheme } from '@/core/composables'
import { axiosClient } from '@/lib/axios'
import { Icon } from '@iconify/vue'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const { toggle, themeIcon } = useTheme()
const { data, status } = useQuery({
	queryKey: ['ping'],
	queryFn: async () => {
		const result = await axiosClient.get<{ message: string }>('/ping')

		return result.data
	},
})

const fallback = computed(() =>
	status.value === 'pending' ? 'Loading...' : data.value?.message,
)
</script>

<template>
	<div class="flex flex-col size-full items-center justify-center gap-2">
		<Button size="icon" @click="toggle">
			<Icon :icon="themeIcon" />
		</Button>
		<p>{{ fallback }}</p>
	</div>
</template>
