function detectTech() {
  const results = [];
  const html = document.documentElement.innerHTML;
  const scripts = Array.from(document.querySelectorAll("script[src]")).map(
    (s) => s.src,
  );
  const allScripts = scripts.join(" ");

  function check(name, category, color, tests) {
    const found = tests.some((test) => {
      if (typeof test === "function") return test();
      if (typeof test === "string")
        return html.includes(test) || allScripts.includes(test);
      return false;
    });
    if (found) results.push({ name, category, color });
  }

  // ── JS Frameworks ──────────────────────────────────
  check("React", "JS Framework", "#61DAFB", [
    () => !!window.React,
    () => !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
    () => !!document.querySelector("[data-reactroot],[data-reactid]"),
    "react-dom",
    "react.production",
  ]);

  check("Vue.js", "JS Framework", "#42B883", [
    () => !!window.Vue,
    () => !!document.querySelector("[data-v-app]"),
    "vue.min.js",
    "vue.runtime",
    "/vue@",
  ]);

  check("Angular", "JS Framework", "#DD0031", [
    () => !!window.ng,
    () => !!document.querySelector("[ng-version]"),
    "angular.min.js",
  ]);

  check("Svelte", "JS Framework", "#FF3E00", [
    () => !!document.querySelector("[class*='svelte-']"),
    "svelte/",
    ".svelte.",
  ]);

  check("Solid.js", "JS Framework", "#2C4F7C", [
    () => !!window.Solid,
    "solid-js",
    "/solid@",
  ]);

  check("Qwik", "JS Framework", "#AC7EF4", [
    () => !!window.qwik,
    "qwik",
    "/qwikloader",
  ]);

  // ── Meta Frameworks ────────────────────────────────
  check("Next.js", "Meta Framework", "#ffffff", [
    () => !!window.__NEXT_DATA__,
    "/_next/static/",
    "__NEXT_DATA__",
  ]);

  check("Nuxt.js", "Meta Framework", "#00DC82", [
    () => !!window.__nuxt,
    () => !!document.querySelector("#__nuxt"),
    "/_nuxt/",
    "__NUXT__",
  ]);

  check("Remix", "Meta Framework", "#ffffff", [
    () => !!window.__remixContext,
    "__remixContext",
    "/build/root-",
  ]);

  check("Astro", "Meta Framework", "#FF5D01", [
    () => !!document.querySelector("[data-astro-cid]"),
    "_astro/",
  ]);

  check("SvelteKit", "Meta Framework", "#FF3E00", [
    () => !!window.__sveltekit_dev,
    "/_app/immutable/",
    "__sveltekit",
  ]);

  // ── Animation ──────────────────────────────────────
  check("GSAP", "Animation", "#88CE02", [
    () => !!window.gsap,
    "gsap.min.js",
    "cdnjs.cloudflare.com/ajax/libs/gsap",
    "/gsap@",
  ]);

  check("Framer Motion", "Animation", "#BB4EFF", [
    "framer-motion",
    "framer.com/motion",
  ]);

  check("Lenis", "Animation", "#a0f0c0", [
    () => !!window.Lenis,
    "lenis",
    "@studio-freight/lenis",
  ]);

  check("AOS", "Animation", "#FFD700", [
    () => !!window.AOS,
    "aos.js",
    "aos.min.js",
    "aos@",
  ]);

  check("ScrollReveal", "Animation", "#FF6B6B", [
    () => !!window.ScrollReveal,
    "scrollreveal.min.js",
    "scrollreveal@",
  ]);

  check("Anime.js", "Animation", "#FF6384", [
    () => !!window.anime,
    "animejs",
    "anime.min.js",
  ]);

  check("Motion One", "Animation", "#ffffff", ["motion", "@motionone/"]);

  // ── Slider / Carousel ──────────────────────────────
  check("Swiper", "Slider", "#0080FF", [
    () => !!window.Swiper,
    "swiper",
    "swiper.min.js",
    "/swiper@",
  ]);

  check("Splide", "Slider", "#e02020", [
    () => !!window.Splide,
    "splide.min.js",
    "@splidejs",
  ]);

  check("Embla Carousel", "Slider", "#1c1c1c", [
    "embla-carousel",
    "embla_carousel",
  ]);

  check("Slick", "Slider", "#50b3f0", [
    () => !!window.$.fn?.slick,
    "slick.min.js",
    "slick-carousel",
  ]);

  check("Keen Slider", "Slider", "#FFB300", ["keen-slider", "keen_slider"]);

  // ── Styling ────────────────────────────────────────
  check("Tailwind CSS", "Styling", "#06B6D4", [
    "cdn.tailwindcss.com",
    "tailwind",
    () =>
      (
        html.match(
          /class="[^"]*(?:px-|py-|text-\w+-\d|bg-\w+-\d|flex|grid)[^"]*"/g,
        ) || []
      ).length > 10,
  ]);

  check("Bootstrap", "Styling", "#7952B3", [
    "bootstrap.min.css",
    "bootstrap.css",
    "cdn.jsdelivr.net/npm/bootstrap",
  ]);

  check("Styled Components", "Styling", "#DB7093", [
    () => !!document.querySelector("style[data-styled]"),
    "styled-components",
  ]);

  // ── UI Libraries ───────────────────────────────────
  check("Material UI", "UI Library", "#007FFF", [
    () => !!document.querySelector("[class*='MuiBox'],[class*='MuiButton']"),
    "@mui/material",
    "material-ui",
  ]);

  check("Chakra UI", "UI Library", "#319795", [
    () => !!document.querySelector("[class*='chakra-']"),
    "@chakra-ui",
  ]);

  check("Radix UI", "UI Library", "#1c1c1c", ["@radix-ui", "radix-ui"]);

  check("shadcn/ui", "UI Library", "#ffffff", [
    () => !!document.querySelector("[data-radix-popper-content-wrapper]"),
    "shadcn",
    "@shadcn",
  ]);

  check("Mantine", "UI Library", "#339AF0", [
    () => !!document.querySelector("[class*='mantine-']"),
    "@mantine/core",
  ]);

  // ── 3D / Canvas ────────────────────────────────────
  check("Three.js", "3D / Canvas", "#049EF4", [
    () => !!window.THREE,
    "three.min.js",
    "three.module",
  ]);

  check("Spline", "3D / Canvas", "#5B6AF0", [
    "spline",
    "@splinetool/",
    () => !!document.querySelector("spline-viewer"),
  ]);

  check("p5.js", "3D / Canvas", "#ED225D", [
    () => !!window.p5,
    "p5.min.js",
    "p5.js",
  ]);

  check("Babylon.js", "3D / Canvas", "#BB464B", [
    () => !!window.BABYLON,
    "babylon.js",
    "babylonjs",
  ]);

  // ── State Management ───────────────────────────────
  check("Redux", "State", "#764ABC", [
    () => !!window.__REDUX_DEVTOOLS_EXTENSION__,
    "redux.min.js",
    "react-redux",
  ]);

  check("Zustand", "State", "#433e38", ["zustand"]);

  check("Jotai", "State", "#1c1c1c", ["jotai"]);

  check("Recoil", "State", "#1877F2", [
    () => !!window.__recoilSnapshot,
    "recoil",
  ]);

  // ── Data Fetching ──────────────────────────────────
  check("React Query", "Data Fetching", "#FF4154", [
    () => !!window.__REACT_QUERY_STATE__,
    "@tanstack/react-query",
    "react-query",
  ]);

  check("SWR", "Data Fetching", "#ffffff", ["swr"]);

  check("Axios", "Data Fetching", "#5A29E4", [
    () => !!window.axios,
    "axios.min.js",
    "/axios@",
  ]);

  // ── Build Tools ────────────────────────────────────
  check("Vite", "Build Tool", "#646CFF", [
    "/@vite/client",
    "vite/dist",
    "__vite__",
    () => !!document.querySelector('script[type="module"][src*="vite"]'),
  ]);

  check("Webpack", "Build Tool", "#8DD6F9", [
    () => !!window.webpackChunk || !!window.webpackJsonp,
    "webpack",
  ]);

  // ── Backend / Services ─────────────────────────────
  check("Firebase", "Backend", "#FFCA28", [
    () => !!window.firebase,
    "firebaseapp.com",
    "firestore.googleapis.com",
  ]);

  check("Supabase", "Backend", "#3ECF8E", [
    () => !!window.supabase,
    "supabase.co",
    "supabase",
  ]);

  check("Sanity", "CMS", "#F03E2F", ["sanity.io", "sanitycdn.com"]);

  return results;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "detect") {
    sendResponse({ techs: detectTech() });
  }
  return true;
});
