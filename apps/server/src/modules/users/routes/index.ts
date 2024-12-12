import { Routes } from '@/core/interfaces/index.js'
import {
	getCourses,
	getStarredCourses,
} from '../controllers/UsersController.js'
import { COURSES_QUERY_SCHEMA, GET_BY_ID_SCHEMA } from '@awesome-lms/shared'

export const getUsersRoutes = (): Routes => ({
	routes: [
		{
			method: 'GET',
			url: '/api/users/:id/courses',
			handler: getCourses,
			schema: {
				params: GET_BY_ID_SCHEMA,
				querystring: COURSES_QUERY_SCHEMA,
			},
		},
		{
			method: 'GET',
			url: '/api/users/:id/starred-courses',
			handler: getStarredCourses,
			schema: {
				params: GET_BY_ID_SCHEMA,
			},
		},
	],
})
