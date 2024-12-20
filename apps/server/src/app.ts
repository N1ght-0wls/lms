import { fastifyAuth } from '@fastify/auth'
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
	ZodTypeProvider,
	createJsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import type http from 'node:http'
import { nonUserGuard } from './core/guards/nonUser.js'
import { tokenGuard } from './core/guards/token.js'
import { registerDependencies } from './infrastructure/parentDiConfig.js'
import { env } from './env.js'
import { getRoutes } from './modules/routes.js'
import { AppInstance } from './core/types/index.js'

export const getApp = async (): Promise<AppInstance> => {
	const app = fastify<http.Server, http.IncomingMessage, http.ServerResponse>({
		logger: {
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
				},
			},
		},
	})

	app.setValidatorCompiler(validatorCompiler)
	app.setSerializerCompiler(serializerCompiler)

	await app.register(fastifyCors, {
		origin: 'http://localhost:5174',
		credentials: true,
		methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
	})

	await app.register(fastifySwagger, {
		transform: createJsonSchemaTransform({
			skipList: [
				'/documentation',
				'/documentation/initOAuth',
				'/documentation/json',
				'/documentation/uiConfig',
				'/documentation/yaml',
				'/documentation/*',
				'/documentation/static/*',
				'*',
			],
		}),
		openapi: {
			info: {
				title: 'Awesome LMS Backend',
				description: 'Sample backend',
				version: '0.0.0',
			},
		},
	})

	await app.register(fastifySwaggerUi, {
		routePrefix: '/api',
	})

	await app.register(fastifyHelmet)

	await app.register(fastifyJwt, { secret: env.JWT_SECRET })

	await app.register(fastifyCookie, {
		secret: env.COOKIE_SECRET,
		hook: 'preHandler',
	})

	await app.register(fastifyAwilixPlugin, {
		disposeOnClose: true,
		asyncDispose: true,
		asyncInit: true,
		eagerInject: true,
		disposeOnResponse: true,
	})

	app.decorate('authentificate', tokenGuard)
	app.decorate('nonUser', nonUserGuard)

	app.addHook('preHandler', (req, res, next) => {
		req.jwt = app.jwt
		return next()
	})

	await app.register(fastifyAuth)

	await app.register(fastifyRateLimit, {
		max: 10,
		ban: 25,
		timeWindow: 15 * 1000,
		allowList: ['127.0.0.1'],
	})

	registerDependencies(diContainer)

	app.after(() => {
		const { routes } = getRoutes(app)

		for (const route of routes) {
			app.withTypeProvider<ZodTypeProvider>().route(route)
		}
	})

	try {
		await app.ready()
	} catch (err) {
		app.log.error('Error while initializing app: ', err)
		throw err
	}

	return app
}
