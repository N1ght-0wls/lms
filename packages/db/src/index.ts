import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from './env.js'
import * as schema from './schemas/index.js'
import { roles, userRoles, users } from './schemas/index.js'
import { eq } from 'drizzle-orm'

const queryClient = postgres(env.DATABASE_URL)

const client = drizzle(queryClient, { schema })

const result = await client
	.select()
	.from(users)
	.leftJoin(userRoles, eq(users.id, userRoles.userId))
	.leftJoin(roles, eq(userRoles.roleId, roles.id))
	.where(eq(users.id, 1))

console.log({
	...result[0]?.users,
	roles: result.map((item) => item.roles?.name),
})

export * from './types.js'
export * from './schemas/index.js'
export { client, queryClient }
