import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from './env.js'
import * as schema from './schemas/index.js'

const queryClient = postgres(env.DATABASE_URL)

const client = drizzle(queryClient, { schema })

export * from './types.js'
export { client, queryClient }
