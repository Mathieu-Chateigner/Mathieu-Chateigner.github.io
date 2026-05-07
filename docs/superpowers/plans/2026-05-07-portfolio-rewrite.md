# Portfolio Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réécrire le portfolio de Mathieu Chateigner en HTML/CSS/JS vanilla + Bootstrap 5 pour présenter un profil Développeur C# .NET Core backend orienté vers les entreprises françaises.

**Architecture:** Single-page application statique hébergée sur GitHub Pages. Sections : Navbar → Hero → Projets → À propos → Contact → Footer. Structure narrative centrée projets (3 projets réels : Transware, Aria, Enigmates).

**Tech Stack:** HTML5, CSS3, JavaScript ES6, Bootstrap 5 (local), FontAwesome (local), AOS 2.3.4 (CDN)

**Spec:** `docs/superpowers/specs/2026-05-07-portfolio-rewrite-design.md`
**Mockups visuels:** `.superpowers/brainstorm/707-1778165136/content/hero-mockup.html` et `projects-mockup.html`

---

## File Map

| Fichier | Action | Rôle |
|---|---|---|
| `index.html` | Créer | Point d'entrée unique — toute la structure HTML |
| `styles/style.css` | Réécrire | Tous les styles custom (variables, sections, responsive) |
| `scripts/main.js` | Réécrire | AOS init, navbar scroll, comportements JS |
| `views/main.html` | Supprimer | Ancien fichier principal, obsolète |
| `dist/index.html` | Supprimer | Ancien dist, obsolète |
| `dist/index.js` | Supprimer | Ancien dist JS, obsolète |
| `assets/cv-mathieu-chateigner.pdf` | Créer (placeholder) | PDF du CV lié dans la section About |

---

## Task 1 : Nettoyage et scaffold de base

**Files:**
- Delete: `views/main.html`, `dist/index.html`, `dist/index.js`
- Create: `index.html`

- [ ] **Step 1 : Supprimer les anciens fichiers**

```bash
rm views/main.html
rm dist/index.html
rm dist/index.js
```

- [ ] **Step 2 : Créer `index.html` avec la structure de base**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mathieu Chateigner — Développeur C# .NET Core</title>
  <meta name="description" content="Portfolio de Mathieu Chateigner, développeur C# .NET Core backend spécialisé en APIs REST, ASP.NET Core et SQL Server.">
  <!-- Bootstrap CSS -->
  <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link href="assets/fontawesome/css/all.min.css" rel="stylesheet">
  <!-- AOS Animation -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link href="styles/style.css" rel="stylesheet">
</head>
<body>

  <!-- NAVBAR -->

  <!-- HERO -->

  <!-- PROJECTS -->

  <!-- ABOUT -->

  <!-- CONTACT -->

  <!-- FOOTER -->

  <!-- Bootstrap JS -->
  <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- AOS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <!-- Custom JS -->
  <script src="scripts/main.js"></script>
</body>
</html>
```

- [ ] **Step 3 : Vérifier que le fichier s'ouvre sans erreur dans le navigateur**

Ouvrir `index.html` directement dans le navigateur. Page blanche attendue, sans erreur console.

- [ ] **Step 4 : Commit**

```bash
git add index.html
git rm views/main.html dist/index.html dist/index.js
git commit -m "chore: scaffold index.html, remove old dist and views files"
```

---

## Task 2 : CSS — variables et base

**Files:**
- Modify: `styles/style.css` (réécriture complète)

- [ ] **Step 1 : Remplacer tout le contenu de `styles/style.css` par les fondations**

```css
/* ── Variables ─────────────────────────────────── */
:root {
  --dark-bg:    #0e1217;
  --darker-bg:  #070a0f;
  --card-bg:    #131820;
  --primary:    #7b68ee;
  --secondary:  #2be0e0;
  --text:       #f2f2f2;
  --text-muted: #6b7280;
  --border:     rgba(255, 255, 255, 0.06);
}

/* ── Reset & base ───────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--dark-bg);
  color: var(--text);
  overflow-x: hidden;
}

a { text-decoration: none; }

/* ── Scrollbar ──────────────────────────────────── */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--darker-bg); }
::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--secondary); }

