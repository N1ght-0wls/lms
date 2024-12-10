import { users } from './schemas/users.js'

type User = typeof users.$inferSelect

export type { User }
