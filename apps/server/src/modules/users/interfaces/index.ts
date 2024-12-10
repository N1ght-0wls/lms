import { Result } from '@/core/utils/result.js'
import { User } from '@/db/types.js'
import { CREATE_USER_SCHEMA_TYPE } from '@awesome-lms/shared'

interface IUsersRepository {
	findOne: (id: number) => Promise<Result<User, null>>
	findOneByEmail: (email: string) => Promise<Result<User, null>>
	createOne: (data: CREATE_USER_SCHEMA_TYPE) => Promise<Result<User, null>>
}

interface UsersModuleDependencies {
	usersRepository: IUsersRepository
}

export type { IUsersRepository, UsersModuleDependencies }
