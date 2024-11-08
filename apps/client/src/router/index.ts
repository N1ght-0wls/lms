import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../features/auth/views/LoginView.vue'),
		},
	],
})

export default router
