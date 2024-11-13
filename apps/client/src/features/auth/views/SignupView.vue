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
import { CREATE_USER_SCHEMA } from '@awesome-lms/shared'

const { handleSubmit, values } = useForm({
	validationSchema: toTypedSchema(CREATE_USER_SCHEMA),
})

const onSubmit = handleSubmit((values) => {
	console.log(values)
})
</script>

<template>
	<Card class="mx-auto my-auto max-w-sm">
		<CardHeader>
			<CardTitle class="text-xl"> Sign Up </CardTitle>
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
				<Button type="submit" class="w-full"> Create an account </Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<RouterLink class="underline" to="/login">Sign in</RouterLink>
			</div>
		</CardContent>
	</Card>
</template>
