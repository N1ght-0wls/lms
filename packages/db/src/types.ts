import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { users } from './schemas/users.js'
import * as schema from './schemas/index.js'
import type { Sql } from 'postgres'

type DatabaseClient = PostgresJsDatabase<typeof schema>

type User = typeof users.$inferSelect

export type { DatabaseClient, User, Sql }
