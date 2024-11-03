import {
	boolean,
	integer,
	numeric,
	pgTable,
	serial,
	timestamp,
} from 'drizzle-orm/pg-core'
import { assignments } from './assignments.js'
import { relations, sql } from 'drizzle-orm'
import { participants } from './participants.js'

export const participantAssignments = pgTable('participant_assignments', {
	id: serial().primaryKey(),
	submittedAt: timestamp('submitted_at', { withTimezone: true })
		.notNull()
		.defaultNow(),
	isReturned: boolean('is_returned').notNull().default(false),
	grade: numeric({ precision: 3, scale: 1 }).default(sql`NULL`),
	assigmentId: integer('assigment_id')
		.notNull()
		.references(() => assignments.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	participantId: integer('assigment_id')
		.notNull()
		.references(() => assignments.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
})

export const participantAssignmentsRelations = relations(
	participantAssignments,
	({ one }) => ({
		assigment: one(assignments, {
			fields: [participantAssignments.assigmentId],
			references: [assignments.id],
		}),
		participant: one(participants, {
			fields: [participantAssignments.participantId],
			references: [participants.id],
		}),
	}),
)
