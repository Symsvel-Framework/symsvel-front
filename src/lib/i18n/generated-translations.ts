/**
 * Build-time dictionaries from module owners, system and generated overrides.
 * No runtime API or Node server.
 */
const legacy: Record<string, unknown> = import.meta.glob('./generated/*.ts', {
	eager: true,
	import: 'default'
});
const published: Record<string, unknown> = import.meta.glob('../translations/generated/*.ts', {
	eager: true,
	import: 'default'
});
const owned: Record<string, unknown> = import.meta.glob('../translations/*/*.ts', {
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

export function generatedTranslation(language: string | null | undefined, key: string): string | null {
	const scope = 'front';
	const iso = language?.trim().toLowerCase().replace(/_/g, '-').split('-')[0] ?? 'fr';
	const scoped = key.startsWith(scope + '.');
	const publicKey = scoped ? key.slice(scope.length + 1) : key;
	const index = publicKey.indexOf('.');
	const moduleName = index > 0 ? publicKey.slice(0, index) : '';
	const relative = index > 0 ? publicKey.slice(index + 1) : '';
	for (const candidate of [...new Set([iso, 'fr'])]) {
		const override = lookupGeneratedDictionary(published['../translations/generated/' + candidate + '.ts'], publicKey);
		if (override !== null && override.trim() !== '') return override;
		const previous = lookupGeneratedDictionary(legacy['./generated/' + candidate + '.ts'], publicKey);
		if (previous !== null && previous.trim() !== '') return previous;
		if (scoped && /^[a-z][a-z0-9-]*$/.test(moduleName) && relative) {
			const source = lookupGeneratedDictionary(owned['../translations/' + moduleName + '/' + candidate + '.ts'], relative);
			if (source !== null && source.trim() !== '') return source;
		}
	}
	return null;
}
