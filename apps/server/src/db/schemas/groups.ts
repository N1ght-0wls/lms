import { baseTableAttrs } from '@/core/utils/db.js'
import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { groupParticipants } from './groupParticipants.js'
import { courseParticipants } from './courseParticipants.js'

const { id } = baseTableAttrs

export const groups = pgTable('groups', {
	id,
	name: varchar({ length: 255 }).notNull(),
})

export const groupsRelations = relations(groups, ({ many }) => ({
	participants: many(groupParticipants),
	courses: many(courseParticipants),
}))
