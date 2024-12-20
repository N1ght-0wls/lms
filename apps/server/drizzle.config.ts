import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './dist/db/index.js',
	dialect: 'postgresql',
	out: './drizzle',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	casing: 'snake_case',
	verbose: true,
	strict: true,
})
