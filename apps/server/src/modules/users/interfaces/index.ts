import { Result } from '@/core/utils/result.js'
import { Course, User } from '@/db/types.js'
import {
	COURSES_QUERY_SCHEMA_TYPE,
	CREATE_USER_SCHEMA_TYPE,
	Role,
} from '@awesome-lms/shared'

interface FindCoursesArgs {
	id: number
	role: Role
	query: COURSES_QUERY_SCHEMA_TYPE
}

interface IUsersRepository {
	findOne: (id: number) => Promise<Result<User, null>>
	findOneByEmail: (email: string) => Promise<Result<User, null>>
	findCourses: (args: FindCoursesArgs) => Promise<Course[]>
	findStarredCourses: (id: number) => Promise<Course[]>
	createOne: (data: CREATE_USER_SCHEMA_TYPE) => Promise<Result<User, null>>
}

interface UsersModuleDependencies {
	usersRepository: IUsersRepository
}

export type { IUsersRepository, UsersModuleDependencies, FindCoursesArgs }
