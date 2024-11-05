import { CommonDependencies } from '@/interfaces/index.js'
import { AwilixContainer, NameAndRegistrationPair } from 'awilix'
import { resolveCommonDependencies } from './commonDiConfig.js'

type Dependencies = CommonDependencies

type DiConfig = NameAndRegistrationPair<Dependencies>

export const registerDependencies = (diContainer: AwilixContainer): void => {
	const diConfig: DiConfig = {
		...resolveCommonDependencies(),
	}

	diContainer.register(diConfig)
}

declare module '@fastify/awilix' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface Cradle extends Dependencies {}

	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface RequestCradle extends Dependencies {}
}
