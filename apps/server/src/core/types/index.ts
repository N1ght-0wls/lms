import type http from 'node:http'
import { FastifyInstance, RouteOptions } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { Resolver } from 'awilix'
import { CommonDependencies } from '@/core/interfaces/index.js'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import * as schema from '@/db/index.js'

type AppInstance = FastifyInstance<
	http.Server,
	http.IncomingMessage,
	http.ServerResponse
>

type Route = RouteOptions<
	http.Server,
	http.IncomingMessage,
	http.ServerResponse,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	any,
	ZodTypeProvider
>

type InjectableDependencies<T> = T & CommonDependencies

type DatabaseClient = PostgresJsDatabase<typeof schema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseDiConfig<T> = Record<keyof T, Resolver<any>>

export type {
	AppInstance,
	Route,
	InjectableDependencies,
	BaseDiConfig,
	DatabaseClient,
}
