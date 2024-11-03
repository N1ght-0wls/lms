import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { userRoles } from './user-roles.js'
import { participants } from './participants.js'

export const users = pgTable('users', {
	id: serial().primaryKey(),
	username: varchar({ length: 255 }).unique().notNull(),
	email: varchar({ length: 255 }).unique().notNull(),
	password: varchar({ length: 255 }).notNull(),
	img: varchar({ length: 255 }).notNull(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
	roles: many(userRoles),
	courses: many(participants),
}))
