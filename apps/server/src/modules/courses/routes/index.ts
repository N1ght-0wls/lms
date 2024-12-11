import { Routes } from '@/core/interfaces/index.js'
import { AppInstance } from '@/core/types/index.js'
import { createCourse, getCourse } from '../controllers/CoursesController.js'
import { CREATE_COURSE_SCHEMA, GET_BY_ID_SCHEMA } from '@awesome-lms/shared'

export const getCoursesRoutes = (app: AppInstance): Routes => ({
	routes: [
		{
			method: 'GET',
			url: '/api/courses/:id',
			handler: getCourse,
			schema: {
				params: GET_BY_ID_SCHEMA,
			},
		},
		{
			method: 'POST',
			url: '/api/courses',
			handler: createCourse,
			schema: {
				body: CREATE_COURSE_SCHEMA,
			},
			preHandler: [app.authentificate, app.nonUser],
		},
	],
})
