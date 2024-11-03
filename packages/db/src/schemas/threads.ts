import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { forums } from './forums.js'
import { participants } from './participants.js'
import { relations } from 'drizzle-orm'

export const threads = pgTable('threads', {
	id: serial().primaryKey(),
	closedAt: timestamp('closed_at', { withTimezone: true }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	message: text().notNull(),
	forumId: integer('forum_id')
		.notNull()
		.references(() => forums.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	authorId: integer('author_id')
		.notNull()
		.references(() => participants.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
})

export const threadsRelations = relations(threads, ({ one }) => ({
	course: one(forums, {
		fields: [threads.forumId],
		references: [forums.id],
	}),
	author: one(participants, {
		fields: [threads.authorId],
		references: [participants.id],
	}),
}))
