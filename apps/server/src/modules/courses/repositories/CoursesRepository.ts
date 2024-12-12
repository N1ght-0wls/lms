import { HttpError } from '@/core/interfaces/index.js'
import { DatabaseClient } from '@/core/types/index.js'
import { Failure, Result, Success } from '@/core/utils/result.js'
import { courses, starredCourses } from '@/db/index.js'
import { Course } from '@/db/types.js'
import { CREATE_COURSE_SCHEMA_TYPE } from '@awesome-lms/shared'
import { and, eq, sql } from 'drizzle-orm'
import { ICoursesRepository } from '../interfaces/index.js'
import { CoursesInjectableDependencies } from '../types/index.js'

export class CoursesRepository implements ICoursesRepository {
	private readonly db: DatabaseClient

	constructor({ db }: CoursesInjectableDependencies) {
		this.db = db.client
	}

	async findOne(id: number): Promise<Result<Course, HttpError>> {
		const result = await this.db
			.select()
			.from(courses)
			.where(eq(courses.id, id))

		const course = result.at(0)

		if (!course) {
			return Failure<HttpError>({
				status: 404,
				message: 'Course with such id not found',
			})
		}

		return Success(course)
	}

	async createOne(
		data: CREATE_COURSE_SCHEMA_TYPE,
	): Promise<Result<Course, HttpError>> {
		try {
			const result = await this.db.transaction(async (tx) => {
				const { teachers, groups, startedAt, endedAt, ...rest } = data

				const r = await tx
					.insert(courses)
					.values({
						...rest,
						img: '/',
						startedAt: new Date(startedAt),
						endedAt: new Date(endedAt),
					})
					.returning()

				const course = r.at(0) as Course

				const teachersQuery = sql`
					insert into course_participants (user_id, role, course_id)
					select u.id, 'teacher' as role, ${course.id} as course_id
					from users u
					where u.id in (${teachers.join(',')})
				`

				await tx.execute(teachersQuery)

				const studentsQuery = sql`
					insert into course_participants (user_id, group_id, course_id)
					select gp.user_id, gp.group_id, ${course.id} as course_id
					from group_participants gp
					where gp.group_id in (${groups.join(',')})
				`

				await tx.execute(studentsQuery)

				return course
			})

			return Success(result)
		} catch (e) {
			console.log(e)

			return Failure<HttpError>({
				status: 500,
				message: 'Something went wrong',
			})
		}
	}

	async starOne(id: number, userId: number): Promise<void> {
		await this.db.insert(starredCourses).values({ courseId: id, userId })
	}

	async unstarOne(id: number, userId: number): Promise<void> {
		await this.db
			.delete(starredCourses)
			.where(
				and(eq(starredCourses.courseId, id), eq(starredCourses.userId, userId)),
			)
	}
}
