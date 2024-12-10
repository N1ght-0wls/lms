import { User } from '@/db/types.js'
import { CREATE_USER_SCHEMA_TYPE } from '@awesome-lms/shared'

interface IUsersRepository {
	findOne: (id: number) => Promise<User | null>
	findOneByEmail: (email: string) => Promise<User | null>
	createOne: (data: CREATE_USER_SCHEMA_TYPE) => Promise<User | null>
}

interface UsersModuleDependencies {
	usersRepository: IUsersRepository
}

export type { IUsersRepository, UsersModuleDependencies }
