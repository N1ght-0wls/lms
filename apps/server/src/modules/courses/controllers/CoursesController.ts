import {
	CREATE_COURSE_SCHEMA_TYPE,
	GET_BY_ID_SCHEMA_TYPE,
} from '@awesome-lms/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getCourse = async (
	request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { id } = request.params
	const { coursesRepository } = request.diScope.cradle

	const result = await coursesRepository.findOne(id)

	if (!result.success) {
		const { status, message } = result.error

		return reply.status(status).send({ message })
	}

	return reply.status(200).send(result.value)
}

export const createCourse = async (
	request: FastifyRequest<{ Body: CREATE_COURSE_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { coursesRepository } = request.diScope.cradle

	const result = await coursesRepository.createOne(request.body)

	if (!result.success) {
		const { status, message } = result.error

		return reply.status(status).send({ message })
	}

	return reply.status(200).send(result.value)
}
