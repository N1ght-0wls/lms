const readBearerToken = (header: string | undefined): string | null => {
	if (!header) return null

	const token = header.split(' ').at(1)

	return token ? token : null
}

export { readBearerToken }
