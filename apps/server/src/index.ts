import Fastify from 'fastify'

const fastify = Fastify({
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
			},
		},
	},
})

fastify.get('/', async function handler() {
	return { hello: 'world' }
})

try {
	await fastify.listen({ port: 8080, host: '0.0.0.0' })
} catch (err) {
	fastify.log.error(err)
	process.exit(1)
}
