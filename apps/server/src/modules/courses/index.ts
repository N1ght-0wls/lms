import { asClass } from 'awilix'
import { CoursesDiConfig } from './types/index.js'
import { CoursesRepository } from './repositories/CoursesRepository.js'
import { SINGLETON_CONFIG } from '@/core/constants/config.js'

export const resolveCoursesModule = (): CoursesDiConfig => ({
	coursesRepository: asClass(CoursesRepository, SINGLETON_CONFIG),
})
