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

export const starCourse = async (
	request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { id } = request.params
	const { coursesRepository } = request.diScope.cradle

	const course = await coursesRepository.findOne(id)

	if (!course.success) {
		const { status, message } = course.error

		return reply.status(status).send({ message })
	}

	await coursesRepository.starOne(id, request.user.id)

	return reply.status(200).send(course.value)
}

export const unstarCourse = async (
	request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { id } = request.params
	const { coursesRepository } = request.diScope.cradle

	const course = await coursesRepository.findOne(id)

	if (!course.success) {
		const { status, message } = course.error

		return reply.status(status).send({ message })
	}

	await coursesRepository.unstarOne(id, request.user.id)

	return reply.status(200).send(course.value)
}
