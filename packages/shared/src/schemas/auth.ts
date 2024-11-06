import { z } from 'zod'

const LOGIN_SCHEMA = z.object({
	email: z.string(),
	password: z.string(),
})

type LOGIN_SCHEMA_TYPE = z.infer<typeof LOGIN_SCHEMA>

const CREATE_USER_SCHEMA = z.object({
	username: z.string(),
	email: z.string(),
	password: z.string(),
	firstName: z.string(),
	lastName: z.string(),
})

type CREATE_USER_SCHEMA_TYPE = z.infer<typeof CREATE_USER_SCHEMA>

export type { CREATE_USER_SCHEMA_TYPE, LOGIN_SCHEMA_TYPE }
export { CREATE_USER_SCHEMA, LOGIN_SCHEMA }
