import type { Role } from '../types/auth.js'

interface AuthTokens {
	access_token: string
}

interface JwtPayload {
	id: number
	email: string
	username: string
	role: Role
}

export type { AuthTokens, JwtPayload }
