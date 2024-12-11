import { GET_BY_ID_SCHEMA_TYPE } from '@awesome-lms/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getCourses = async (
	request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { id } = request.params
	const { usersRepository } = request.diScope.cradle

	const isExist = await usersRepository.findOne(id)

	if (!isExist.success) {
		return reply.status(404).send({ message: 'User with such id not found' })
	}

	const user = isExist.value

	const courses = await usersRepository.findCourses(id, user.role)

	return reply.status(200).send(courses)
}

export const getStarredCourses = async (
	request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { id } = request.params
	const { usersRepository } = request.diScope.cradle

	const isExist = await usersRepository.findOne(id)

	if (!isExist.success) {
		return reply.status(404).send({ message: 'User with such id not found' })
	}

	const courses = await usersRepository.findStarredCourses(id)

	return reply.status(200).send(courses)
}