/* ── Section utilitaire ─────────────────────────── */
section { padding: 100px 0; }

.section-eyebrow {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--secondary);
  margin-bottom: 12px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.section-sub {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
  max-width: 520px;
  margin-bottom: 52px;
}

/* ── Background blobs ───────────────────────────── */
.bg-blobs {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  filter: blur(80px);
  opacity: 0.08;
}

.blob-1 {
  width: 500px; height: 500px;
  top: -100px; left: -100px;
  animation: blobDrift1 22s ease-in-out infinite alternate;
}

.blob-2 {
  width: 300px; height: 300px;
  bottom: -60px; right: -60px;
  animation: blobDrift2 17s ease-in-out infinite alternate;
}

@keyframes blobDrift1 {
  from { transform: translate(0, 0); }
  to   { transform: translate(60px, 40px); }
}
@keyframes blobDrift2 {
  from { transform: translate(0, 0); }
  to   { transform: translate(-40px, -30px); }
}

/* ── Boutons ────────────────────────────────────── */
.btn-primary-custom {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  transition: opacity 0.2s, transform 0.2s;
  display: inline-block;
}
.btn-primary-custom:hover { opacity: 0.82; transform: translateY(-1px); color: #fff; }

.btn-outline-custom {
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  transition: border-color 0.2s, transform 0.2s;
  display: inline-block;
}
.btn-outline-custom:hover { border-color: rgba(255,255,255,0.4); transform: translateY(-1px); color: var(--text); }
```

- [ ] **Step 2 : Ouvrir `index.html` dans le navigateur — fond sombre attendu, pas d'erreur console**

- [ ] **Step 3 : Commit**

```bash
git add styles/style.css
git commit -m "style: CSS variables, reset, blobs, buttons base"
```

---

## Task 3 : Navbar

**Files:**
- Modify: `index.html` (section NAVBAR)
- Modify: `styles/style.css` (ajouter styles navbar)
- Modify: `scripts/main.js` (ajouter comportement scroll)

- [ ] **Step 1 : Remplacer le commentaire `<!-- NAVBAR -->` dans `index.html`**

```html
<!-- NAVBAR -->
<nav class="site-nav" id="navbar">
  <div class="nav-inner">
    <a class="nav-brand" href="#home">Mathieu <span>Chateigner</span></a>
    <button class="nav-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navMenu" aria-expanded="false" aria-label="Menu">
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse nav-menu" id="navMenu">
      <a class="nav-link" href="#projects">Projets</a>
      <a class="nav-link" href="#about">À propos</a>
      <a class="nav-link" href="#contact">Contact</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 2 : Ajouter les styles navbar dans `styles/style.css`**

```css
/* ── Navbar ─────────────────────────────────────── */
.site-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 20px 48px;
  display: flex;
  background: rgba(14, 18, 23, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: padding 0.3s, background 0.3s, box-shadow 0.3s;
}

.site-nav.scrolled {
  padding: 12px 48px;
  background: rgba(14, 18, 23, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.nav-inner {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.05em;
}
.nav-brand span { color: var(--secondary); }
.nav-brand:hover { color: var(--text); }

.nav-menu { display: flex; gap: 32px; }

.nav-link {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  transition: color 0.2s;
  padding: 0;
}
.nav-link:hover { color: var(--text); }

.nav-toggler {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .site-nav { padding: 16px 24px; }
  .site-nav.scrolled { padding: 12px 24px; }
  .nav-toggler { display: block; }
  .nav-menu {
    flex-direction: column;
    gap: 0;
    background: var(--card-bg);
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 12px;
    border: 1px solid var(--border);
  }
  .nav-menu .nav-link { padding: 10px 0; border-bottom: 1px solid var(--border); }
  .nav-menu .nav-link:last-child { border-bottom: none; }
}
```

- [ ] **Step 3 : Créer `scripts/main.js` avec le comportement scroll de la navbar**

```js
// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// AOS init
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, offset: 80 });
});
```

- [ ] **Step 4 : Vérifier dans le navigateur**

- La navbar est visible en haut, fond semi-transparent
- En scrollant (même si la page est courte), la classe `scrolled` s'ajoute (vérifier en DevTools)
- Sur mobile (<768px), le bouton burger apparaît et ouvre le menu

- [ ] **Step 5 : Commit**

```bash
git add index.html styles/style.css scripts/main.js
git commit -m "feat: navbar with scroll behavior and mobile menu"
```

---

## Task 4 : Hero section

**Files:**
- Modify: `index.html` (section HERO)
- Modify: `styles/style.css` (ajouter styles hero)

- [ ] **Step 1 : Ajouter les blobs et la section hero dans `index.html`**

Remplacer les commentaires `<!-- NAVBAR -->` ... `<!-- PROJECTS -->` (garder la navbar existante et ajouter en dessous) :

```html
<!-- Background blobs -->
<div class="bg-blobs">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
</div>

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-inner">

    <div class="hero-left" data-aos="fade-right">
      <span class="hero-eyebrow">Développeur C# .NET Core</span>
      <h1 class="hero-name">Mathieu<br>Chateigner</h1>
      <p class="hero-title"><strong>Backend</strong> · APIs REST · Architecture .NET</p>
      <p class="hero-desc">
        Je conçois des applications backend robustes en C# et .NET 8 — APIs REST, services métier,
        intégrations EDI, bases SQL Server. Actuellement chez Interlog Solutions sur Transware,
        un TMS multi-transporteurs.
      </p>
      <div class="hero-buttons">
        <a href="#projects" class="btn-primary-custom">Voir mes projets</a>
        <a href="#contact" class="btn-outline-custom">Me contacter</a>
      </div>
      <div class="hero-social">
        <a href="https://www.linkedin.com/in/mchateigner/" target="_blank" rel="noopener" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/Mathieu-Chateigner" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <div class="hero-social-sep"></div>
        <span class="hero-location"><i class="fas fa-map-marker-alt"></i> Orléans, France</span>
      </div>
    </div>

    <div class="hero-right" data-aos="fade-left" data-aos-delay="200">
      <span class="stack-label">Stack technique</span>
      <div class="stack-group">
        <span class="stack-tag tag-primary">.NET 8</span>
        <span class="stack-tag tag-primary">ASP.NET Core</span>
        <span class="stack-tag tag-primary">C#</span>
      </div>
      <div class="stack-group">
        <span class="stack-tag tag-secondary">REST APIs</span>
        <span class="stack-tag tag-secondary">SQL Server</span>
        <span class="stack-tag tag-secondary">xUnit</span>
      </div>
      <div class="stack-group">
        <span class="stack-tag tag-neutral">GitLab CI</span>
        <span class="stack-tag tag-neutral">Jenkins</span>
        <span class="stack-tag tag-neutral">SOLID</span>
        <span class="stack-tag tag-neutral">Clean Code</span>
      </div>
      <div class="stack-group">
        <span class="stack-tag tag-neutral">EDI</span>
        <span class="stack-tag tag-neutral">FTP/SFTP</span>
        <span class="stack-tag tag-neutral">Background Services</span>
      </div>
      <div class="stack-divider"></div>
      <div class="availability-pill">
        <span class="availability-dot"></span>
        En poste · Ouvert aux opportunités
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2 : Ajouter les styles hero dans `styles/style.css`**

```css
/* ── Hero ───────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 48px 60px;
}

.hero-inner {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero-eyebrow {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--secondary);
  margin-bottom: 16px;
}

.hero-name {
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 20px;
}
.hero-title strong { color: var(--text); font-weight: 600; }

.hero-desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 420px;
  margin-bottom: 32px;
}

.hero-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.hero-social {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hero-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.85rem;
  transition: border-color 0.2s, color 0.2s;
}
.hero-social a:hover { border-color: var(--secondary); color: var(--secondary); }
.hero-social-sep { width: 1px; height: 18px; background: rgba(255,255,255,0.08); margin: 0 4px; }
.hero-location { font-size: 0.78rem; color: #444; }
.hero-location i { margin-right: 5px; }

/* Stack technique */
.hero-right { display: flex; flex-direction: column; gap: 10px; }

.stack-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #383e4a;
  margin-bottom: 4px;
}

