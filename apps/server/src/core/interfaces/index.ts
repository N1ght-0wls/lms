import * as schema from '@/db/index.js'
import { AppInstance, Route } from '@/core/types/index.js'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { Sql } from 'postgres'
import { Config } from './config.js'
import { SupabaseClient } from '@supabase/supabase-js'

interface CommonDependencies {
	db: {
		connection: Sql
		client: PostgresJsDatabase<typeof schema>
	}
	config: Config
	supabase: SupabaseClient
}

interface ExternalDependencies {
	app: AppInstance
}

interface HttpError {
	status: number
	message: string
}

interface Routes {
	routes: Route[]
}

export type { CommonDependencies, ExternalDependencies, Routes, HttpError }
