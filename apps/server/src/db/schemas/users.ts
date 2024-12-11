import { baseTableAttrs } from '@/core/utils/db.js'
import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { courseParticipants } from './courseParticipants.js'
import { groupParticipants } from './groupParticipants.js'
import { starredCourses } from './starredCourses.js'

const { id } = baseTableAttrs

export const rolesEnum = pgEnum('roles', ['user', 'teacher', 'admin'])

export const users = pgTable('users', {
	id,
	username: varchar({ length: 255 }).unique().notNull(),
	email: varchar({ length: 255 }).unique().notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: rolesEnum().notNull().default('user'),
	img: varchar({ length: 255 }).notNull(),
	firstName: varchar({ length: 255 }).notNull(),
	lastName: varchar({ length: 255 }).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
	groups: many(groupParticipants),
	courses: many(courseParticipants),
	starredCourses: many(starredCourses),
}))
