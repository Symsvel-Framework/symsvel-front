import { describe, expect, it } from 'vitest';
import { lookupGeneratedDictionary, generatedTranslation } from './generated-translations';

describe('generated translations', () => {
  it('resolves nested keys and rejects unsupported values', () => {
    const dictionary = { auth: { signIn: 'Connexion', count: 5 } };
    expect(lookupGeneratedDictionary(dictionary, 'auth.signIn')).toBe('Connexion');
    expect(lookupGeneratedDictionary(dictionary, 'auth.count')).toBeNull();
    expect(lookupGeneratedDictionary(dictionary, 'auth.unknown')).toBeNull();
    expect(lookupGeneratedDictionary(dictionary, '../unsafe')).toBeNull();
  });
  it('does not require generated files to exist for an initial build', () => {
    expect(generatedTranslation('fr', 'nonexistent.testing')).toBeNull();
  });
});
