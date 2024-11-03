import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { courseGroups } from './course-groups.js'

export const groups = pgTable('groups', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
})

export const groupsRelations = relations(groups, ({ many }) => ({
	courses: many(courseGroups),
}))
