# Portfolio Rewrite — Design Spec

**Date:** 2026-05-07  
**Auteur:** Mathieu Chateigner  
**Statut:** Approuvé

---

## Contexte et objectif

Réécriture complète du portfolio actuel (`views/main.html`). L'objectif est de présenter Mathieu comme un **développeur C# .NET Core backend** — et non comme un développeur VR — pour orienter sa carrière vers le développement C#.

Le site actuel utilise déjà Bootstrap 5, FontAwesome et AOS, mais contient des projets fictifs et ne reflète pas le profil réel.

---

## Décisions techniques

| Choix | Décision | Raison |
|---|---|---|
| Stack | HTML / CSS / JS vanilla + Bootstrap 5 | GitHub Pages (statique uniquement) |
| Hébergement | GitHub Pages | Déjà en place |
| Langue | Français | Cible principale : entreprises françaises |
| Structure | Single-page, navigation par ancres | Simplicité, fluidité mobile |
| Bibliothèques conservées | Bootstrap 5, FontAwesome, AOS | Déjà présents localement |

---

## Architecture des fichiers

```
index.html          ← point d'entrée unique (remplace views/main.html)
styles/style.css    ← styles custom (réécriture complète)
scripts/main.js     ← JS custom (réécriture complète)
assets/
  fontawesome/      ← conservé tel quel
  images/           ← à compléter (photo profil si disponible)
bootstrap/          ← conservé tel quel
```

Le fichier `dist/index.html` et `views/main.html` sont à supprimer lors de l'implémentation.

---

## Sections (ordre de scroll)

### 1. Navbar
- Fixe, fond semi-transparent avec `backdrop-filter: blur`
- Gauche : `Mathieu Chateigner` (prénom en blanc, nom en cyan `#2be0e0`)
- Droite : ancres `Projets · À propos · Contact`
- Se compacte au scroll (padding réduit, ombre légère)
- Responsive : burger menu Bootstrap sur mobile

