import 'dotenv/config'
import { getApp } from './app.js'
import { env } from './env.js'
import { JWT } from '@fastify/jwt'
import { JwtPayload } from '@awesome-lms/shared'

const bootstrap = async () => {
	try {
		const app = await getApp()

		app.listen({
			port: env.PORT,
			host: '0.0.0.0',
		})
	} catch (error: unknown) {
		console.warn(error)
		process.exit(1)
	}
}

void bootstrap()

declare module 'fastify' {
	interface FastifyRequest {
		jwt: JWT
	}

	export interface FastifyInstance {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		authentificate: any
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		isAdmin: any
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		isEmployer: any
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		nonUser: any
	}
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: JwtPayload
	}
}
