import { BaseDiConfig, InjectableDependencies } from '@/core/types/index.js'
import { UsersModuleDependencies } from '../interfaces/index.js'

type UsersInjectableDependencies =
	InjectableDependencies<UsersModuleDependencies>

type UsersDiConfig = BaseDiConfig<UsersModuleDependencies>

export type { UsersDiConfig, UsersInjectableDependencies }
