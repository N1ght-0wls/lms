import { SQL, eq } from 'drizzle-orm'
import { DatabaseClient, User, roles, userRoles, users } from '@awesome-lms/db'
import { IUsersRepository } from '../interfaces/index.js'
import { UsersInjectableDependencies } from '../types/index.js'
import { CREATE_USER_SCHEMA_TYPE, Role } from '@awesome-lms/shared'

export class UsersRepository implements IUsersRepository {
	private readonly db: DatabaseClient

	constructor({ db }: UsersInjectableDependencies) {
		this.db = db.client
	}

	async findOne(id: number): Promise<User | null> {
		return this.findOneBy(eq(users.id, id))
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return this.findOneBy(eq(users.email, email))
	}

	async createOne(data: CREATE_USER_SCHEMA_TYPE): Promise<User | null> {
		const hasFirst = await this.db.select().from(users).limit(1)

		const result = await this.db
			.insert(users)
			.values({ ...data, img: '/' })
			.returning()

		const user = result.at(0)

		if (!user) return null

		const roleId = hasFirst.length ? 2 : 1

		await this.db.insert(userRoles).values({ userId: user.id, roleId })

		return {
			...user,
			roles: [hasFirst.length ? 'user' : 'admin'],
		}
	}

	private async findOneBy(condition: SQL<unknown>): Promise<User | null> {
		const result = await this.db
			.select()
			.from(users)
			.leftJoin(userRoles, eq(users.id, userRoles.userId))
			.leftJoin(roles, eq(userRoles.roleId, roles.id))
			.where(condition)

		if (!result.length) return null

		return {
			...result[0]?.users,
			roles: result.map((item) => item.roles?.name as Role),
		} as User
	}
}
