import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { assignmentParticipants } from './assignment-participants.js'
import { assignments } from './assignments.js'

export const assignmentGroups = pgTable('assigment_groups', {
	id: serial().primaryKey(),
	assigmentId: integer('assigment_id')
		.notNull()
		.references(() => assignments.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
})

export const assignmentGroupsRelations = relations(
	assignmentGroups,
	({ one, many }) => ({
		assigment: one(assignments, {
			fields: [assignmentGroups.assigmentId],
			references: [assignments.id],
		}),
		participants: many(assignmentParticipants),
	}),
)
