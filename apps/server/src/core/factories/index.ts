import { Role } from '@awesome-lms/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

type GuardRule = 'include' | 'exclude'

export const createRoleGuard = (role: Role, rule: GuardRule = 'include') => {
	return async (
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> => {
		const user = request.user

		if (!user) {
			return reply.status(401).send({ message: 'Authentification required' })
		}

		const condition = role === user.role

		if (rule === 'include' ? !condition : condition) {
			return reply.status(401).send({ message: 'Access denied' })
		}
	}
}
