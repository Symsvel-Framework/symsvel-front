# SymSvel FRONT

> [!IMPORTANT]
> **Vous souhaitez utiliser SymSvel ? Rendez-vous sur [SymSvel CLI](https://github.com/Symsvel-Framework/symsvel-cli).** Ce dépôt est un **composant du framework**, pas un point d'installation autonome. Création de projets, installation des modules et mises à jour passent par la CLI. Les éventuelles commandes Composer, npm ou Symfony décrites ci-dessous concernent le travail des mainteneurs, sauf indication explicite contraire.

> [!WARNING]
> **SymSvel est en cours de développement.** Les fonctionnalités et procédures peuvent évoluer ou présenter des anomalies. **Utilisation à vos risques et périls.**

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

## Intégration continue GitHub-hosted (22/11/2026)

La CI de ce dépôt public utilise désormais **Ubuntu 24.04 sur les runners GitHub**, sans dépendance au Docker du mainteneur. Le workflow actif est `.github/workflows/ci.yml` ; il installe Node.js 24, lance `npm ci`, installe Chromium avec `npx playwright install --with-deps chromium` et conserve les contrôles Svelte/TypeScript, lint, build, tests unitaires et Playwright. L'ancienne version `ci.yml.stub` est inactive.

La publication par tag (`.github/workflows/release.yml`) utilise elle aussi GitHub-hosted. Les runners auto-hébergés sont réservés à `symsvel-packages` et `symsvel-recipes`, qui restent privés. Une CI verte ne remplace pas les crash-tests locaux.

## Dictionnaires statiques de traductions (17/11/2026)

Tooling peut publier `src/lib/i18n/generated/<lang>.ts` depuis le BO de développement. Le helper `generatedTranslation(language, key)` dans `src/lib/i18n/generated-translations.ts` découvre les fichiers présents à la compilation SvelteKit et résout les clés imbriquées, avec repli français par clé. Le Front de base n'a pas encore de pages métier consommatrices : les modules Front doivent utiliser cette fonction pour leurs textes. Aucune dépendance à Node ou Redis en production et aucun rebuild déclenché depuis le BO ; les sources mises à jour sont construites au prochain déploiement CD.

## Traductions des composants et modules (18/11/2026)

Les textes système sont fournis par le composant sous `src/lib/translations/system/<lang>.ts` ; les textes des modules par Tooling sous `src/lib/translations/<module>/<lang>.ts`. La convention est `<scope>.<module|system>.<key>`. Le helper préfère `src/lib/translations/generated` et conserve une lecture des anciens `src/lib/i18n/generated` durant la migration. Chargement statique au build, fallback français à la clé, aucune requête runtime.

### Dictionnaires et formatage

`src/lib/translations/**` est exclu de Prettier, car ces fichiers sont des exports TypeScript de données JSON strictes analysées par Tooling. Les dictionnaires synchronisés depuis les modules et les fichiers générés par Languages ne doivent pas être réécrits en objets JavaScript à clés non citées. Les autres sources du projet restent formatées normalement.

### Traductions du squelette Front

Le squelette public Front fournit ses deux textes natifs dans `src/lib/translations/system/{fr,en}.ts` sous `front.system.welcome.*`. L'écran reste statiquement prérendu en français et utilise la langue du navigateur après hydratation, sans API de langue, stockage local ni serveur Node. Les pages métier futures pourront remplacer ce simple accueil sans conserver ses clés inutilisées.

### CI des dictionnaires Front (18/11/2026)

La dernière CI Front de `feat/translations-sources`, comprenant le dictionnaire natif `front.system.welcome.*` et le build statique, a terminé avec succès sur les runners locaux. Le déclencheur temporaire de cette branche a été retiré pour conserver la politique habituelle `dev`/`main`. Les CT locaux resteront nécessaires avant merge.

---

## Licence MIT et contributions

Ce dépôt est distribué sous [licence MIT](LICENSE). Le code peut être utilisé, modifié et redistribué, y compris dans des projets commerciaux ou propriétaires, dans les conditions de cette licence (notamment la conservation de la notice de copyright et de licence).

**Contribuer :** créer un fork, puis proposer une pull request vers `dev` lorsque cette branche existe, sinon vers la branche par défaut. Expliquer la modification et fournir les tests et la documentation concernés. Les mainteneurs conservent la maîtrise des revues, des validations (CI et crash-tests), de l'intégration et des releases officielles. Une PR ne garantit pas son acceptation.

**Versions officielles :** seules les versions diffusées par l'organisation [Symsvel-Framework](https://github.com/Symsvel-Framework) sont officielles. Les forks sont libres sous MIT, mais ne doivent pas être présentés comme officiellement approuvés par les mainteneurs. Cette distinction n'ajoute aucune restriction aux droits accordés par la licence MIT sur le code.

## Participer et soutenir le projet

SymSvel est un projet en cours de développement. Pour contribuer, proposer une amélioration ou échanger avec le mainteneur : **[xavier@xavier-tezza.fr](mailto:xavier@xavier-tezza.fr)**.

SymSvel vous est utile et vous souhaitez me remercier ? **Offrez-moi une bière ! 🍺** (lien PayPal à compléter avant l'ouverture publique).
