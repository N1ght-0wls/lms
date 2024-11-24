import { axiosClient } from '@/lib/axios'
import type { CREATE_USER_SCHEMA_TYPE } from '@awesome-lms/shared'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

export const useSignup = () => {
	const router = useRouter()

	return useMutation({
		mutationKey: ['signup'],
		mutationFn: async (values: CREATE_USER_SCHEMA_TYPE) => {
			const result = await axiosClient.post('/signup', values)

			return result.data
		},
		onSuccess() {
			router.push({ name: 'home' })
		},
	})
}
