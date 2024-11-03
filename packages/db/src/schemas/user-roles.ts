import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { users } from './users.js'
import { roles } from './roles.js'
import { relations } from 'drizzle-orm'

export const userRoles = pgTable('user_roles', {
	id: serial().primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	roleId: integer('role_id')
		.notNull()
		.references(() => roles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const userRolesRelations = relations(userRoles, ({ one }) => ({
	user: one(users, {
		fields: [userRoles.userId],
		references: [users.id],
	}),
	role: one(roles, {
		fields: [userRoles.roleId],
		references: [roles.id],
	}),
}))
