# Anirban Santra — Portfolio

A premium, modern portfolio website for **Anirban Santra** — AI/ML & Computer Vision Developer.

Built as a fast, responsive static website deployable directly to **GitHub Pages**.

---

## ✨ Features

- **Premium Design** — Deep teal & warm terracotta palette with warm ivory backgrounds
- **Dark / Light Mode** — System preference detection + localStorage persistence
- **Scroll Progress Indicator** — Thin, subtle progress bar at the top
- **Interactive Timeline** — Polished vertical experience timeline
- **Project Cards** — Expandable details with technology tags
- **Research Section** — Paper-style layout with BibTeX citation modal + copy
- **Skills Taxonomy** — Categorized chip-based layout (no percentage bars)
- **Canvas Animation** — Subtle network/particle background in the hero
- **Scroll Reveal** — Fade-up animations with staggered delays
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Print-Friendly** — Clean print stylesheet
- **Accessibility** — Semantic HTML, ARIA labels, focus states, `prefers-reduced-motion`
- **SEO** — Open Graph, Twitter Cards, meta descriptions, semantic headings
- **Contact Form** — Frontend-ready, with documented backend integration options

---

## 🛠 Technology Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Structure    | HTML5 (Semantic)                    |
| Styling      | CSS3 (Custom Properties, Flexbox, Grid) |
| Interaction  | Vanilla JavaScript (ES6+)          |
| Typography   | Google Fonts (Space Grotesk, Inter, JetBrains Mono) |
| Icons        | Inline SVG (Feather-style)          |
| Animation    | CSS transitions + Canvas API        |
| Deployment   | GitHub Pages (static)               |

---

## 📁 Folder Structure

```
AS Portfolio/
├── index.html                    # Main HTML page
├── README.md                     # This file
├── css/
│   └── styles.css                # Complete CSS design system
├── js/
│   └── main.js                   # JavaScript interactions
└── assets/
    ├── icons/
    │   └── favicon.svg           # SVG favicon
    ├── images/                   # Image assets (add your own)
    └── Anirban-Santra-CV.pdf     # Your CV (add your own)
```

---

## 🚀 Local Development

No build tools required. Simply open `index.html` in a browser.

### Option 1: Direct file

Double-click `index.html` or open it in your browser.

### Option 2: Local server (recommended for development)

Using Python:
```bash
cd "AS Portfolio"
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000)

Using Node.js:
```bash
npx serve .
```

Using VS Code:
Install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

---

## ✏️ How to Customize Content

All content is in `index.html`. The file is structured with clearly labeled HTML comment blocks for each section:

- `<!-- HERO SECTION -->`
- `<!-- ABOUT SECTION -->`
- `<!-- EXPERIENCE SECTION -->`
- `<!-- PROJECTS SECTION -->`
- `<!-- RESEARCH & PUBLICATIONS -->`
- `<!-- SKILLS SECTION -->`
- `<!-- EDUCATION SECTION -->`
- `<!-- CONTACT SECTION -->`

### Changing Colors

Edit CSS custom properties in `css/styles.css` under `:root` (light mode) and `[data-theme="dark"]` (dark mode).

### Changing Fonts

Update the `@import` URL in `css/styles.css` and the corresponding `--font-heading` / `--font-body` variables.

---

## 📄 How to Add Your CV

1. Export your CV as a PDF
2. Name it `Anirban-Santra-CV.pdf`
3. Place it in the `assets/` directory
4. The "Download CV" buttons will automatically work

---

## 📬 How to Configure the Contact Form

The contact form is currently **frontend-only**. To make it functional, choose one of:

### Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the `<form>` tag
4. Remove the JavaScript `submit` event listener in `main.js`

### EmailJS
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create a service + template
3. Add their SDK script and update the form submit handler in `main.js`

### Netlify Forms
1. Add `netlify` attribute to the `<form>` tag
2. Deploy to Netlify instead of GitHub Pages

### Web3Forms
1. Sign up at [web3forms.com](https://web3forms.com)
2. Add `action="https://api.web3forms.com/submit"` and your access key as a hidden input

---

## 🌐 GitHub Pages Deployment

### Step 1: Create a GitHub repository

```bash
cd "AS Portfolio"
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

### Step 3: Access your site

Your portfolio will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

> **Note:** Update the `<link rel="canonical">` and `<meta property="og:url">` tags in `index.html` with your actual URL.

---

## 📋 Checklist Before Deployment

- [ ] Add your CV PDF to `assets/Anirban-Santra-CV.pdf`
- [ ] Update canonical URL and OG URL meta tags
- [ ] Connect the contact form to a backend service
- [ ] Test on mobile devices
- [ ] Verify dark/light mode works correctly
- [ ] Check all external links open correctly
- [ ] Ensure no console errors
- [ ] Test print view (Ctrl+P)

---

## 📝 License

© 2026 Anirban Santra. All rights reserved.
