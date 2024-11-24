import { AxiosError } from 'axios'
import { computed, type Ref } from 'vue'

export const getFormError = (
	error: Ref<Error | null>,
	isError: Ref<boolean>,
) => {
	return computed(() => {
		if (isError.value && error.value instanceof AxiosError) {
			return error.value?.response?.data.message
		}

		return null
	})
}
