# Intégration continue

Depuis le 22 novembre 2026, les workflows CI de ce dépôt public s'exécutent sur **GitHub-hosted Ubuntu 24.04** et non sur les runners Docker du mainteneur. `.github/workflows/ci.yml` conserve les tests et utilise Node.js 24 (SvelteKit, npm, Playwright et build statique). Déclencheurs : `push` sur `dev` et `main`, et pull requests vers `main`. Le fichier `ci.yml.stub` n'est qu'une archive inactive de la configuration historique.

Les runners auto-hébergés sont réservés aux dépôts privés d'infrastructure `symsvel-packages` et `symsvel-recipes`. Une CI verte n'exonère pas des crash-tests locaux exigés par SymSvel.
 

La branche `dev` est le terrain de développement ; `main` conserve la version stable.

Le workflow `.github/workflows/ci.yml` est déclenché par les `push` sur `dev` et `main`, ainsi que par les pull requests ciblant `main`. Les pull requests ciblant `dev` ne déclenchent pas de CI au titre de l'événement `pull_request` ; un `push` sur `dev` déclenche sa propre exécution. Les éventuels déclencheurs supplémentaires définis dans le workflow restent applicables.

Les jobs utilisent les runners auto-hébergés configurés dans le workflow. Une modification n'est validée qu'après exécution et réussite de la CI, puis les crash-tests locaux requis.

## Releases sur GitHub-hosted (22/11/2026)

Le workflow `.github/workflows/release.yml` s'exécute désormais sur **GitHub-hosted Ubuntu 24.04** pour les tags `vX.Y.Z`. Il conserve les validations existantes, Node.js 24 et Playwright avec installation des dépendances système, ainsi que la vérification du tag et la GitHub Release via `actions/github-script@v7`. L'autorisation `contents: write` reste requise pour publier. Aucun tag n'a été créé pendant la migration ; une release réelle devra être validée séparément.


La release déclenchée par un tag `vX.Y.Z` utilise maintenant `[self-hosted, linux, ARM64, symsvel]`. Le setup Node.js 24, les tests Playwright et la génération SvelteKit demeurent ; `npx playwright install chromium` réutilise le fonctionnement de la CI sans installer de paquets système. La publication GitHub génère des notes de changements réelles et vérifie le tag via `actions/github-script@v7`, sans dépendre du binaire `gh` (non garanti sur le runner). L'autorisation `contents: write` est maintenue, aucun tag n'est créé ici. Validation par release réelle et CT de l'artefact requise.

## Formatage automatique sur dev (17/11/2026)

Comme sur `symsvel-bo`, la CI Front lance maintenant Prettier avant les validations TypeScript, ESLint, build et tests. Sur un push de `dev`, les différences de formatage sont commitées et repoussées sur cette même branche par `github-actions[bot]`, avec rebase sur le dernier commit pour éviter d'écraser des changements simultanés. La CI continue de refuser toute dérive de formatage sur `main` et sur les PR ; aucun formatage automatique n'est déployé en production. Cette homogénéisation a été nécessaire lors de l'ajout des dictionnaires TypeScript générés.

## Première release fonctionnelle (20/11/2026)

Le libellé historique « Aucun changement fonctionnel » est remplacé par des notes générées à partir des changements réels. La QA doit précéder la GitHub Release, déclenchée exclusivement par un tag Git vérifié. Le CT final sans `--dev` est distinct des quatre CT de développement.
