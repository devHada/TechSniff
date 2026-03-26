# ⚗️ TechSniff

> A Chrome extension built for frontend devs — instantly see what JS frameworks, animation libraries, UI kits and more any website is running.

![TechSniff Preview](preview.png)

---

## The Problem

You land on a website with a buttery smooth scroll animation or a slick transition and your first thought is — _what library is that?_

You open Wappalyzer. It tells you the site uses HTTP/3, Google Font API, and a CDN. Cool. Useless.

**TechSniff is different.** It's built by a frontend dev, for frontend devs. It tells you the site uses GSAP + Lenis + Swiper + Tailwind — the stuff you actually care about.

---

## ✨ What It Detects

| Category        | Libraries                                                           |
| --------------- | ------------------------------------------------------------------- |
| JS Frameworks   | React, Vue.js, Angular, Svelte, Solid.js, Qwik                      |
| Meta Frameworks | Next.js, Nuxt.js, Remix, Astro, SvelteKit                           |
| Animation       | GSAP, Framer Motion, Lenis, AOS, ScrollReveal, Anime.js, Motion One |
| Slider          | Swiper, Splide, Embla, Slick, Keen Slider                           |
| Styling         | Tailwind CSS, Bootstrap, Styled Components, CSS Modules             |
| UI Libraries    | Material UI, Chakra UI, Radix UI, shadcn/ui, Mantine, Headless UI   |
| 3D / Canvas     | Three.js, Spline, p5.js, Babylon.js                                 |
| State           | Redux, Zustand, Jotai, Recoil, MobX                                 |
| Data Fetching   | React Query, SWR, Axios, tRPC                                       |
| Build Tools     | Vite, Webpack, Turbopack                                            |
| Backend         | Firebase, Supabase, Sanity, WordPress, Shopify, Webflow             |

---

## 📥 Install

> No Chrome Web Store yet — manual install takes under 2 minutes.

### Step 1 — Download

**[⬇️ Download TechSniff v1.0.0 (dist.zip)](https://github.com/devHada/TechSniff/releases/download/v1.0.0/dist.zip)**

### Step 2 — Extract

Unzip the downloaded file anywhere on your computer.

### Step 3 — Load in Chrome or Brave

1. Open Chrome → go to `chrome://extensions`
   _(Brave → `brave://extensions`)_
2. Turn on **Developer Mode** — toggle in the top right corner
3. Click **Load unpacked**
4. Select the extracted `dist` folder

✅ Done! Pin TechSniff from your extensions toolbar and click it on any website.

---

## 🔍 How Detection Works

TechSniff injects a lightweight content script into every webpage that scans for tech fingerprints using three methods:

**1. Window globals**
Frameworks like GSAP, React, and Swiper expose themselves on the `window` object. If `window.gsap` exists — GSAP is on the page.

**2. DOM attributes**
Frameworks leave fingerprints in the HTML. Vue adds `data-v-app`, React adds `data-reactroot`, AOS adds `data-aos` to animated elements. TechSniff scans for all of these.

**3. Script URL patterns**
If a site loads a library from a CDN, the script tag src will contain the library name. TechSniff scans all script tags for known patterns.

**Bonus — React Fiber detection**
React internally attaches keys starting with `__reactFiber` to every DOM element, even in production Vite builds where `window.React` doesn't exist. TechSniff scans for these keys to reliably detect React on any site.

---

## ⚠️ Known Limitations

**Bundled libraries may not be detected**
When a site uses Vite or Webpack, all libraries get merged into a single minified JS file. There's no separate script URL to scan and no readable code to analyze. This is a fundamental limitation of client-side detection — even Wappalyzer has this problem. The only real solution is source map analysis or runtime module interception, which is planned for a future version.

**Chrome internal pages**
TechSniff can't scan `chrome://` pages, browser settings, or the extensions page itself. This is a Chrome security restriction, not a bug.

**No server-side detection yet**
Technologies like Node.js, Python, or PHP running on the server can't be detected from the browser DOM alone. Header detection via a background service worker is planned for v1.2.

**No version numbers yet**
TechSniff tells you a site uses React — not which version. Version detection is on the roadmap.

---

## 🚧 Still In Development

TechSniff is actively being developed. This is v1.0 — a solid foundation but far from the final product.

The core detection engine works well for CDN-loaded and globally exposed libraries. What's coming next is deeper detection — header analysis for server-side tech, version identification, and eventually an AI-powered approach to detect bundled libraries that currently leave no fingerprints.

If you find a site where TechSniff misses something obvious, or you want a library added — [open an issue](https://github.com/devHada/TechSniff/issues) and it'll go straight into the next version. Every suggestion helps the project get better.

---

## 🗺️ Roadmap

- [x] v1.0 — Core detection engine, 50+ libraries, React + Tailwind + Framer Motion UI
- [ ] v1.1 — Chrome Web Store listing
- [ ] v1.2 — Header detection for server-side tech
- [ ] v1.3 — Version numbers (React 18.2, not just React)
- [ ] v1.4 — AI-powered detection for bundled libraries

---

## 🛠️ Built With

- **React 19** — popup UI
- **Tailwind CSS v4** — styling
- **Framer Motion** — animations
- **Vite** — build tool
- **@crxjs/vite-plugin** — Chrome extension packaging

---

## 💻 Run Locally

```bash
git clone https://github.com/devHada/TechSniff.git
cd TechSniff
npm install
npm run build
```

Load the `/dist` folder in `chrome://extensions` with Developer Mode ON.

---

## 🤝 Contributing

Found a site where detection fails? Want a library added?

**[Open an issue →](https://github.com/devHada/TechSniff/issues)**

All feedback goes directly into the next version.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<p align="center">
  Built by <a href="https://devhada.vercel.app">Dev Hada</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/devHada">GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://linkedin.com/in/devhada">LinkedIn</a>
</p>
