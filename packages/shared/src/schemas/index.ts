import { z } from 'zod'

export const GET_BY_ID_SCHEMA = z.object({
	id: z.coerce.number().min(1),
})

export type GET_BY_ID_SCHEMA_TYPE = z.infer<typeof GET_BY_ID_SCHEMA>

export * from './auth.js'
export * from './courses.js'
