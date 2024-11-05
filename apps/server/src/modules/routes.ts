import { Routes } from '@/interfaces/index.js'
import { AppInstanse } from '@/types/index.js'
import { FastifyReply, FastifyRequest } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRoutes = (app: AppInstanse): Routes => {
	return {
		routes: [
			{
				method: 'POST',
				url: '/ping',
				handler: async (
					request: FastifyRequest,
					reply: FastifyReply,
				): Promise<void> => {
					reply.status(200).send({ message: 'pong' })
				},
			},
		],
	}
}
