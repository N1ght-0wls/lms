import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { themes } from './themes.js'
import { relations } from 'drizzle-orm'
import { assignmentGroups } from './assignment-groups.js'
import { participantAssignments } from './participant-assignments.js'

export const assignments = pgTable('assignments', {
	id: serial().primaryKey(),
	expiredAt: timestamp('expired_at', { withTimezone: true }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	maxGrade: integer('max_grade').notNull(),
	themeId: integer('theme_id')
		.notNull()
		.references(() => themes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
	theme: one(themes, {
		fields: [assignments.themeId],
		references: [themes.id],
	}),
	groups: many(assignmentGroups),
	participants: many(participantAssignments),
}))
