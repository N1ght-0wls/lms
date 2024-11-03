import {
	integer,
	numeric,
	pgTable,
	serial,
	text,
	varchar,
} from 'drizzle-orm/pg-core'
import { tests } from './tests.js'
import { relations } from 'drizzle-orm'
import { answers } from './answers.js'

export const questions = pgTable('questions', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	type: varchar({ length: 255 }).notNull(),
	maxGrade: numeric({ precision: 2, scale: 1 }).notNull(),
	testId: integer('test_id')
		.notNull()
		.references(() => tests.id),
})

export const questionsRelations = relations(questions, ({ one, many }) => ({
	test: one(tests, {
		fields: [questions.testId],
		references: [tests.id],
	}),
	answers: many(answers),
}))
