import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { courses } from './courses.js'
import { groups } from './groups.js'
import { relations } from 'drizzle-orm'
import { participants } from './participants.js'

export const courseGroups = pgTable('course_groups', {
	id: serial().primaryKey(),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id),
	groupId: integer('group_id')
		.notNull()
		.references(() => groups.id),
})

export const courseGroupsRelations = relations(
	courseGroups,
	({ one, many }) => ({
		course: one(courses, {
			fields: [courseGroups.courseId],
			references: [courses.id],
		}),
		group: one(groups, {
			fields: [courseGroups.groupId],
			references: [groups.id],
		}),
		participants: many(participants),
	}),
)
