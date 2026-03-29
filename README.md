# Fk Titan 🧮

> **Calculatrice scientifique graphique** style TI/NumWorks — en pur HTML, CSS et JavaScript ES Modules. Aucune dépendance, aucun framework, aucun bundler.

---

## ✨ Description

**Fk Titan** est une calculatrice scientifique web inspirée des calculatrices graphiques TI-84 et NumWorks. Elle tourne entièrement dans le navigateur sans serveur, sans framework et sans compilation.

- Interface reproduisant l'ergonomie d'une vraie calculatrice graphique
- 18 applications scientifiques intégrées
- Navigation clavier physique et virtuel
- Mode examen pour les contrôles scolaires
- Thème sombre inspiré des calculatrices TI

---

## 🚀 Installation et utilisation

### Option 1 — Ouvrir directement

Cloner le dépôt et ouvrir `index.html` dans votre navigateur :

```bash
git clone https://github.com/Fkmraxxx/Titan.git
cd Titan
open index.html   # macOS
xdg-open index.html  # Linux
```

> **Note :** Les modules ES natifs nécessitent un serveur HTTP local (pas `file://`).

### Option 2 — Serveur local (recommandé)

```bash
npm install
npm start
# Ouvre http://localhost:3000
```

### Navigation

| Touche | Action |
|--------|--------|
| `↑ ↓ ← →` | Naviguer dans le menu |
| `Entrée` | Sélectionner / Calculer |
| `Échap` | Retour au menu |
| `H` | Menu principal |
| `P` | Allumer / éteindre |

---

## 🛠 Technologies

| Technologie | Usage |
|-------------|-------|
| **HTML5** | Structure de l'interface, canvas pour le grapheur |
| **CSS3** | Thème sombre, mise en page responsive |
| **JavaScript ES Modules** | Architecture modulaire sans bundler |
| **Web APIs** | Canvas 2D, localStorage, DOM |

---

## 📱 Applications disponibles

| Icône | Nom | Description |
|-------|-----|-------------|
| ∑ | Calculation | Sommations et produits (Σ, Π) |
| ƒ | Grapher | Traceur de fonctions sur canvas |
| = | Equations | Résolveur linéaire et quadratique |
| ▤ | Statistics | Statistiques descriptives |
| ↗ | Regression | Régression linéaire, coefficient R² |
| π | Distributions | Loi normale et binomiale |
| n | Sequences | Suites arithmétiques et géométriques |
| χ | Inference | Tests z et t, valeurs p |
| ¤ | Finance | Intérêts composés, TVM |
| Py | Python | REPL d'expressions mathématiques |
| [] | Matrix | Opérations sur matrices 2×2 et 3×3 |
| i | Complex | Nombres complexes (forme algébrique et polaire) |
| L | Lists | Gestion et statistiques sur listes |
| <> | Programs | Éditeur et interpréteur BASIC simplifié |
| △ | Geometry | Aires et périmètres (cercle, rectangle, triangle) |
| H | Elements | Tableau périodique des éléments |
| ⚙ | Settings | Mode angle, thème, précision |
| ! | Exam | Mode examen (restrictions activables) |

---

## 🗺 Roadmap

- [x] Calculatrice de base avec historique
- [x] Menu d'applications avec navigation clavier
- [x] 18 applications scientifiques fonctionnelles
- [x] Mode examen
- [x] Paramètres persistants (localStorage)
- [ ] Support des unités (m, kg, s…)
- [ ] Export CSV des données (listes, régression)
- [ ] Mode PWA (hors-ligne, installation)
- [ ] Thème clair
- [ ] Internationalisation (EN/FR)

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. **Fork** le dépôt
2. Crée une branche : `git checkout -b feat/ma-fonctionnalite`
3. Commit tes changements : `git commit -m 'feat: ajouter X'`
4. Push la branche : `git push origin feat/ma-fonctionnalite`
5. Ouvre une **Pull Request**

### Conventions

- Code en **anglais** (noms de variables, fonctions)
- Commentaires en français autorisés
- Modules ES natifs uniquement (pas de `require`, pas de bundler)
- Chaque app exporte `render(screenEl, state)` et optionnellement `onKey(key, state, update)`

---

## 📄 Licence

MIT — voir [LICENSE](./LICENSE)

© 2026 Fkmraxxx