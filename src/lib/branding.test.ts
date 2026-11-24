import { describe, expect, it } from 'vitest';
import { normalizedProjectName } from './branding';

describe('Front public brand', () => {
	it('accepts a Unicode project name', () => {
		expect(normalizedProjectName('  Projet Démo  ')).toBe('Projet Démo');
	});
	it('rejects invalid project names', () => {
		for (const value of [null, {}, ' ', 'bad\nname', 'x'.repeat(121)]) {
			expect(normalizedProjectName(value)).toBe('SymSvel');
		}
	});
});
