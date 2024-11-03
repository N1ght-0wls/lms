import { relations } from 'drizzle-orm'
import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { courseRoles } from './course-roles.js'
import { groups } from './groups.js'
import { users } from './users.js'
import { courseGroups } from './course-groups.js'
import { assignmentParticipants } from './assignment-participants.js'
import { participantAssignments } from './participant-assignments.js'

export const participants = pgTable('participants', {
	id: serial().primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	groupId: integer('group_id')
		.notNull()
		.references(() => groups.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	roleId: integer('role_id')
		.notNull()
		.references(() => courseRoles.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
})

export const participantsRelations = relations(
	participants,
	({ one, many }) => ({
		role: one(courseRoles, {
			fields: [participants.roleId],
			references: [courseRoles.id],
		}),
		user: one(users, {
			fields: [participants.userId],
			references: [users.id],
		}),
		group: one(courseGroups, {
			fields: [participants.groupId],
			references: [courseGroups.id],
		}),
		assigmentGroups: many(assignmentParticipants),
		assigments: many(participantAssignments),
	}),
)
