import { axiosClient } from '@/lib/axios'
import type {
	AuthTokens,
	JwtPayload,
	LOGIN_SCHEMA_TYPE,
} from '@awesome-lms/shared'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export const useLogin = () => {
	const router = useRouter()
	const store = useAuthStore()

	return useMutation({
		mutationKey: ['login'],
		mutationFn: async (values: LOGIN_SCHEMA_TYPE) => {
			const result = await axiosClient.post<AuthTokens & { user: JwtPayload }>(
				'/login',
				values,
			)

			return result.data
		},
		onSuccess(data) {
			store.token = data.access_token
			store.user = data.user
			router.push({ name: 'home' })
		},
	})
}
