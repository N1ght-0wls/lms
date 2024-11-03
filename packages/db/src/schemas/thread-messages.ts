import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'
import { participants } from './participants.js'
import { threads } from './threads.js'
import { relations } from 'drizzle-orm'

export const threadMessages = pgTable('thread_messages', {
	id: serial().primaryKey(),
	name: text().notNull(),
	authorId: integer('author_id')
		.notNull()
		.references(() => participants.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	threadId: integer('thread_id')
		.notNull()
		.references(() => threads.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const threadMessagesRelations = relations(threadMessages, ({ one }) => ({
	author: one(participants, {
		fields: [threadMessages.authorId],
		references: [participants.id],
	}),
	thread: one(threads, {
		fields: [threadMessages.threadId],
		references: [threads.id],
	}),
}))
