import type { JwtPayload } from '@awesome-lms/shared'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
	'auth',
	() => {
		const token = ref<string | null>(null)
		const user = ref<JwtPayload | null>(null)

		const isAuthorized = computed(() => token.value && user.value)

		return { user, token, isAuthorized }
	},
	{
		persist: true,
	},
)
