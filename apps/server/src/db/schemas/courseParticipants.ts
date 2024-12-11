import { baseTableAttrs } from '@/core/utils/db.js'
import { integer, pgEnum, pgTable } from 'drizzle-orm/pg-core'
import { users } from './users.js'
import { groups } from './groups.js'
import { courses } from './courses.js'
import { relations } from 'drizzle-orm'

const { id } = baseTableAttrs

export const courseRolesEnum = pgEnum('course_roles', ['student', 'teacher'])

export const courseParticipants = pgTable('course_participants', {
	id,
	userId: integer()
		.notNull()
		.references(() => users.id),
	groupId: integer().references(() => groups.id, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
	courseId: integer()
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	role: courseRolesEnum().notNull().default('student'),
})

export const courseParticipantsRelations = relations(
	courseParticipants,
	({ one }) => ({
		user: one(users, {
			fields: [courseParticipants.userId],
			references: [users.id],
		}),
		group: one(groups, {
			fields: [courseParticipants.groupId],
			references: [groups.id],
		}),
		course: one(courses, {
			fields: [courseParticipants.courseId],
			references: [courses.id],
		}),
	}),
)
