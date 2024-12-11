import { Routes } from '@/core/interfaces/index.js'
import { getCourses } from '../controllers/UsersController.js'
import { GET_BY_ID_SCHEMA } from '@awesome-lms/shared'

export const getUsersRoutes = (): Routes => ({
	routes: [
		{
			method: 'GET',
			url: '/api/users/:id/courses',
			handler: getCourses,
			schema: {
				params: GET_BY_ID_SCHEMA,
			},
		},
	],
})