.stack-group { display: flex; flex-wrap: wrap; gap: 8px; }

.stack-tag {
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  animation: fadeSlide 0.4s ease both;
}

.tag-primary {
  background: rgba(123, 104, 238, 0.12);
  border: 1px solid rgba(123, 104, 238, 0.25);
  color: #a89cf5;
}
.tag-secondary {
  background: rgba(43, 224, 224, 0.08);
  border: 1px solid rgba(43, 224, 224, 0.18);
  color: #5fd6d6;
}
.tag-neutral {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
}

@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.stack-tag:nth-child(1) { animation-delay: 0.1s; }
.stack-tag:nth-child(2) { animation-delay: 0.2s; }
.stack-tag:nth-child(3) { animation-delay: 0.3s; }
.stack-tag:nth-child(4) { animation-delay: 0.4s; }
.stack-tag:nth-child(5) { animation-delay: 0.5s; }

.stack-divider { height: 1px; background: rgba(255,255,255,0.04); margin: 4px 0; }

.availability-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(43, 224, 224, 0.07);
  border: 1px solid rgba(43, 224, 224, 0.15);
  border-radius: 100px;
  padding: 6px 14px;
  font-size: 0.75rem;
  color: var(--secondary);
  width: fit-content;
}
.availability-dot {
  width: 6px; height: 6px;
  background: var(--secondary);
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

/* Hero responsive */
@media (max-width: 992px) {
  .hero { padding: 100px 24px 60px; }
  .hero-inner { grid-template-columns: 1fr; gap: 48px; }
  .hero-name { font-size: 2.8rem; }
}
@media (max-width: 576px) {
  .hero-name { font-size: 2.2rem; }
  .hero-buttons { flex-direction: column; }
  .btn-primary-custom, .btn-outline-custom { text-align: center; }
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

- Le hero occupe toute la hauteur de la fenêtre
- Texte à gauche, badges à droite
- Badges animés avec fadeSlide au chargement
- Pilule "Ouvert aux opportunités" avec point clignotant
- Sur mobile, les deux colonnes passent en une seule

- [ ] **Step 4 : Commit**

```bash
git add index.html styles/style.css
git commit -m "feat: hero section with tech stack badges"
```

---

## Task 5 : Section Projets

**Files:**
- Modify: `index.html` (section PROJECTS)
- Modify: `styles/style.css` (ajouter styles projets)

- [ ] **Step 1 : Remplacer le commentaire `<!-- PROJECTS -->` dans `index.html`**

```html
<!-- PROJECTS -->
<section id="projects">
  <div class="container-section">
    <div data-aos="fade-up">
      <span class="section-eyebrow">Réalisations</span>
      <h2 class="section-title">Mes projets</h2>
      <p class="section-sub">Des projets professionnels et personnels qui illustrent ma façon de concevoir et construire des logiciels.</p>
    </div>

    <div class="projects-grid" data-aos="fade-up" data-aos-delay="100">

      <!-- Transware -->
      <div class="project-card project-card--featured">
        <div class="project-card-header">
          <div class="project-icon project-icon--blue">⚙️</div>
          <span class="project-badge project-badge--pro">Professionnel</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-name">Transware</h3>
          <p class="project-tagline">TMS multi-transporteurs · Interlog Solutions</p>
          <p class="project-desc">
            Solution de gestion transport (TMS) construite sur <strong>.NET 8 / ASP.NET Core</strong>.
            Développement d'APIs REST, connecteurs EDI, intégrations FTP/SFTP et Background Services
            pour le traitement de flux logistiques. Base SQL Server <strong>~400 tables</strong>.
            CI avec GitLab + Jenkins, tests unitaires xUnit.
          </p>
          <div class="project-tags">
            <span class="project-tag tag-primary">.NET 8</span>
            <span class="project-tag tag-primary">ASP.NET Core</span>
            <span class="project-tag tag-secondary">SQL Server</span>
            <span class="project-tag tag-secondary">REST API</span>
            <span class="project-tag tag-neutral">EDI</span>
            <span class="project-tag tag-neutral">xUnit</span>
            <span class="project-tag tag-neutral">Jenkins</span>
          </div>
        </div>
        <div class="project-card-footer">
          <span class="project-proprietary">Code propriétaire — disponible sur demande</span>
        </div>
      </div>

      <!-- Aria -->
      <div class="project-card">
        <div class="project-card-header">
          <div class="project-icon project-icon--green">🎲</div>
          <span class="project-badge project-badge--perso">Personnel</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-name">Aria</h3>
          <p class="project-tagline">Plateforme de jeu de rôle en ligne</p>
          <p class="project-desc">
            Application web temps réel pour jeux de rôle sur table (TTRPG).
            Panel joueur, panel MJ, overlay OBS. Messagerie temps réel via <strong>Ably</strong>,
            persistance <strong>Supabase</strong>, animations de dés 3D, gestion de playlists musicales.
          </p>
          <div class="project-tags">
            <span class="project-tag tag-secondary">JavaScript</span>
            <span class="project-tag tag-secondary">Supabase</span>
            <span class="project-tag tag-neutral">Ably</span>
            <span class="project-tag tag-neutral">HTML/CSS</span>
          </div>
        </div>
        <div class="project-card-footer">
          <a href="https://github.com/Mathieu-Chateigner/Aria" target="_blank" rel="noopener" class="project-link">
            <i class="fab fa-github"></i> GitHub
          </a>
          <!-- Ajouter l'URL de démo si disponible : -->
          <!-- <a href="URL_DEMO" target="_blank" rel="noopener" class="project-link">
            <i class="fas fa-external-link-alt"></i> Démo live
          </a> -->
        </div>
      </div>

      <!-- Enigmates -->
      <div class="project-card">
        <div class="project-card-header">
          <div class="project-icon project-icon--orange">📍</div>
          <span class="project-badge project-badge--perso">Personnel</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-name">Enigmates</h3>
          <p class="project-tagline">Jeu mobile de chasse au trésor GPS</p>
          <p class="project-desc">
            Application mobile iOS/Android de <strong>chasse au trésor géolocalisée</strong>.
            Les joueurs naviguent vers des points physiques, prennent des photos et les soumettent.
            Navigation GPS, upload photo, backend <strong>Supabase</strong>.
          </p>
          <div class="project-tags">
            <span class="project-tag tag-secondary">React Native</span>
            <span class="project-tag tag-secondary">Expo</span>
            <span class="project-tag tag-secondary">Supabase</span>
            <span class="project-tag tag-neutral">iOS / Android</span>
          </div>
        </div>
        <div class="project-card-footer">
          <!-- Remplacer par l'URL GitHub réelle d'Enigmates -->
          <a href="https://github.com/Mathieu-Chateigner" target="_blank" rel="noopener" class="project-link">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2 : Ajouter les styles projets dans `styles/style.css`**

```css
/* ── Container utilitaire ───────────────────────── */
.container-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;
}

/* ── Projects ───────────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s, transform 0.25s;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-3px); }
.project-card:hover::before { opacity: 1; }

.project-card--featured { border-color: rgba(123, 104, 238, 0.2); }
.project-card--featured::before { opacity: 1; }

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.project-icon {
  width: 42px; height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
.project-icon--blue   { background: rgba(123,104,238,0.15); border: 1px solid rgba(123,104,238,0.2); }
.project-icon--green  { background: rgba(43,224,224,0.1);   border: 1px solid rgba(43,224,224,0.15); }
.project-icon--orange { background: rgba(249,115,22,0.1);   border: 1px solid rgba(249,115,22,0.15); }

.project-badge {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 100px;
}
.project-badge--pro   { background: rgba(123,104,238,0.12); color: #a89cf5; border: 1px solid rgba(123,104,238,0.2); }
.project-badge--perso { background: rgba(43,224,224,0.08);  color: #5fd6d6; border: 1px solid rgba(43,224,224,0.15); }

.project-card-body { display: flex; flex-direction: column; gap: 10px; flex: 1; }

.project-name { font-size: 1.1rem; font-weight: 700; }

.project-tagline { font-size: 0.8rem; color: var(--primary); font-weight: 500; }

.project-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.65; }
.project-desc strong { color: #9ca3af; font-weight: 500; }

.project-tags { display: flex; flex-wrap: wrap; gap: 6px; }

.project-tag {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 5px;
  font-weight: 500;
}

.project-card-footer {
  display: flex;
  gap: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.05);
  align-items: center;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--text-muted);
  transition: color 0.2s;
}
.project-link:hover { color: var(--text); }
.project-link i { font-size: 0.8rem; }

.project-proprietary {
  font-size: 0.75rem;
  color: #383e4a;
  font-style: italic;
}

/* Projects responsive */
@media (max-width: 992px) {
  .projects-grid { grid-template-columns: 1fr; }
  .container-section { padding: 0 24px; }
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

- 3 cartes en grille sur desktop
- Carte Transware avec ligne de couleur permanente en haut
- Hover : carte se lève légèrement, ligne de couleur apparaît sur les autres
- Sur mobile : 1 colonne

- [ ] **Step 4 : Commit**

```bash
git add index.html styles/style.css
git commit -m "feat: projects section with 3 real project cards"
```

---

## Task 6 : Section À propos

**Files:**
- Modify: `index.html` (section ABOUT)
- Modify: `styles/style.css` (ajouter styles about)

- [ ] **Step 1 : Remplacer le commentaire `<!-- ABOUT -->` dans `index.html`**

```html
<!-- ABOUT -->
<section id="about">
  <div class="container-section">
    <div data-aos="fade-up">
      <span class="section-eyebrow">Parcours</span>
      <h2 class="section-title">À propos</h2>
    </div>

    <div class="about-grid">

      <div class="about-left" data-aos="fade-right">
        <p class="about-bio">
          Développeur C# .NET Core backend, je me spécialise dans la conception d'applications
          robustes et maintenables — APIs REST, architecture en couches, traitements batch,
          intégrations métier. J'accorde une attention particulière aux principes SOLID et
          au Clean Code.
        </p>
        <p class="about-bio">
          Passionné par la construction de systèmes qui durent, je travaille actuellement chez
          Interlog Solutions sur Transware, une solution TMS multi-transporteurs en .NET 8.
        </p>
        <div class="about-interests">
          <span class="interest-tag"><i class="fas fa-robot"></i> IA &amp; automatisation</span>
          <span class="interest-tag"><i class="fas fa-cube"></i> Impression 3D</span>
          <span class="interest-tag"><i class="fas fa-tools"></i> Réparation matériel</span>
          <span class="interest-tag"><i class="fas fa-trophy"></i> Champion de France trampoline</span>
        </div>
        <a href="assets/cv-mathieu-chateigner.pdf" download class="btn-primary-custom about-cv-btn">
          <i class="fas fa-download me-2"></i>Télécharger le CV
        </a>
      </div>

      <div class="about-right" data-aos="fade-left" data-aos-delay="100">
        <div class="timeline">

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">Oct. 2024 → Présent</span>
              <h4 class="timeline-title">Analyste Développeur C#</h4>
              <p class="timeline-company">Interlog Solutions · Orléans</p>
              <p class="timeline-desc">
                Développement de Transware (.NET 8 / ASP.NET Core) : APIs REST, connecteurs EDI,
                Background Services, SQL Server (~400 tables), CI Jenkins/GitLab, xUnit.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">Sept. 2023 → Sept. 2024</span>
              <h4 class="timeline-title">VR Software Engineer</h4>
              <p class="timeline-company">Hologame · Hénin-Beaumont</p>
              <p class="timeline-desc">
                Développement de jeux VR multijoueurs temps réel sous Unity (C#). Gestion des
                synchronisations réseau et mécaniques de gameplay sur casques Pico Neo 3 Pro.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">Oct. 2022 → Sept. 2023</span>
              <h4 class="timeline-title">Développeur Application Mobile</h4>
              <p class="timeline-company">Atelier Pandore · Strasbourg</p>
              <p class="timeline-desc">
                Développement d'expériences en réalité augmentée sous Unity (C#),
                jeu de navigation style Pokémon GO.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">Oct. 2021 → Sept. 2022</span>
              <h4 class="timeline-title">Développeur C# (alternance)</h4>
              <p class="timeline-company">Interlog · Orléans</p>
              <p class="timeline-desc">
                Outil web interne de déploiement applicatif en ASP.NET Core, manipulation
                de bases SQL Server, debug et refactoring.
              </p>
            </div>
          </div>

          <div class="timeline-item timeline-item--edu">
            <div class="timeline-dot timeline-dot--edu"></div>
            <div class="timeline-content">
              <span class="timeline-year">2024</span>
              <h4 class="timeline-title">BAC+5 · RNCP Niveau 7</h4>
              <p class="timeline-company">ESGI Paris</p>
              <p class="timeline-desc">
                Double diplôme Expert en Ingénierie Informatique et Ingénierie de la Réalité
                Virtuelle et Jeux Vidéo.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2 : Ajouter les styles about dans `styles/style.css`**

```css
/* ── About ──────────────────────────────────────── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 64px;
  align-items: start;
  margin-top: 48px;
}

.about-bio {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 20px;
}

.about-interests {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.interest-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--text-muted);
}
.interest-tag i { color: var(--secondary); font-size: 0.75rem; }

.about-cv-btn { margin-top: 4px; }

/* Timeline */
.timeline { display: flex; flex-direction: column; gap: 0; position: relative; }

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: linear-gradient(to bottom, var(--primary), transparent);
}

.timeline-item {
  display: flex;
  gap: 20px;
  padding-bottom: 28px;
  position: relative;
}
.timeline-item:last-child { padding-bottom: 0; }

.timeline-dot {
  width: 15px; height: 15px;
  min-width: 15px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid var(--dark-bg);
  margin-top: 4px;
  z-index: 1;
}
.timeline-dot--edu { background: var(--secondary); }

.timeline-content { flex: 1; }

.timeline-year {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--secondary);
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.timeline-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.timeline-company {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 6px;
}

.timeline-desc {
  font-size: 0.82rem;
  color: #4b5563;
  line-height: 1.6;
}

/* About responsive */
@media (max-width: 992px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
}
```

- [ ] **Step 3 : Créer un placeholder PDF pour éviter un 404 sur le bouton CV**

```bash
# Créer un fichier vide en attendant le vrai PDF
echo "placeholder" > assets/cv-mathieu-chateigner.pdf
```

Note : remplacer ce fichier par le vrai PDF avant mise en production.

- [ ] **Step 4 : Vérifier dans le navigateur**

- Layout 2 colonnes : bio à gauche, timeline à droite
- Timeline avec ligne verticale et dots colorés
- Bouton "Télécharger le CV" présent
- Sur mobile : 1 colonne

- [ ] **Step 5 : Commit**

```bash
git add index.html styles/style.css assets/cv-mathieu-chateigner.pdf
git commit -m "feat: about section with experience timeline"
```

---

## Task 7 : Contact et Footer

**Files:**
- Modify: `index.html` (sections CONTACT et FOOTER)
- Modify: `styles/style.css` (ajouter styles contact et footer)

- [ ] **Step 1 : Remplacer les commentaires `<!-- CONTACT -->` et `<!-- FOOTER -->` dans `index.html`**

```html
<!-- CONTACT -->
<section id="contact">
  <div class="container-section">
    <div data-aos="fade-up" style="text-align:center;">
      <span class="section-eyebrow">Contact</span>
      <h2 class="section-title">Me contacter</h2>
      <p class="section-sub" style="margin:0 auto 52px;">
        Une opportunité, un projet, une question — n'hésitez pas.
      </p>
    </div>

    <div class="contact-grid" data-aos="fade-up" data-aos-delay="100">

      <a href="mailto:mat.chateigner@gmail.com" class="contact-card">
        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
        <h4>Email</h4>
        <span>mat.chateigner@gmail.com</span>
      </a>

      <a href="https://www.linkedin.com/in/mchateigner/" target="_blank" rel="noopener" class="contact-card">
        <div class="contact-icon"><i class="fab fa-linkedin-in"></i></div>
        <h4>LinkedIn</h4>
        <span>mchateigner</span>
      </a>

      <a href="https://github.com/Mathieu-Chateigner" target="_blank" rel="noopener" class="contact-card">
        <div class="contact-icon"><i class="fab fa-github"></i></div>
        <h4>GitHub</h4>
        <span>Mathieu-Chateigner</span>
      </a>

    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-socials">
      <a href="https://www.linkedin.com/in/mchateigner/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      <a href="https://github.com/Mathieu-Chateigner" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
    </div>
    <p class="footer-copy">&copy; 2026 Mathieu Chateigner</p>
  </div>
</footer>
```

- [ ] **Step 2 : Ajouter les styles contact et footer dans `styles/style.css`**

```css
/* ── Contact ────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.contact-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.25s, border-color 0.25s;
  color: var(--text);
}
.contact-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.12); color: var(--text); }

.contact-icon {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 4px;
}

.contact-card h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

.contact-card span {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Contact responsive */
@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; max-width: 360px; }
}

