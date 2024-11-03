import {
	boolean,
	integer,
	pgTable,
	serial,
	text,
	time,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'
import { themes } from './themes.js'

export const tests = pgTable('tests', {
	id: serial().primaryKey(),
	expiredAt: timestamp('expired_at', { withTimezone: true }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	timeToComplete: time('time_to_complete').notNull(),
	areAttempsVisible: boolean('are_attemps_visible').notNull(),
	themeId: integer('theme_id')
		.notNull()
		.references(() => themes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})
