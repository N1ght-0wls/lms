import { AppInstanse, Route } from '@/types/index.js'
import { DatabaseClient, Sql } from '@awesome-lms/db'

interface CommonDependencies {
	db: {
		connection: Sql
		client: DatabaseClient
	}
}

interface ExternalDependencies {
	app: AppInstanse
}

interface Routes {
	routes: Route[]
}

export type { CommonDependencies, ExternalDependencies, Routes }
