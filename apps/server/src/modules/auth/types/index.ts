import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { AuthModuleDependencies } from '../interfaces/index.js'

type AuthInjectableDependencies = InjectableDependencies<AuthModuleDependencies>

type AuthDiConfig = BaseDiConfig<AuthModuleDependencies>

export type { AuthInjectableDependencies, AuthDiConfig }
