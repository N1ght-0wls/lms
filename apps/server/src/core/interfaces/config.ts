interface AuthConfig {
	memoryCost: number
	timeCost: number
	outputLength: number
	parallelism: number
	jwtSecret: string
	cookieSecret: string
}

interface DbConfig {
	url: string
}

interface SupabaseConfig {
	url: string
	key: string
}

interface Config {
	auth: AuthConfig
	db: DbConfig
	supabase: SupabaseConfig
}

export type { AuthConfig, Config, DbConfig, SupabaseConfig }
