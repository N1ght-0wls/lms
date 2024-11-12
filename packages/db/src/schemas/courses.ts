import { relations, sql } from 'drizzle-orm'
import {
	boolean,
	check,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { courseGroups } from './course-groups.js'
import { topics } from './topics.js'
import { forums } from './forums.js'
import { announcements } from './announcements.js'

export const courses = pgTable(
	'courses',
	{
		id: serial().primaryKey(),
		startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
		endedAt: timestamp('ended_at', { withTimezone: true }).notNull(),
		name: varchar({ length: 255 }).unique().notNull(),
		img: varchar({ length: 255 }).notNull(),
		areForumsEnabled: boolean('are_forums_enabled').notNull().default(true),
		areAnnouncementsEnabled: boolean('are_announcements_enabled')
			.notNull()
			.default(true),
	},
	(table) => ({
		checkConstrait: check(
			'course-timestamp-check',
			sql`${table.endedAt} > ${table.startedAt}`,
		),
	}),
)

export const coursesRelations = relations(courses, ({ many }) => ({
	groups: many(courseGroups),
	topics: many(topics),
	forums: many(forums),
	announcements: many(announcements),
}))
