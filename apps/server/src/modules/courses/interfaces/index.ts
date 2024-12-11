import { HttpError } from '@/core/interfaces/index.js'
import { Result } from '@/core/utils/result.js'
import { Course } from '@/db/types.js'
import { CREATE_COURSE_SCHEMA_TYPE } from '@awesome-lms/shared'

interface ICoursesRepository {
	findOne: (id: number) => Promise<Result<Course, HttpError>>
	createOne: (
		data: CREATE_COURSE_SCHEMA_TYPE,
	) => Promise<Result<Course, HttpError>>
}

interface CoursesModuleDependencies {
	coursesRepository: ICoursesRepository
}

export type { ICoursesRepository, CoursesModuleDependencies }
