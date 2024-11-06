import { asClass } from 'awilix'
import { UsersDiConfig } from './types/index.js'
import { UsersRepository } from './repositories/UsersRepository.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveUsersModule = (): UsersDiConfig => ({
	usersRepository: asClass(UsersRepository, SINGLETON_CONFIG),
})
