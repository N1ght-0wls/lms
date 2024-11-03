import { z } from 'zod'

export const ENV_SCHEMA = z.object({
	DATABASE_URL: z.string(),
})

const env = ENV_SCHEMA.parse(process.env)

export { env }
