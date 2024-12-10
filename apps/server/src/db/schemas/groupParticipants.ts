import { baseTableAttrs } from '@/core/utils/db.js'
import { integer, pgTable } from 'drizzle-orm/pg-core'
import { users } from './users.js'
import { groups } from './groups.js'

const { id } = baseTableAttrs

export const groupParticipants = pgTable('group_participants', {
	id,
	userId: integer()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	groupId: integer()
		.notNull()
		.references(() => groups.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})
