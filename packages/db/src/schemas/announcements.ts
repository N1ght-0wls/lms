import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { participants } from './participants.js'
import { courses } from './courses.js'
import { relations } from 'drizzle-orm'

export const announcements = pgTable('announcements', {
	id: serial().primaryKey(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdateFn(() => new Date()),
	name: varchar().notNull(),
	description: text().notNull(),
	authorId: integer('author_id')
		.notNull()
		.references(() => participants.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
})

export const announcementsRelations = relations(announcements, ({ one }) => ({
	course: one(courses, {
		fields: [announcements.courseId],
		references: [courses.id],
	}),
	author: one(participants, {
		fields: [announcements.authorId],
		references: [participants.id],
	}),
}))
