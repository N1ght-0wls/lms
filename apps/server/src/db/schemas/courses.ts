import { relations, sql } from 'drizzle-orm'
import {
	boolean,
	check,
	integer,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { courseParticipants } from './courseParticipants.js'
import { starredCourses } from './starredCourses.js'

export const courses = pgTable(
	'courses',
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		startedAt: timestamp({ withTimezone: true }).notNull(),
		endedAt: timestamp({ withTimezone: true }).notNull(),
		name: varchar({ length: 255 }).unique().notNull(),
		img: varchar({ length: 255 }).notNull(),
		areForumsEnabled: boolean().notNull().default(true),
		areAnnouncementsEnabled: boolean().notNull().default(true),
	},
	(table) => [
		check('course-timestamp-check', sql`${table.endedAt} > ${table.startedAt}`),
	],
)

export const coursesRelations = relations(courses, ({ many }) => ({
	participants: many(courseParticipants),
	starredBy: many(starredCourses),
}))
