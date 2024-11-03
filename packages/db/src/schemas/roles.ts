import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { userRoles } from './user-roles.js'

export const roles = pgTable('roles', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).unique().notNull(),
})

export const rolesRelations = relations(roles, ({ many }) => ({
	users: many(userRoles),
}))
