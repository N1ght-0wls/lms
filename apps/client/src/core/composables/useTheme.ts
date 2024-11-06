import { useColorMode } from '@vueuse/core'
import { computed } from 'vue'

export const useTheme = () => {
	const mode = useColorMode()

	const toggle = () => {
		mode.value = mode.value === 'dark' ? 'light' : 'dark'
	}

	const themeIcon = computed(() =>
		mode.value === 'dark' ? 'lucide:moon' : 'lucide:sun',
	)

	return { toggle, themeIcon }
}
