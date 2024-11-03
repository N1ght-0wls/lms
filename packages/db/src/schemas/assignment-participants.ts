import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { assignmentGroups } from './assignment-groups.js'
import { relations } from 'drizzle-orm'
import { participants } from './participants.js'

export const assignmentParticipants = pgTable('assignment_participants', {
	id: serial().primaryKey(),
	groupId: integer('group_id')
		.notNull()
		.references(() => assignmentGroups.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	participantId: integer('participant_id')
		.notNull()
		.references(() => participants.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
})

export const assignmentParticipantsRelations = relations(
	assignmentParticipants,
	({ one }) => ({
		group: one(assignmentGroups, {
			fields: [assignmentParticipants.groupId],
			references: [assignmentGroups.id],
		}),
		participant: one(participants, {
			fields: [assignmentParticipants.participantId],
			references: [participants.id],
		}),
	}),
)
