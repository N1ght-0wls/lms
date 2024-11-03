import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { topics } from './topics.js'
import { relations } from 'drizzle-orm'
import { tests } from './tests.js'
import { assignments } from './assignments.js'
import { materials } from './materials.js'

export const themes = pgTable('themes', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	img: varchar({ length: 255 }).notNull(),
	topicId: integer('topic_id')
		.notNull()
		.references(() => topics.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const themesRelations = relations(themes, ({ one, many }) => ({
	topic: one(topics, {
		fields: [themes.topicId],
		references: [topics.id],
	}),
	tests: many(tests),
	assignments: many(assignments),
	materials: many(materials),
}))