### 2. Hero
- Plein écran (`min-height: 100vh`), contenu centré verticalement
- Layout deux colonnes (grid) :
  - **Gauche** : eyebrow "Développeur C# .NET Core" (cyan, uppercase), nom en grand (`3.6rem`), sous-titre "Backend · APIs REST · Architecture .NET", description courte (~2 phrases), deux CTA ("Voir mes projets" / "Me contacter"), ligne sociale (LinkedIn + GitHub + localisation Orléans)
  - **Droite** : stack technique en badges groupés par catégorie, avec animation `fadeSlide` décalée. Groupes : [.NET 8, ASP.NET Core, C#] / [REST APIs, SQL Server, xUnit] / [GitLab CI, Jenkins, SOLID, Clean Code] / [EDI, FTP/SFTP, Background Services]. Pilule "En poste · Ouvert aux opportunités" en bas.
- Background : 2 blobs flottants (gradient purple→cyan, `filter: blur`, `opacity: 0.08`), animation lente

### 3. Projets
- Titre de section avec eyebrow cyan + `h2` + sous-titre gris
- Grille 3 colonnes sur desktop, 1 colonne sur mobile
- **Carte Transware** (badge "Professionnel", accent purple, ligne de couleur en haut) :
  - Icône ⚙️, nom, tagline "TMS multi-transporteurs · Interlog Solutions"
  - Description : architecture .NET 8 / ASP.NET Core, APIs REST, connecteurs EDI, FTP/SFTP, Background Services, SQL Server ~400 tables, CI GitLab + Jenkins, tests xUnit
  - Tags : `.NET 8`, `ASP.NET Core`, `SQL Server`, `REST API`, `EDI`, `xUnit`, `Jenkins`
  - Footer : mention "Code propriétaire — disponible sur demande"
- **Carte Aria** (badge "Personnel") :
  - Icône 🎲, tagline "Plateforme de jeu de rôle en ligne"
  - Description : TTRPG web temps réel, panel joueur/MJ, overlay OBS, Ably (messagerie), Supabase (persistance), dés 3D
  - Tags : `JavaScript`, `Supabase`, `Ably`, `HTML/CSS`
  - Liens : GitHub + Démo live
- **Carte Enigmates** (badge "Personnel") :
  - Icône 📍, tagline "Jeu mobile de chasse au trésor GPS"
  - Description : iOS/Android, navigation GPS, photo upload, Supabase
  - Tags : `React Native`, `Expo`, `Supabase`, `iOS / Android`
  - Lien : GitHub

### 4. À propos
- Layout deux colonnes : gauche = bio + valeurs, droite = timeline expérience + diplôme
- **Bio** : 2-3 phrases axées C# backend, parcours depuis 2021, goût pour les architectures propres (SOLID, Clean Code)
- **Timeline** (ordre antéchronologique) :
  1. Analyste Développeur C# — Interlog Solutions (oct. 2024 → présent)
  2. VR Software Engineer — Hologame (sept. 2023 → sept. 2024)
  3. Développeur Application Mobile — Atelier Pandore (oct. 2022 → sept. 2023)
  4. Développeur C# (alternance) — Interlog (oct. 2021 → sept. 2022)
- **Diplôme** : BAC+5 RNCP niveau 7 — ESGI Paris (2024)
- **CTA** : bouton "Télécharger le CV" (lien vers un PDF à placer dans `assets/`)
- **Divers** : ligne discrète sur les intérêts (champion de France de trampoline, IA, impression 3D)

### 5. Contact
- Titre + 3 blocs d'info : Email (`mat.chateigner@gmail.com`), LinkedIn, GitHub
- Chaque bloc : icône FontAwesome dans un cercle gradient, label, lien cliquable
- Pas de formulaire (GitHub Pages statique, pas de backend)

### 6. Footer
- Fond `#070a0f`, centré
- Ligne sociale (LinkedIn + GitHub)
- Copyright "© 2026 Mathieu Chateigner"

---

## Styles

| Variable | Valeur |
|---|---|
| `--dark-bg` | `#0e1217` |
| `--darker-bg` | `#070a0f` |
| `--card-bg` | `#131820` |
| `--primary` | `#7b68ee` (purple) |
| `--secondary` | `#2be0e0` (cyan) |
| `--text` | `#f2f2f2` |
| `--text-muted` | `#6b7280` |

Police : `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

Animations conservées : blobs flottants, `fadeSlide` sur les badges, AOS (`fade-up`, `fade-right`, `fade-left`) sur les sections.

Boutons :
- Primaire : gradient `#7b68ee → #2be0e0`, `border-radius: 8px`
- Secondaire : transparent, `border: 1px solid rgba(255,255,255,0.15)`, hover = border plus visible

Cards projet :
- `background: #131820`, `border: 1px solid rgba(255,255,255,0.06)`, `border-radius: 12px`
- Ligne de couleur en `::before` sur hover (et permanente sur Transware)
- Hover : `translateY(-3px)`, border légèrement plus visible

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| `< 992px` | Hero : une seule colonne (stack tech passe sous le texte) |
| `< 768px` | Projets : 1 colonne, navbar = burger menu |
| `< 576px` | Typographie réduite, padding resserré |

---

## Ce qui est supprimé / non porté

- Carrousel draggable avec clones (6 faux projets) → remplacé par grille 3 cartes réelles
- Formulaire de contact → remplacé par liens directs
- Section skills avec barres de progression → intégré dans hero (badges) et about
- Photo `working_male_1-removebg-preview.png` → non utilisée
- AOS sur chaque élément → utilisé uniquement sur les sections entières

---

## Assets à préparer

- [ ] PDF du CV à placer dans `assets/cv-mathieu-chateigner.pdf`
- [ ] Photo profil optionnelle dans `assets/images/` (section about)
- [ ] URLs GitHub réels pour Aria et Enigmates (à renseigner dans le HTML)
- [ ] URL démo live pour Aria (à confirmer)
