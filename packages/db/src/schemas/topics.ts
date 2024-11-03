import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { courses } from './courses.js'
import { relations } from 'drizzle-orm'
import { themes } from './themes.js'

export const topics = pgTable('topics', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	img: varchar({ length: 255 }).notNull(),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const topicsRelations = relations(topics, ({ one, many }) => ({
	course: one(courses, {
		fields: [topics.courseId],
		references: [courses.id],
	}),
	themes: many(themes),
}))
