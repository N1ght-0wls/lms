import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
	eslintConfigPrettier,
]
