import { asClass } from 'awilix'
import { AuthDiConfig } from './types/index.js'
import { AuthService } from './services/AuthService.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveAuthModule = (): AuthDiConfig => ({
	authService: asClass(AuthService, SINGLETON_CONFIG),
})
