import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { courseGroups } from './course-groups.js'
import { topics } from './topics.js'
import { forums } from './forums.js'

export const courses = pgTable('courses', {
	id: serial().primaryKey(),
	startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
	endedAt: timestamp('ended_at', { withTimezone: true }).notNull(),
	name: varchar({ length: 255 }).unique().notNull(),
	img: varchar({ length: 255 }).notNull(),
})

export const coursesRelations = relations(courses, ({ many }) => ({
	groups: many(courseGroups),
	topics: many(topics),
	forums: many(forums),
}))
