import { SINGLETON_CONFIG } from '@/core/constants/config.js'
import { CommonDependencies } from '@/core/interfaces/index.js'
import { Lifetime, NameAndRegistrationPair, asFunction } from 'awilix'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { getConfig } from './config.js'
import * as schema from '@/db/index.js'
import { createClient } from '@supabase/supabase-js'

export const resolveCommonDependencies =
	(): NameAndRegistrationPair<CommonDependencies> => ({
		config: asFunction(() => getConfig(), SINGLETON_CONFIG),
		db: asFunction(
			({ config }: CommonDependencies) => {
				const queryClient = postgres(config.db.url)

				const client = drizzle(queryClient, {
					schema,
					casing: 'snake_case',
					logger: true,
				})

				return {
					client,
					connection: queryClient,
				}
			},
			{
				dispose: ({ connection }) => {
					connection.end()
				},
				lifetime: Lifetime.SINGLETON,
			},
		),
		supabase: asFunction(({ config }: CommonDependencies) => {
			const { url, key } = config.supabase

			return createClient(url, key)
		}),
	})
