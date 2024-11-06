import { CommonDependencies } from '@/interfaces/index.js'
import { NameAndRegistrationPair, asFunction } from 'awilix'
import { client, queryClient } from '@awesome-lms/db'
import { getConfig } from './config.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'

export const resolveCommonDependencies =
	(): NameAndRegistrationPair<CommonDependencies> => ({
		config: asFunction(() => getConfig(), SINGLETON_CONFIG),
		db: asFunction(
			() => {
				return {
					client,
					connection: queryClient,
				}
			},
			{
				dispose: ({ connection }) => {
					connection.end()
				},
			},
		),
	})
