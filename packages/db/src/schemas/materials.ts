import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { themes } from './themes.js'
import { relations } from 'drizzle-orm'

export const materials = pgTable('materials', {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	filePath: varchar('file_path', { length: 255 }).notNull(),
	themeId: integer('theme_id')
		.notNull()
		.references(() => themes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const materialsRelations = relations(materials, ({ one }) => ({
	theme: one(themes, {
		fields: [materials.themeId],
		references: [themes.id],
	}),
}))
