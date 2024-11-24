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
import { LOGIN_SCHEMA } from '@awesome-lms/shared'

const { handleSubmit, values } = useForm({
	validationSchema: toTypedSchema(LOGIN_SCHEMA),
})

const onSubmit = handleSubmit((values) => {
	console.log(values)
})
</script>

<template>
	<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2xl:min-h-[800px]">
		<div class="flex items-center justify-center py-12">
			<Card class="mx-auto grid w-[350px] gap-6">
				<CardHeader class="grid gap-2 text-center">
					<CardTitle class="text-3xl font-bold"
						>Forgot your password?</CardTitle
					>
					<CardDescription class="text-balance text-muted-foreground">
						Enter your email below to reset password
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
						<Button type="submit" class="w-full"> Reset </Button>
					</form>
				</CardContent>
			</Card>
		</div>
	</div>
</template>
