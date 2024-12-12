import { BaseDiConfig, InjectableDependencies } from '@/core/types/index.js'
import { CoursesModuleDependencies } from '../interfaces/index.js'

type CoursesInjectableDependencies =
	InjectableDependencies<CoursesModuleDependencies>

type CoursesDiConfig = BaseDiConfig<CoursesModuleDependencies>

export type { CoursesDiConfig, CoursesInjectableDependencies }
