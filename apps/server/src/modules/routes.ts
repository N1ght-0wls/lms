import { Routes } from '@/core/interfaces/index.js'
import { AppInstance } from '@/core/types/index.js'
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAuthRoutes } from './auth/routes/index.js'

export const getRoutes = (app: AppInstance): Routes => {
	const { routes: authRoutes } = getAuthRoutes(app)

	return {
		routes: [
			{
				method: 'GET',
				url: '/api/ping',
				handler: async (
					request: FastifyRequest,
					reply: FastifyReply,
				): Promise<void> => {
					reply.status(200).send({ message: 'pong' })
				},
			},
			...authRoutes,
		],
	}
}
