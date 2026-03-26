import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_COLORS = {
  "JS Framework": "#61DAFB",
  "Meta Framework": "#a78bfa",
  Animation: "#88CE02",
  Slider: "#0080FF",
  Styling: "#06B6D4",
  "UI Library": "#f472b6",
  "3D / Canvas": "#049EF4",
  State: "#764ABC",
  "Data Fetching": "#FF4154",
  "Build Tool": "#646CFF",
  Backend: "#FFCA28",
  CMS: "#F03E2F",
};

const CATEGORY_ORDER = [
  "JS Framework",
  "Meta Framework",
  "Animation",
  "Slider",
  "Styling",
  "UI Library",
  "3D / Canvas",
  "State",
  "Data Fetching",
  "Build Tool",
  "Backend",
  "CMS",
];

const DEMO_TECHS = [
  { name: "React", category: "JS Framework", color: "#61DAFB" },
  { name: "Next.js", category: "Meta Framework", color: "#ffffff" },
  { name: "Framer Motion", category: "Animation", color: "#BB4EFF" },
  { name: "Tailwind CSS", category: "Styling", color: "#06B6D4" },
  { name: "Zustand", category: "State", color: "#764ABC" },
  { name: "Vite", category: "Build Tool", color: "#646CFF" },
];

export default function App() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!window.chrome?.tabs) {
      setUrl("devhada.vercel.app");
      setTechs(DEMO_TECHS);
      setLoading(false);
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;
      try {
        setUrl(new URL(tab.url).hostname.replace("www.", ""));
      } catch {
        setUrl(tab.url);
      }
      chrome.tabs.sendMessage(tab.id, { action: "detect" }, (res) => {
        if (chrome.runtime.lastError) {
          setError("Can't scan this page.");
          setLoading(false);
          return;
        }
        if (res?.techs) setTechs(res.techs);
        setLoading(false);
      });
    });
  }, []);

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = techs.filter((t) => t.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div
      style={{ fontFamily: "'Geist Mono', monospace" }}
      className="w-[320px] min-h-40 max-h-130 bg-[#0a0a0a] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <img src="/icon48.png" className="w-3.5 h-3.5 rounded" />
          <span className="font-bold text-white tracking-tight text-[13px]">
            Tech<span className="text-emerald-400">Sniff</span>
          </span>
        </div>
        {url && (
          <span className="text-[10px] font-bold text-emerald-400/80 truncate max-w-40">
            {url}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-2.5 py-1.5 scrollbar-hide">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-emerald-400/30 border-t-emerald-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-white/30 text-[10px]">sniffing...</span>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <span className="text-lg">⚠️</span>
            <span className="text-white/30 text-[10px]">{error}</span>
          </div>
        )}

        {!loading && !error && techs.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <span className="text-lg">🔍</span>
            <span className="text-white/30 text-[10px]">nothing detected</span>
          </div>
        )}

        {!loading && !error && techs.length > 0 && (
          <AnimatePresence>
            {Object.entries(grouped).map(([cat, items], gi) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.04, duration: 0.2 }}
                className="py-1 border-b border-white/3 last:border-0"
              >
                {/* Category label */}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: CATEGORY_COLORS[cat] || "#fff" }}
                  />
                  <span
                    className="text-[8px] uppercase tracking-wider font-semibold"
                    style={{
                      color: CATEGORY_COLORS[cat] || "#fff",
                      opacity: 0.85,
                    }}
                  >
                    {cat}
                  </span>
                </div>

                {/* Tech items */}
                <div className="flex flex-col ml-2">
                  {items.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: gi * 0.04 + i * 0.03,
                        duration: 0.18,
                      }}
                      className="flex items-center gap-1.5 px-1.5 py-0.75 rounded hover:bg-white/5 transition-colors group cursor-default"
                    >
                      <span
                        className="w-1.25 h-1.25 rounded-full shrink-0"
                        style={{ background: tech.color }}
                      />
                      <span className="text-[11px] text-white/55 group-hover:text-white/85 transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      {!loading && techs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 py-1.5 border-t border-white/5 flex items-center justify-between"
        >
          <span className="text-[9px] font-bold text-white/80">
            {techs.length} {techs.length === 1 ? "tech" : "techs"} found
          </span>

          <a
            href="https://github.com/devHada/TechSniff/issues"
            target="_blank"
            rel="noreferrer"
            className="text-[9px] text-emerald-400/50 hover:text-emerald-400 font-bold transition-colors cursor-pointer"
          >
            suggest a tech ↗
          </a>
        </motion.div>
      )}
    </div>
  );
}