/* ── Footer ─────────────────────────────────────── */
.site-footer {
  background: var(--darker-bg);
  padding: 32px 0;
  border-top: 1px solid var(--border);
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.footer-socials { display: flex; gap: 12px; }

.footer-socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.85rem;
  transition: border-color 0.2s, color 0.2s;
}
.footer-socials a:hover { border-color: var(--secondary); color: var(--secondary); }

.footer-copy {
  font-size: 0.78rem;
  color: #383e4a;
  margin: 0;
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

- 3 cartes de contact en grille, centrées
- Hover : légère élévation
- Footer sobre avec icônes sociales et copyright
- Section Contact centrée sur la page

- [ ] **Step 4 : Commit**

```bash
git add index.html styles/style.css
git commit -m "feat: contact section and footer"
```

---

## Task 8 : Finalisation et vérification complète

**Files:**
- Modify: `scripts/main.js` (ajout active nav link au scroll)
- Modify: `index.html` (vérifications finales)

- [ ] **Step 1 : Mettre à jour `scripts/main.js` pour surligner le lien actif dans la navbar**

```js
// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// AOS init
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, offset: 80 });
});
```

- [ ] **Step 2 : Ajouter le style du lien actif dans `styles/style.css`**

```css
.nav-link.active { color: var(--text); }
```

- [ ] **Step 3 : Vérification complète dans le navigateur**

Checklist visuelle :
- [ ] Navbar se compacte au scroll
- [ ] Lien de nav se met en blanc quand la section correspondante est visible
- [ ] Hero : deux colonnes, badges animés, pilule clignotante
- [ ] Projets : 3 cartes, hover fonctionnel, ligne de couleur sur Transware
- [ ] À propos : timeline avec ligne verticale et dots
- [ ] Contact : 3 cartes, liens fonctionnels (email, LinkedIn, GitHub)
- [ ] Footer : icônes sociales fonctionnelles
- [ ] Mobile (DevTools, 375px) : tout passe en 1 colonne, burger menu fonctionne
- [ ] Aucune erreur dans la console

- [ ] **Step 4 : Remplacer le PDF placeholder par le vrai CV**

Copier le fichier `CV_Mathieu_Chateigner.pdf` dans `assets/cv-mathieu-chateigner.pdf`.

```bash
cp "chemin/vers/CV_Mathieu_Chateigner.pdf" assets/cv-mathieu-chateigner.pdf
```

- [ ] **Step 5 : Commit final**

```bash
git add index.html styles/style.css scripts/main.js assets/cv-mathieu-chateigner.pdf
git commit -m "feat: complete portfolio rewrite — nav active state, final polish"
```

- [ ] **Step 6 : Vérifier le déploiement GitHub Pages**

Pusher sur `main` et attendre ~2 minutes :

```bash
git push origin main
```

Ouvrir `https://mathieu-chateigner.github.io` et vérifier que la page se charge correctement.

---

## Assets à préparer avant mise en production

| Asset | Emplacement | Statut |
|---|---|---|
| PDF du CV | `assets/cv-mathieu-chateigner.pdf` | À remplacer (placeholder actuel) |
| URL GitHub Enigmates | `index.html` ligne project-card Enigmates | À renseigner |
| URL démo live Aria | `index.html` ligne project-card Aria (commentée) | Optionnel, à décommenter si dispo |
