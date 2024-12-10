import { BaseDiConfig, InjectableDependencies } from '@/core/types/index.js'
import { AuthModuleDependencies } from '../interfaces/index.js'

type AuthInjectableDependencies = InjectableDependencies<AuthModuleDependencies>

type AuthDiConfig = BaseDiConfig<AuthModuleDependencies>

export type { AuthInjectableDependencies, AuthDiConfig }
