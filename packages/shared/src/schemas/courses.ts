import { z } from 'zod'

const CREATE_COURSE_SCHEMA = z.object({
	name: z.string().min(4).max(100),
	startedAt: z.string(),
	endedAt: z.string(),
	areForumsEnabled: z.boolean(),
	areAnnouncementsEnabled: z.boolean(),
	teachers: z.number().array().nonempty(),
	groups: z.number().array().nonempty(),
})

type CREATE_COURSE_SCHEMA_TYPE = z.infer<typeof CREATE_COURSE_SCHEMA>

const COURSES_QUERY_SCHEMA = z
	.object({
		active: z.enum(['true', 'false']).transform((val) => val === 'true'),
	})
	.optional()

type COURSES_QUERY_SCHEMA_TYPE = z.infer<typeof COURSES_QUERY_SCHEMA>

export { CREATE_COURSE_SCHEMA, COURSES_QUERY_SCHEMA }
export type { CREATE_COURSE_SCHEMA_TYPE, COURSES_QUERY_SCHEMA_TYPE }
