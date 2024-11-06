import { AppInstanse, Route } from '@/types/index.js'
import { DatabaseClient, Sql } from '@awesome-lms/db'
import { Config } from './config.js'

interface CommonDependencies {
	db: {
		connection: Sql
		client: DatabaseClient
	}
	config: Config
}

interface ExternalDependencies {
	app: AppInstanse
}

interface Routes {
	routes: Route[]
}

export type { CommonDependencies, ExternalDependencies, Routes }
