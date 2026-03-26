function detectTech() {
  const results = [];
  const html = document.documentElement.innerHTML;
  const scripts = Array.from(document.querySelectorAll("script[src]")).map(
    (s) => s.src,
  );
  const allScripts = scripts.join(" ");

  function check(name, category, color, tests) {
    const found = tests.some((test) => {
      try {
        if (typeof test === "function") return test();
        if (typeof test === "string")
          return html.includes(test) || allScripts.includes(test);
      } catch {
        return false;
      }
      return false;
    });
    if (found) results.push({ name, category, color });
  }

  // universal react fiber check — works on ALL vite/production builds
  function hasReactFiber() {
    const all = document.querySelectorAll("*");
    for (let el of all) {
      try {
        const keys = Object.keys(el);
        if (
          keys.some(
            (k) =>
              k.startsWith("__reactFiber") ||
              k.startsWith("__reactInternalInstance") ||
              k.startsWith("__reactEventHandlers") ||
              k.startsWith("__reactProps"),
          )
        )
          return true;
      } catch {
        continue;
      }
    }
    return false;
  }

  // universal vue check
  function hasVueFiber() {
    const all = document.querySelectorAll("*");
    for (let el of all) {
      try {
        const keys = Object.keys(el);
        if (
          keys.some(
            (k) =>
              k.startsWith("__vue") ||
              k.startsWith("__vueParentComponent") ||
              k === "_vei",
          )
        )
          return true;
      } catch {
        continue;
      }
    }
    return false;
  }

  // ── JS Frameworks ──────────────────────────────────
  check("React", "JS Framework", "#61DAFB", [
    () => !!window.React,
    () => !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.size > 0,
    () => hasReactFiber(),
    () => !!document.querySelector("[data-reactroot],[data-reactid]"),
    "react-dom",
    "react.production",
    "react@",
  ]);

  check("Vue.js", "JS Framework", "#42B883", [
    () => !!window.Vue,
    () => !!window.__VUE__,
    () => hasVueFiber(),
    () => !!document.querySelector("[data-v-app]"),
    "vue.min.js",
    "vue.runtime",
    "/vue@",
    "vue.esm",
  ]);

  check("Angular", "JS Framework", "#DD0031", [
    () => !!window.ng,
    () => !!window.getAllAngularRootElements,
    () => !!document.querySelector("[ng-version]"),
    () => !!document.querySelector("app-root"),
    () => {
      const all = document.querySelectorAll("*");
      for (let el of all) {
        try {
          if (Object.keys(el).some((k) => k.startsWith("__ngContext")))
            return true;
        } catch {
          continue;
        }
      }
      return false;
    },
    "angular.min.js",
    "@angular/core",
  ]);

  check("Svelte", "JS Framework", "#FF3E00", [
    () => !!window.__svelte,
    () => !!document.querySelector("[class*='svelte-']"),
    () => {
      const all = document.querySelectorAll("*");
      for (let el of all) {
        try {
          if (Object.keys(el).some((k) => k.startsWith("__svelte")))
            return true;
        } catch {
          continue;
        }
      }
      return false;
    },
    "svelte/",
    ".svelte.",
    "svelte@",
  ]);

  check("Solid.js", "JS Framework", "#2C4F7C", [
    () => !!window.Solid,
    () => !!window._$HY,
    () => {
      const all = document.querySelectorAll("*");
      for (let el of all) {
        try {
          if (Object.keys(el).some((k) => k.startsWith("$$"))) return true;
        } catch {
          continue;
        }
      }
      return false;
    },
    "solid-js",
    "/solid@",
  ]);

  check("Qwik", "JS Framework", "#AC7EF4", [
    () => !!window.qwik,
    () => !!document.querySelector("[q\\:container]"),
    "qwik",
    "/qwikloader",
    "q:container",
  ]);

  // ── Meta Frameworks ────────────────────────────────
  check("Next.js", "Meta Framework", "#ffffff", [
    () => !!window.__NEXT_DATA__,
    () => !!window.next,
    () => !!document.querySelector("#__NEXT_DATA__"),
    () => !!document.querySelector("[data-nextjs-scroll-focus-boundary]"),
    "/_next/static/",
    "__NEXT_DATA__",
    "_next/",
  ]);

  check("Nuxt.js", "Meta Framework", "#00DC82", [
    () => !!window.__nuxt,
    () => !!window.__NUXT__,
    () => !!window.useNuxtApp,
    () => !!document.querySelector("#__nuxt"),
    "/_nuxt/",
    "__NUXT__",
  ]);

  check("Remix", "Meta Framework", "#ffffff", [
    () => !!window.__remixContext,
    () => !!window.__remixRouteModules,
    "__remixContext",
    "/build/root-",
  ]);

  check("Astro", "Meta Framework", "#FF5D01", [
    () => !!document.querySelector("[data-astro-cid]"),
    () => !!document.querySelector("astro-island"),
    () => !!document.querySelector("[data-astro-source-file]"),
    "_astro/",
    "astro",
  ]);

  check("SvelteKit", "Meta Framework", "#FF3E00", [
    () => !!window.__sveltekit_dev,
    () => !!window.__sveltekit__,
    () => !!window.___SVELTEKIT_APP_VERSION___,
    "/_app/immutable/",
    "__sveltekit",
  ]);

  // ── Animation ──────────────────────────────────────
  check("GSAP", "Animation", "#88CE02", [
    () => !!window.gsap,
    () => !!window.TweenMax,
    () => !!window.TweenLite,
    () => !!window.TimelineMax,
    "gsap.min.js",
    "gsap.core",
    "/gsap@",
    "cdnjs.cloudflare.com/ajax/libs/gsap",
  ]);

  check("Framer Motion", "Animation", "#BB4EFF", [
    () => !!document.querySelector("[data-framer-component-type]"),
    () => !!document.querySelector("[data-framer-name]"),
    () => !!document.querySelector("[style*='--framer']"),
    () => hasReactFiber() && html.includes("framer-motion"),
    "framer-motion",
    "framer.com/motion",
  ]);

  check("Lenis", "Animation", "#a0f0c0", [
    () => !!window.Lenis,
    () => !!window.lenis,
    () => !!document.querySelector("[data-lenis-prevent]"),
    () => !!document.querySelector("html[class*='lenis']"),
    "lenis",
    "@studio-freight/lenis",
    "lenis@",
  ]);

  check("AOS", "Animation", "#FFD700", [
    () => !!window.AOS,
    () => !!document.querySelector("[data-aos]"),
    "aos.js",
    "aos.min.js",
    "aos@",
  ]);

  check("ScrollReveal", "Animation", "#FF6B6B", [
    () => !!window.ScrollReveal,
    () => !!document.querySelector("[data-sr-id]"),
    "scrollreveal.min.js",
    "scrollreveal@",
  ]);

  check("Anime.js", "Animation", "#FF6384", [
    () => !!window.anime,
    "animejs",
    "anime.min.js",
    "anime@",
  ]);

  check("Motion One", "Animation", "#c8c8c8", [
    () => !!window.Motion,
    "@motionone/",
    "motion-one",
    "motion/react",
  ]);

  // ── Slider / Carousel ──────────────────────────────
  check("Swiper", "Slider", "#0080FF", [
    () => !!window.Swiper,
    () =>
      !!document.querySelector(".swiper, .swiper-container, .swiper-wrapper"),
    "swiper",
    "swiper.min.js",
    "/swiper@",
  ]);

  check("Splide", "Slider", "#e02020", [
    () => !!window.Splide,
    () => !!document.querySelector(".splide"),
    "splide.min.js",
    "@splidejs",
  ]);

  check("Embla Carousel", "Slider", "#9ca3af", [
    () => !!document.querySelector("[class*='embla']"),
    "embla-carousel",
    "embla_carousel",
  ]);

  check("Slick", "Slider", "#50b3f0", [
    () => !!window.$ && !!window.$.fn?.slick,
    () => !!document.querySelector(".slick-slider, .slick-track"),
    "slick.min.js",
    "slick-carousel",
  ]);

  check("Keen Slider", "Slider", "#FFB300", [
    () => !!document.querySelector("[class*='keen-slider']"),
    "keen-slider",
    "keen_slider",
  ]);

  // ── Styling ────────────────────────────────────────
  check("Tailwind CSS", "Styling", "#06B6D4", [
    "cdn.tailwindcss.com",
    "tailwind",
    () => !!document.querySelector("[class*='tw-']"),
    () =>
      (
        html.match(
          /class="[^"]*(?:px-|py-|text-\w+-\d|bg-\w+-\d|flex |grid )[^"]*"/g,
        ) || []
      ).length > 5,
    () => {
      const sheets = Array.from(document.styleSheets);
      return sheets.some((s) => {
        try {
          return s.href && s.href.includes("tailwind");
        } catch {
          return false;
        }
      });
    },
  ]);

  check("Bootstrap", "Styling", "#7952B3", [
    "bootstrap.min.css",
    "bootstrap.css",
    "cdn.jsdelivr.net/npm/bootstrap",
    () => !!document.querySelector(".container, .row, .col-md, .btn-primary"),
  ]);

  check("Styled Components", "Styling", "#DB7093", [
    () => !!document.querySelector("style[data-styled]"),
    () => !!document.querySelector("style[data-styled-version]"),
    "styled-components",
  ]);

  check("CSS Modules", "Styling", "#6366f1", [
    () => {
      const all = document.querySelectorAll("[class]");
      let count = 0;
      for (let el of all) {
        if (
          [...el.classList].some((c) =>
            /^[a-zA-Z]+_[a-zA-Z]+__[a-zA-Z0-9]{4,}$/.test(c),
          )
        )
          count++;
        if (count > 3) return true;
      }
      return false;
    },
  ]);

  // ── UI Libraries ───────────────────────────────────
  check("Material UI", "UI Library", "#007FFF", [
    () => !!document.querySelector("[class*='Mui']"),
    "@mui/material",
    "material-ui",
  ]);

  check("Chakra UI", "UI Library", "#319795", [
    () => !!document.querySelector("[class*='chakra-']"),
    "@chakra-ui",
    "chakra-ui",
  ]);

  check("Radix UI", "UI Library", "#8b8b8b", [
    () => !!document.querySelector("[data-radix-popper-content-wrapper]"),
    () => !!document.querySelector("[data-radix-collection-item]"),
    () => !!document.querySelector("[data-radix-scroll-area-viewport]"),
    "@radix-ui",
    "radix-ui",
  ]);

  check("shadcn/ui", "UI Library", "#ffffff", [
    () =>
      !!document.querySelector("[data-radix-popper-content-wrapper]") &&
      html.includes("tailwind"),
    "shadcn",
    "@shadcn",
  ]);

  check("Mantine", "UI Library", "#339AF0", [
    () => !!document.querySelector("[class*='mantine-']"),
    "@mantine/core",
    "mantine",
  ]);

  check("Headless UI", "UI Library", "#60a5fa", [
    () => !!document.querySelector("[data-headlessui-state]"),
    "@headlessui",
    "headlessui",
  ]);

  // ── 3D / Canvas ────────────────────────────────────
  check("Three.js", "3D / Canvas", "#049EF4", [
    () => !!window.THREE,
    () => !!document.querySelector("canvas") && !!window.THREE,
    "three.min.js",
    "three.module",
    "/three@",
  ]);

  check("Spline", "3D / Canvas", "#5B6AF0", [
    () => !!document.querySelector("spline-viewer"),
    () => !!document.querySelector("canvas[data-engine*='spline']"),
    "spline",
    "@splinetool/",
  ]);

  check("p5.js", "3D / Canvas", "#ED225D", [
    () => !!window.p5,
    "p5.min.js",
    "/p5@",
  ]);

  check("Babylon.js", "3D / Canvas", "#BB464B", [
    () => !!window.BABYLON,
    "babylon.js",
    "babylonjs",
  ]);

  // ── State Management ───────────────────────────────
  check("Redux", "State", "#764ABC", [
    () => !!window.__REDUX_DEVTOOLS_EXTENSION__,
    () => !!window.__REDUX_STORE__,
    () => !!window.reduxStore,
    "redux.min.js",
    "react-redux",
    "/redux@",
  ]);

  check("Zustand", "State", "#c47f17", ["zustand", "/zustand@"]);

  check("Jotai", "State", "#6b7280", ["jotai", "/jotai@"]);

  check("Recoil", "State", "#1877F2", [
    () => !!window.__recoilSnapshot,
    "recoil",
    "/recoil@",
  ]);

  check("MobX", "State", "#FF7102", [() => !!window.mobx, "mobx", "/mobx@"]);

  // ── Data Fetching ──────────────────────────────────
  check("React Query", "Data Fetching", "#FF4154", [
    () => !!window.__REACT_QUERY_STATE__,
    () => !!window.__tanstack_query_client,
    "@tanstack/react-query",
    "react-query",
  ]);

  check("SWR", "Data Fetching", "#c8c8c8", ["swr", "/swr@"]);

  check("Axios", "Data Fetching", "#5A29E4", [
    () => !!window.axios,
    "axios.min.js",
    "/axios@",
  ]);

  check("tRPC", "Data Fetching", "#398CCB", ["@trpc/", "trpc"]);

  // ── Build Tools ────────────────────────────────────
  check("Vite", "Build Tool", "#646CFF", [
    "/@vite/client",
    "__vite__",
    "@vite/",
    () => !!document.querySelector('script[type="module"][src*="vite"]'),
    () => allScripts.includes("@vite") || allScripts.includes("vite"),
  ]);

  check("Webpack", "Build Tool", "#8DD6F9", [
    () => !!window.webpackChunk,
    () => !!window.webpackJsonp,
    () => !!window.__webpack_require__,
    () => Object.keys(window).some((k) => k.startsWith("webpackChunk")),
  ]);

  check("Turbopack", "Build Tool", "#FF3366", ["__turbopack", "turbopack"]);

  // ── Backend / Services ─────────────────────────────
  check("Firebase", "Backend", "#FFCA28", [
    () => !!window.firebase,
    () => !!window.__FIREBASE_DEFAULTS__,
    "firebaseapp.com",
    "firestore.googleapis.com",
  ]);

  check("Supabase", "Backend", "#3ECF8E", [
    () => !!window.supabase,
    () => !!window.__supabase,
    "supabase.co",
    "supabase",
  ]);

  check("Sanity", "CMS", "#F03E2F", ["sanity.io", "sanitycdn.com"]);

  check("WordPress", "CMS", "#21759B", [
    "/wp-content/",
    "/wp-includes/",
    () =>
      !!document.querySelector('meta[name="generator"][content*="WordPress"]'),
  ]);

  check("Shopify", "E-commerce", "#96BF48", [
    () => !!window.Shopify,
    "cdn.shopify.com",
  ]);

  check("Webflow", "No-code", "#4353FF", [
    "webflow.com",
    ".wf-",
    () =>
      !!document.querySelector('meta[name="generator"][content*="Webflow"]'),
  ]);

  // ── Utilities ──────────────────────────────────────
  check("jQuery", "Library", "#0769AD", [
    () => !!window.jQuery,
    () => !!window.$?.fn?.jquery,
    "jquery.min.js",
    "code.jquery.com",
  ]);

  check("Lodash", "Library", "#3492ff", [
    () => !!window._?.VERSION,
    "lodash.min.js",
    "/lodash@",
  ]);

  check("GSAP ScrollTrigger", "Library", "#88CE02", [
    () => !!window.ScrollTrigger,
    "ScrollTrigger",
    "scrolltrigger",
  ]);

  return results;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "detect") {
    // wait for page to fully render before scanning
    if (document.readyState === "complete") {
      sendResponse({ techs: detectTech() });
    } else {
      window.addEventListener("load", () => {
        sendResponse({ techs: detectTech() });
      });
    }
  }
  return true;
});
