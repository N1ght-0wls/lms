import { CommonDependencies } from '@/interfaces/index.js'
import { NameAndRegistrationPair, asFunction } from 'awilix'
import { client, queryClient } from '@awesome-lms/db'

export const resolveCommonDependencies =
	(): NameAndRegistrationPair<CommonDependencies> => ({
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
