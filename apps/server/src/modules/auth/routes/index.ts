import { Routes } from '@/interfaces/index.js'
import {
	authorize,
	login,
	logout,
	signup,
} from '../controllers/AuthController.js'
import { CREATE_USER_SCHEMA, LOGIN_SCHEMA } from '@awesome-lms/shared'
import { AppInstanse } from '@/types/index.js'

export const getAuthRoutes = (app: AppInstanse): Routes => ({
	routes: [
		{
			method: 'POST',
			url: '/api/login',
			handler: login,
			schema: {
				body: LOGIN_SCHEMA,
			},
		},
		{
			method: 'POST',
			url: '/api/signup',
			handler: signup,
			schema: {
				body: CREATE_USER_SCHEMA,
			},
		},
		{
			method: 'POST',
			url: '/api/logout',
			handler: logout,
			preHandler: [app.authentificate],
		},
		{
			method: 'GET',
			url: '/api/me',
			handler: authorize,
			preHandler: [app.authentificate],
		},
	],
})
