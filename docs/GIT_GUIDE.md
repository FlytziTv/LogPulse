# 📖 Git Guide — LogPulse

## Branches

| Branche     | Rôle                           |
| ----------- | ------------------------------ |
| `main`      | Production — stable uniquement |
| `dev`       | Développement actif            |
| `feature/*` | Nouvelles fonctionnalités      |
| `fix/*`     | Corrections de bugs            |

## Workflow

1. Toujours partir de `dev`
2. Créer une branche `feature/nom` ou `fix/nom`
3. Commit avec le bon préfixe
4. Merger dans `dev` une fois terminé
5. Merger `dev` dans `main` pour une release

## Convention de commits

| Préfixe     | Usage                             |
| ----------- | --------------------------------- |
| `feat:`     | Nouvelle fonctionnalité           |
| `fix:`      | Correction de bug                 |
| `chore:`    | Maintenance, config               |
| `docs:`     | Documentation                     |
| `refactor:` | Refactoring sans nouvelle feature |
| `style:`    | Mise en forme, UI                 |

## Exemples

```bash
git commit -m "feat: ajout de la route POST /logs"
git commit -m "fix: correction du middleware auth"
git commit -m "chore: setup prisma schema"
git commit -m "style: amélioration du tableau de logs"
```
