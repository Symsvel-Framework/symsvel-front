# SymSvel FRONT

Interface **publique** SvelteKit du framework SymSvel. Ce dépôt fournit les sources natives de l'interface ; une fois installées dans un projet, les modifications locales appartiennent au projet.

## Installation dans un projet SymSvel

Depuis un environnement disposant de la CLI SymSvel :

```bash
symsvel create-project --components=front
```

Pour un projet de développement ou un crash-test, ajouter `--dev`. Le BO est toujours inclus lors de la création ; `--components=all` installe BO, App et Front. La CLI et le Tooling pilotent l'installation, la provenance et les mises à jour. Ne pas recréer manuellement ce dépôt avec `npx sv create` pour installer un composant SymSvel.

## Développement du dépôt

```bash
npm ci
npm run dev
npm run check
npm run lint
npm run build
npm run qa
```

Les scripts sont définis dans `package.json`. `npm run qa` exécute les contrôles statiques, le build, les tests unitaires et Playwright ; l'exécution locale de Playwright peut nécessiter ses navigateurs. Le build utilise l'adaptateur statique SvelteKit déclaré dans les dépendances.

## Mises à jour dans les projets

```bash
symsvel update front
```

La mise à jour native est orchestrée par Tooling, avec suivi des fichiers gérés et contrôle des conflits. Elle ne doit ni écraser les modifications locales conflictuelles ni manipuler les branches Git du projet. Voir [le contrat technique](https://github.com/Symsvel-Framework/symsvel-tooling/blob/feat/60-update-init-simplification/docs/component-updates-v1.md).

Les parcours complets de création, Setup Wizard, synchronisation des modules et mises à jour doivent encore être éprouvés sur XT avant validation finale des PR CLI #10 et Tooling #62.

## Intégration continue

Le workflow `.github/workflows/ci.yml` utilise le runner Docker auto-hébergé de l'organisation (labels `self-hosted`, `linux`, `ARM64`, `symsvel`). Node.js 24 est installé par `actions/setup-node`, puis `npm ci` installe les dépendances et `npx playwright install chromium` fournit le navigateur. Les bibliothèques système Chromium doivent être préinstallées dans l'image du runner : le job ne lance pas `--with-deps`.

La CI conserve `npm run qa` (Svelte/TypeScript, lint, build statique, tests unitaires et Playwright) et vérifie `build/index.html`, `build/.htaccess` et `build/robots.txt`. Le workflow hébergé d'origine est conservé dans `.github/workflows/ci.yml.stub`, inactif. La migration doit être confirmée par une CI GitHub Actions verte.


## Dictionnaires statiques de traductions (17/11/2026)

Tooling peut publier `src/lib/i18n/generated/<lang>.ts` depuis le BO de développement. Le helper `generatedTranslation(language, key)` dans `src/lib/i18n/generated-translations.ts` découvre les fichiers présents à la compilation SvelteKit et résout les clés imbriquées, avec repli français par clé. Le Front de base n'a pas encore de pages métier consommatrices : les modules Front doivent utiliser cette fonction pour leurs textes. Aucune dépendance à Node ou Redis en production et aucun rebuild déclenché depuis le BO ; les sources mises à jour sont construites au prochain déploiement CD.
