import { useAuthStore } from '../stores/auth'

export const useLogout = () => {
	const store = useAuthStore()

	const logout = () => {
		store.token = null
		store.user = null
	}

	return { logout }
}
