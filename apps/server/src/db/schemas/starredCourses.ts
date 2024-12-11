import { baseTableAttrs } from '@/core/utils/db.js'
import { integer, pgTable } from 'drizzle-orm/pg-core'
import { users } from './users.js'
import { courses } from './courses.js'
import { relations } from 'drizzle-orm'

const { id } = baseTableAttrs

export const starredCourses = pgTable('starred_courses', {
	id,
	userId: integer()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	courseId: integer()
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const starredCoursesRelations = relations(starredCourses, ({ one }) => ({
	course: one(courses, {
		fields: [starredCourses.courseId],
		references: [courses.id],
	}),
	user: one(users, {
		fields: [starredCourses.userId],
		references: [users.id],
	}),
}))
