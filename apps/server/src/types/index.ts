import type http from 'node:http'
import { FastifyInstance, RouteOptions } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { Resolver } from 'awilix'
import { CommonDependencies } from '@/interfaces/index.js'

type AppInstanse = FastifyInstance<
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseDiConfig<T> = Record<keyof T, Resolver<any>>

export type { AppInstanse, Route, InjectableDependencies, BaseDiConfig }
