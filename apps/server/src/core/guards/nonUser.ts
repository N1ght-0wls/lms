import { createRoleGuard } from '@/core/factories/index.js'

export const nonUserGuard = createRoleGuard('user', 'exclude')
