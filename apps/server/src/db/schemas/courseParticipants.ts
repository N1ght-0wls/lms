import { baseTableAttrs } from '@/core/utils/db.js'
import { integer, pgEnum, pgTable } from 'drizzle-orm/pg-core'
import { users } from './users.js'
import { groups } from './groups.js'
import { courses } from './courses.js'

const { id } = baseTableAttrs

export const courseRolesEnum = pgEnum('course_roles', ['student', 'teacher'])

export const courseParticipants = pgTable('course_participants', {
	id,
	userId: integer()
		.notNull()
		.references(() => users.id),
	groupId: integer().references(() => groups.id),
	courseId: integer()
		.notNull()
		.references(() => courses.id),
})
