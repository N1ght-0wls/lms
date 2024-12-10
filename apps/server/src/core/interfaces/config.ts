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

interface Config {
	auth: AuthConfig
	db: DbConfig
}

export type { AuthConfig, Config, DbConfig }
