const isStringEmpty = (str: string | undefined): boolean => {
	return !str?.trim().length
}

const compareStrings = (
	f: string | undefined,
	s: string | undefined,
): boolean => {
	return f?.trim().toLowerCase() === s?.trim().toLowerCase()
}

export { isStringEmpty, compareStrings }
