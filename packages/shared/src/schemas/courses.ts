import { z } from 'zod'

const CREATE_COURSE_SCHEMA = z.object({
	name: z.string().min(4).max(100),
	startedAt: z.string(),
	endedAt: z.string(),
	areForumsEnabled: z.boolean(),
	areAnnouncementsEnabled: z.boolean(),
	teachers: z.number().array(),
	groups: z.number().array(),
})

type CREATE_COURSE_SCHEMA_TYPE = z.infer<typeof CREATE_COURSE_SCHEMA>

export { CREATE_COURSE_SCHEMA }
export type { CREATE_COURSE_SCHEMA_TYPE }
