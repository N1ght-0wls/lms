import {
	CREATE_USER_SCHEMA_TYPE,
	JwtPayload,
	LOGIN_SCHEMA_TYPE,
} from '@awesome-lms/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const login = async (
	request: FastifyRequest<{ Body: LOGIN_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { email, password } = request.body
	const { authService, usersRepository } = request.diScope.cradle

	const user = await usersRepository.findOneByEmail(email)

	if (!user) {
		return reply.status(400).send({ message: 'Invalid email or password' })
	}

	const isPasswordMatch = await authService.verifyPassword(
		password,
		user.password,
	)

	if (!isPasswordMatch) {
		return reply.status(400).send({ message: 'Invalid email or password' })
	}

	const payload: JwtPayload = {
		id: user.id,
		email: user.email,
		username: user.username,
		roles: user.roles,
	}

	const token = request.jwt.sign(payload)

	reply.setCookie('access_token', token, {
		path: '/',
		httpOnly: true,
		secure: true,
	})

	return reply.status(200).send({ ['access_token']: token, user: payload })
}

export const signup = async (
	request: FastifyRequest<{ Body: CREATE_USER_SCHEMA_TYPE }>,
	reply: FastifyReply,
): Promise<void> => {
	const { email, password } = request.body
	const { authService, usersRepository } = request.diScope.cradle

	const isExist = await usersRepository.findOneByEmail(email)

	if (isExist) {
		return reply
			.status(400)
			.send({ message: 'User with such email already exists' })
	}

	const hashedPassword = await authService.generateHash(password)

	const user = await usersRepository.createOne({
		...request.body,
		password: hashedPassword,
	})

	return reply.status(201).send(user)
}

export const logout = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	reply.clearCookie('access_token')

	return reply.send({ message: 'Logout successful' })
}

export const authorize = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const user = request.user

	if (!user) {
		reply.status(401)
	}

	reply.status(200).send(user)
}
