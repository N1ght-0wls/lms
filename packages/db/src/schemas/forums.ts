import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { courses } from './courses.js'
import { relations } from 'drizzle-orm'
import { threads } from './threads.js'

export const forums = pgTable('forums', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const forumsRelations = relations(forums, ({ one, many }) => ({
	course: one(courses, {
		fields: [forums.courseId],
		references: [courses.id],
	}),
	threads: many(threads),
}))
