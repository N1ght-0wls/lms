import { z } from 'zod'

export const envSchema = z.object({
	DATABASE_URL: z.string(),
	PORT: z.coerce.number().min(1000),
	MEMORY_COST: z.coerce.number().positive(),
	TIME_COST: z.coerce.number().positive(),
	OUTPUT_LENGTH: z.coerce.number().positive(),
	PARALLELISM: z.coerce.number().min(1),
	JWT_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
	SUPABASE_URL: z.string(),
	SUPABASE_KEY: z.string(),
})

const env = envSchema.parse(process.env)

export { env }
