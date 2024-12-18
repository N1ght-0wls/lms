<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/core/components/ui/card'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/core/components/ui/form'
import { Input } from '@/core/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { isStringEmpty, LOGIN_SCHEMA } from '@awesome-lms/shared'
import { useLogin } from '../composables/useLogin'
import { computed } from 'vue'
import { getFormError } from '@/core/utils'

const { handleSubmit, values } = useForm({
	validationSchema: toTypedSchema(LOGIN_SCHEMA),
})

const { mutateAsync, isPending, error, isError } = useLogin()

const onSubmit = handleSubmit(async (data) => {
	mutateAsync(data)
})

const isDisabled = computed(() => {
	return (
		isStringEmpty(values.email) ||
		isStringEmpty(values.password) ||
		isPending.value
	)
})

const formError = getFormError(error, isError)
</script>

<template>
	<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
		<div class="flex items-center justify-center py-12">
			<Card class="mx-auto grid w-[350px] gap-6">
				<CardHeader class="grid gap-2 text-center">
					<CardTitle class="text-3xl font-bold">Login</CardTitle>
					<CardDescription class="text-balance text-muted-foreground">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form class="grid gap-4" @submit="onSubmit">
						<FormField name="email" v-slot="{ componentField }">
							<FormItem class="grid gap-2">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										v-bind="componentField"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>

						<FormField name="password" v-slot="{ componentField }">
							<FormItem class="grid gap-2">
								<FormLabel class="flex items-center"
									>Password
									<RouterLink
										class="ml-auto inline-block text-sm underline"
										to="/reset"
										>Forgot your password?</RouterLink
									>
								</FormLabel>
								<FormControl>
									<Input
										id="password"
										type="password"
										placeholder="password"
										v-bind="componentField"
									/>
								</FormControl>
							</FormItem>
						</FormField>
						<p v-if="formError" class="text-destructive">
							{{ formError }}
						</p>
						<Button class="w-full" :disabled="isDisabled">Login</Button>
					</form>
					<div class="mt-4 text-center text-sm">
						Don't have an account?
						<RouterLink class="underline" to="/signup">Sign up</RouterLink>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</template>
