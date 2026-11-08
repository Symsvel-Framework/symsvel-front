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
