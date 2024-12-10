import { DatabaseClient } from '@/core/types/index.js'
import { users } from '@/db/index.js'
import { User } from '@/db/types.js'
import { CREATE_USER_SCHEMA_TYPE } from '@awesome-lms/shared'
import { SQL, eq } from 'drizzle-orm'
import { IUsersRepository } from '../interfaces/index.js'
import { UsersInjectableDependencies } from '../types/index.js'
import { Failure, Result, Success } from '@/core/utils/result.js'

export class UsersRepository implements IUsersRepository {
	private readonly db: DatabaseClient

	constructor({ db }: UsersInjectableDependencies) {
		this.db = db.client
	}

	async findOne(id: number): Promise<Result<User, null>> {
		return this.findOneBy(eq(users.id, id))
	}

	async findOneByEmail(email: string): Promise<Result<User, null>> {
		return this.findOneBy(eq(users.email, email))
	}

	async createOne(data: CREATE_USER_SCHEMA_TYPE): Promise<Result<User, null>> {
		try {
			const hasFirst = await this.db.select().from(users).limit(1)

			const result = await this.db
				.insert(users)
				.values({ ...data, img: '/', role: hasFirst ? 'user' : 'admin' })
				.returning()

			const user = result.at(0) as User

			return Success(user)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			return Failure(null)
		}
	}

	private async findOneBy(
		condition: SQL<unknown>,
	): Promise<Result<User, null>> {
		const result = await this.db.select().from(users).where(condition)

		const user = result.at(0)

		if (!user) return Failure(null)

		return Success(user)
	}
}
