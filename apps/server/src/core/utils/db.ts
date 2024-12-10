import { timestamp } from 'drizzle-orm/pg-core'
import { integer } from 'drizzle-orm/pg-core'

const baseTableAttrs = {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp({ withTimezone: true }).notNull(),
	updatedAt: timestamp({ withTimezone: true }).notNull(),
}

export { baseTableAttrs }
