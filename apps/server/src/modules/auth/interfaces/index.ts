interface IAuthService {
	generateHash: (password: string) => Promise<string>
	verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>
}

interface AuthModuleDependencies {
	authService: IAuthService
}

export type { AuthModuleDependencies, IAuthService }
