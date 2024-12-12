import { CommonDependencies } from '@/core/interfaces/index.js'
import { AwilixContainer, NameAndRegistrationPair } from 'awilix'
import { resolveCommonDependencies } from './commonDiConfig.js'
import { resolveUsersModule } from '@/modules/users/index.js'
import { UsersModuleDependencies } from '@/modules/users/interfaces/index.js'
import { AuthModuleDependencies } from '@/modules/auth/interfaces/index.js'
import { resolveAuthModule } from '@/modules/auth/index.js'
import { resolveCoursesModule } from '@/modules/courses/index.js'
import { CoursesModuleDependencies } from '@/modules/courses/interfaces/index.js'

type Dependencies = CommonDependencies &
	UsersModuleDependencies &
	AuthModuleDependencies &
	CoursesModuleDependencies

type DiConfig = NameAndRegistrationPair<Dependencies>

export const registerDependencies = (diContainer: AwilixContainer): void => {
	const diConfig: DiConfig = {
		...resolveCommonDependencies(),
		...resolveUsersModule(),
		...resolveAuthModule(),
		...resolveCoursesModule(),
	}

	diContainer.register(diConfig)
}

declare module '@fastify/awilix' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface Cradle extends Dependencies {}

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface RequestCradle extends Dependencies {}
}
