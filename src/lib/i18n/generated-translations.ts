/**
 * Build-time dictionaries published locally by SymSvel Tooling.
 * Vite discovers only the generated .ts files present at build time.
 * No runtime API, Redis service or Node server is involved.
 */
const catalogs: Record<string, unknown> = import.meta.glob('./generated/*.ts', {
	eager: true,
	import: 'default'
});

export function lookupGeneratedDictionary(dictionary: unknown, dottedKey: string): string | null {
	if (!dottedKey || !/^[A-Za-z][A-Za-z0-9_.-]*$/.test(dottedKey)) return null;
	let value: unknown = dictionary;
	for (const part of dottedKey.split('.')) {
		if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
		value = (value as Record<string, unknown>)[part];
	}
	return typeof value === 'string' ? value : null;
}

/** ISO account/site language is never mutated by the French fallback. */
export function generatedTranslation(language: string | null | undefined, key: string): string | null {
	const iso = language?.trim().toLowerCase().replace(/_/g, '-').split('-')[0] ?? 'fr';
	for (const candidate of [...new Set([iso, 'fr'])]) {
		const text = lookupGeneratedDictionary(catalogs[`./generated/${candidate}.ts`], key);
		if (text !== null) return text;
	}
	return null;
}
