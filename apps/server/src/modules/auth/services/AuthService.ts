import { AuthConfig } from '@/interfaces/config.js'
import { hash, verify } from '@node-rs/argon2'
import { IAuthService } from '../interfaces/index.js'
import { AuthInjectableDependencies } from '../types/index.js'

export class AuthService implements IAuthService {
	private readonly config: AuthConfig

	constructor({ config }: AuthInjectableDependencies) {
		this.config = config.auth
	}

	async generateHash(password: string): Promise<string> {
		const { outputLength, ...rest } = this.config

		return hash(password, {
			outputLen: outputLength,
			...rest,
		})
	}

	async verifyPassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		const { outputLength, ...rest } = this.config

		return verify(hashedPassword, password, {
			outputLen: outputLength,
			...rest,
		})
	}
}
