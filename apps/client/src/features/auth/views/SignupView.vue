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
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { CREATE_USER_SCHEMA, isStringEmpty } from '@awesome-lms/shared'
import { useSignup } from '../composables/useSignup'
import { computed } from 'vue'

const { handleSubmit, values } = useForm({
	validationSchema: toTypedSchema(CREATE_USER_SCHEMA),
})

const { mutateAsync, isPending } = useSignup()

const onSubmit = handleSubmit(async (data) => {
	mutateAsync(data)
})

const isDisabled = computed(() => {
	return (
		isStringEmpty(values.email) ||
		isStringEmpty(values.firstName) ||
		isStringEmpty(values.lastName) ||
		isStringEmpty(values.password) ||
		isStringEmpty(values.username) ||
		isPending
	)
})
</script>

<template>
	<Card class="mx-auto my-auto max-w-sm">
		<CardHeader class="grid gap-2 text-center">
			<CardTitle class="text-3xl font-bold"> Sign Up </CardTitle>
			<CardDescription>
				Enter your information to create an account
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form class="grid gap-4" @submit="onSubmit">
				<div class="grid grid-cols-2 gap-4">
					<FormField name="firstName" v-slot="{ componentField }">
						<FormItem class="grid gap-2">
							<FormLabel>First name</FormLabel>
							<FormControl>
								<Input
									id="first-name"
									placeholder="Max"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField name="lastName" v-slot="{ componentField }">
						<FormItem class="grid gap-2">
							<FormLabel>Last name</FormLabel>
							<FormControl>
								<Input
									id="last-name"
									placeholder="Robinson"
									v-bind="componentField"
								/>
							</FormControl>
						</FormItem>
					</FormField>
				</div>
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
					</FormItem>
				</FormField>
				<FormField name="password" v-slot="{ componentField }">
					<FormItem class="grid gap-2">
						<FormLabel>Password</FormLabel>
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
				<Button class="w-full" :disabled="isDisabled">
					Create an account
				</Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<RouterLink class="underline" to="/login">Sign in</RouterLink>
			</div>
		</CardContent>
	</Card>
</template>
