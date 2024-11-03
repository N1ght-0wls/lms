import { boolean, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { questions } from './questions.js'
import { relations } from 'drizzle-orm'

export const answers = pgTable('answers', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	isCorrect: boolean('is_correct').notNull(),
	questionId: integer('question_id')
		.notNull()
		.references(() => questions.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
})

export const answersRelations = relations(answers, ({ one }) => ({
	question: one(questions, {
		fields: [answers.questionId],
		references: [questions.id],
	}),
}))
