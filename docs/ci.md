# Intégration continue

Depuis le 22/11/2026, la CI des dépôts publics SymSvel s'exécute sur **GitHub-hosted Ubuntu 24.04**, sans runner local. `.github/workflows/ci.yml` utilise Node.js 24, npm et Chromium/Playwright avec ses dépendances système ; déclencheurs : push sur `dev` et `main`, PR vers `main`. `ci.yml.stub` est une archive inactive.

Les runners auto-hébergés du mainteneur restent réservés aux dépôts privés `symsvel-packages` et `symsvel-recipes`. Les validations CI ne remplacent pas les crash-tests locaux.

## Releases sur GitHub-hosted (22/11/2026)

La publication de tags `vX.Y.Z` par `.github/workflows/release.yml` s'exécute sur GitHub-hosted Ubuntu 24.04. Elle conserve Node.js 24 et Playwright avec `--with-deps`, la vérification du tag, les contrôles existants et la création de GitHub Release via `actions/github-script@v7`. Aucun tag n'a été créé durant cette migration ; la validation d'une release réelle reste nécessaire.

## Formatage automatique sur dev (17/11/2026)

Comme sur `symsvel-bo`, la CI Front lance maintenant Prettier avant les validations TypeScript, ESLint, build et tests. Sur un push de `dev`, les différences de formatage sont commitées et repoussées sur cette même branche par `github-actions[bot]`, avec rebase sur le dernier commit pour éviter d'écraser des changements simultanés. La CI continue de refuser toute dérive de formatage sur `main` et sur les PR ; aucun formatage automatique n'est déployé en production. Cette homogénéisation a été nécessaire lors de l'ajout des dictionnaires TypeScript générés.

## Première release fonctionnelle (20/11/2026)

Le libellé historique « Aucun changement fonctionnel » est remplacé par des notes générées à partir des changements réels. La QA doit précéder la GitHub Release, déclenchée exclusivement par un tag Git vérifié. Le CT final sans `--dev` est distinct des quatre CT de développement.

## Branding public du projet

Le layout racine fournit un store par instance via `provideProjectBrand()`. Une requête anonyme à `/apiopen/project` après hydratation fournit le nom public pour le titre. Les composants peuvent appeler `getProjectBrand()` pendant leur initialisation et afficher `$brandName`. `SymSvel` est uniquement la valeur de repli. `PUBLIC_API_URL` est exposée via Vite à la compilation ; sans configuration explicite, l'origine est déduite du domaine local. Aucun secret ni jeton n'est envoyé. La CI couvre le nom personnalisé et le repli par Playwright ; le CT vérifie le nom du projet déployé.

## Point de montage confidentialité facultatif (28/11/2026)

Le layout front monte au plus une fois l'entrée native `src/lib/modules/gdpr/Runtime.svelte` lorsqu'elle est synchronisée par Tooling. Le glob Vite exact fonctionne aussi sans GDPR installé ; aucune importation statique obligatoire, aucun SDK, appel de consentement ou logique métier dans le layout. Le scope front est fixé par l'hôte et la langue provient du navigateur, avec fallback FR. Le layout reste propriété de l'hôte : le module ne l'écrase pas. La CI hôte vérifie le build autonome ; la CI GDPR doit vérifier le build assemblé et le point de montage réel avant intégration. BO inchangé.
