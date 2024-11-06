interface AuthConfig {
	memoryCost: number
	timeCost: number
	outputLength: number
	parallelism: number
	jwtSecret: string
	cookieSecret: string
}

interface Config {
	auth: AuthConfig
}

export type { AuthConfig, Config }
