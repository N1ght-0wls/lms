import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { participants } from './participants.js'

export const courseRoles = pgTable('course_roles', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
})

export const courseRolesRelations = relations(courseRoles, ({ many }) => ({
	participants: many(participants),
}))
