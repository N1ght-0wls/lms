import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/features/auth/stores/auth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('../features/auth/views/SignupView.vue'),
			meta: {
				authenticatedNotAllowed: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../features/auth/views/LoginView.vue'),
			meta: {
				authenticatedNotAllowed: true,
			},
		},
		{
			path: '/reset',
			name: 'reset-password',
			component: () => import('../features/auth/views/ResetPasswordView.vue'),
			meta: {
				authenticatedNotAllowed: true,
			},
		},
	],
})

router.beforeEach((to) => {
	const store = useAuthStore()

	if (to.meta.authenticatedNotAllowed === true && store.isAuthorized) {
		return { name: 'home' }
	}
})

export default router
