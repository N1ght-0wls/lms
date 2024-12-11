import { env } from '@/env.js'
import {
	AuthConfig,
	Config,
	DbConfig,
	SupabaseConfig,
} from '@/core/interfaces/config.js'

const getAuthConfig = (): AuthConfig => ({
	memoryCost: env.MEMORY_COST,
	timeCost: env.TIME_COST,
	outputLength: env.OUTPUT_LENGTH,
	parallelism: env.PARALLELISM,
	jwtSecret: env.JWT_SECRET,
	cookieSecret: env.COOKIE_SECRET,
})

const getDbConfig = (): DbConfig => ({
	url: env.DATABASE_URL,
})

export const getSupabaseConfig = (): SupabaseConfig => ({
	url: env.SUPABASE_URL,
	key: env.SUPABASE_KEY,
})

const getConfig = (): Config => ({
	auth: getAuthConfig(),
	db: getDbConfig(),
	supabase: getSupabaseConfig(),
})

export { getConfig }
