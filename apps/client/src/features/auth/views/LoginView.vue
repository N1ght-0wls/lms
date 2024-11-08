<script setup lang="ts">
import { Button } from '@/core/components/ui/button'
import { FormField } from '@/core/components/ui/form'
import FormItem from '@/core/components/ui/form/FormItem.vue'
import FormLabel from '@/core/components/ui/form/FormLabel.vue'
import { Input } from '@/core/components/ui/input'
import { Label } from '@/core/components/ui/label'
</script>

<template>
	<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
		<div class="flex items-center justify-center py-12">
			<div class="mx-auto grid w-[350px] gap-6">
				<div class="grid gap-2 text-center">
					<h1 class="text-3xl font-bold">Login</h1>
					<p class="text-balance text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>
				<form class="grid gap-4">
					<FormField name="Email" v-slot="{ componentField }">
						<FormItem class="grid gap-2">
							<FormLabel>Email</FormLabel>
							<FromControl>
								<Input id="email" type="email" placeholder="m@example.com" />
							</FromControl>
						</FormItem>
					</FormField>

					<FormField name="Email" v-slot="{ componentField }">
						<FormItem class="grid gap-2">
							<FormLabel class="flex items-center"
								>Password
								<a
									href="/forgot-password"
									class="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</a>
							</FormLabel>
							<FromControl>
								<Input id="password" type="password" placeholder="password" />
							</FromControl>
						</FormItem>
					</FormField>
					<Button type="submit" class="w-full"> Login </Button>
					<Button variant="outline" class="w-full"> Login with Google </Button>
				</form>
				<div class="mt-4 text-center text-sm">
					Don't have an account?
					<a href="#" class="underline"> Sign up </a>
				</div>
			</div>
		</div>
		<div class="hidden bg-muted lg:block">
			<img
				alt="Image"
				width="1920"
				height="1080"
				class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
			/>
		</div>
	</div>
</template>
