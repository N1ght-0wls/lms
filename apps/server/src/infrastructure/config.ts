import { env } from '@/env.js'
import { AuthConfig, Config, DbConfig } from '@/core/interfaces/config.js'

const getAuthConfig = (): AuthConfig => ({
	memoryCost: env.MEMORY_COST,
	timeCost: env.TIME_COST,
	outputLength: env.OUTPUT_LENGTH,
	parallelism: env.PARALLELISM,
	jwtSecret: env.JWT_SECRET,
	cookieSecret: env.COOKIE_SECRET,
})

const getDbConfig = (): DbConfig => ({
	dbUrl: env.DATABASE_URL,
})

const getConfig = (): Config => ({
	auth: getAuthConfig(),
	db: getDbConfig(),
})

export { getConfig }
