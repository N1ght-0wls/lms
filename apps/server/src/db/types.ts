import { courses } from './schemas/courses.js'
import { users } from './schemas/users.js'

type User = typeof users.$inferSelect
type Course = typeof courses.$inferSelect

export type { Course, User }
