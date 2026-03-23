import { useState, useEffect } from "react";

const G = `@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');`;

const NICHES = [
  { id:"psycho",   emoji:"🧠", label:"Psychologie",     desc:"Biais cognitifs & comportement", color:"#a78bfa" },
  { id:"finance",  emoji:"💸", label:"Finance perso",   desc:"Épargne, ETF & investissement",  color:"#34d399" },
  { id:"ia",       emoji:"⚡", label:"Astuces IA",      desc:"Outils concrets & productivité", color:"#f59e0b" },
  { id:"histoire", emoji:"📜", label:"Histoire choc",   desc:"Faits cachés & anecdotes rares", color:"#f97316" },
  { id:"sante",    emoji:"🌿", label:"Santé & Science", desc:"Habitudes & découvertes",        color:"#2dd4bf" },
  { id:"humour",   emoji:"😂", label:"Humour absurde",  desc:"Sketchs & situations décalées",  color:"#e879f9" },
];

const PLATFORMS = [
  { id:"tiktok",  emoji:"📱", label:"TikTok",          color:"#fe2c55" },
  { id:"reels",   emoji:"📸", label:"Instagram Reels", color:"#e1306c" },
  { id:"shorts",  emoji:"▶️", label:"YouTube Shorts",  color:"#ff0000" },
];

const DURATIONS = [
  { id:"30", top:"30s", sub:"Viral éclair" },
  { id:"60", top:"60s", sub:"Short parfait" },
  { id:"90", top:"90s", sub:"Reels long" },
];

const TONES = [
  { id:"choc",      label:"⚡ Choc",      grad:"linear-gradient(135deg,#ff416c,#ff4b2b)" },
  { id:"educatif",  label:"📚 Éducatif",  grad:"linear-gradient(135deg,#11998e,#38ef7d)" },
  { id:"inspirant", label:"✨ Inspirant",  grad:"linear-gradient(135deg,#f7971e,#ffd200)" },
  { id:"drole",     label:"😄 Drôle",     grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)" },
];

const TOOLS = [
  { name:"🎬 CapCut",           url:"https://www.capcut.com" },
  { name:"🎙 ElevenLabs",       url:"https://try.elevenlabs.io/c33b8205vs24" },
  { name:"🎨 Canva",            url:"https://www.canva.com" },
  { name:"📹 Pexels",           url:"https://www.pexels.com" },
  { name:"🎵 YT Audio Library", url:"https://studio.youtube.com" },
];

const makeCss = (dark) => `
${G}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:${dark?"#06060f":"#f8f7ff"}}
.app{min-height:100vh;font-family:'Plus Jakarta Sans',sans-serif;color:${dark?"#f0eeff":"#1a1040"};position:relative;overflow-x:hidden;background:${dark?"#06060f":"#f8f7ff"}}
.bg{position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 80% 50% at 20% -10%,${dark?"rgba(139,92,246,0.18)":"rgba(139,92,246,0.07)"} 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 110%,${dark?"rgba(245,158,11,0.12)":"rgba(245,158,11,0.05)"} 0%,transparent 60%)}
.orb{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0;animation:drift 12s ease-in-out infinite alternate}
.orb1{width:500px;height:500px;background:${dark?"rgba(139,92,246,0.12)":"rgba(139,92,246,0.06)"};top:-150px;left:-150px}
.orb2{width:400px;height:400px;background:${dark?"rgba(236,72,153,0.09)":"rgba(236,72,153,0.04)"};top:40%;right:-100px;animation-delay:-4s}
.orb3{width:350px;height:350px;background:${dark?"rgba(245,158,11,0.08)":"rgba(245,158,11,0.04)"};bottom:-100px;left:30%;animation-delay:-8s}
@keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,20px) scale(1.05)}}
.inner{position:relative;z-index:1;max-width:700px;margin:0 auto;padding:0 20px 100px}
.topbar{position:relative;z-index:10;display:flex;justify-content:flex-end;padding:16px 20px 0;max-width:700px;margin:0 auto}
.theme-btn{background:${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)"};border:1px solid ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.09)"};border-radius:100px;padding:7px 16px;font-size:.78rem;color:${dark?"rgba(240,238,255,0.5)":"rgba(26,16,64,0.5)"};cursor:pointer;transition:all .2s;font-family:'Plus Jakarta Sans',sans-serif}
.theme-btn:hover{background:${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.08)"};color:${dark?"#f0eeff":"#1a1040"}}
.hero{padding:40px 0 44px;text-align:center}
.pill{display:inline-flex;align-items:center;gap:8px;background:${dark?"rgba(139,92,246,0.12)":"rgba(139,92,246,0.09)"};border:1px solid ${dark?"rgba(139,92,246,0.3)":"rgba(139,92,246,0.2)"};border-radius:100px;padding:6px 16px 6px 10px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${dark?"#a78bfa":"#7c3aed"};margin-bottom:24px;animation:fadeDown .6s ease both}
.pill-dot{width:8px;height:8px;background:${dark?"#a78bfa":"#7c3aed"};border-radius:50%;animation:pulse 2s ease infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
.hero-title{font-family:'Clash Display',sans-serif;font-size:clamp(3rem,9vw,5.5rem);font-weight:700;line-height:.95;letter-spacing:-3px;margin-bottom:20px;animation:fadeDown .6s .1s ease both}
.hero-title .grad{background:${dark?"linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#f59e0b 100%)":"linear-gradient(135deg,#7c3aed 0%,#db2777 50%,#d97706 100%)"};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:1.05rem;font-weight:300;color:${dark?"rgba(240,238,255,0.45)":"rgba(26,16,64,0.5)"};max-width:420px;margin:0 auto 32px;line-height:1.7;animation:fadeDown .6s .2s ease both}
.stats{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;animation:fadeDown .6s .3s ease both}
.stat-num{font-family:'Clash Display',sans-serif;font-size:1.6rem;font-weight:700}
.stat-lbl{font-size:.72rem;color:${dark?"rgba(240,238,255,0.35)":"rgba(26,16,64,0.35)"};letter-spacing:1px;text-transform:uppercase;margin-top:2px}
@keyframes fadeDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
.div-line{height:1px;background:linear-gradient(90deg,transparent,${dark?"rgba(139,92,246,0.25)":"rgba(139,92,246,0.15)"},transparent);margin:40px 0}
.sec-label{font-family:'Clash Display',sans-serif;font-size:.72rem;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:${dark?"rgba(240,238,255,0.28)":"rgba(26,16,64,0.3)"};margin-bottom:14px;margin-top:36px;display:flex;align-items:center;gap:10px}
.sec-label::after{content:'';flex:1;height:1px;background:${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}}
.niche-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.niche-card{background:${dark?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.8)"};border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"};border-radius:16px;padding:16px 18px;cursor:pointer;transition:all .2s ease;box-shadow:${dark?"none":"0 2px 10px rgba(0,0,0,0.04)"}}
.niche-card:hover{transform:translateY(-2px);border-color:${dark?"rgba(255,255,255,0.14)":"rgba(0,0,0,0.12)"}}
.niche-card.sel{border-color:var(--nc);background:${dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.95)"};transform:translateY(-2px)}
.niche-card.sel .niche-name{color:var(--nc)}
.n-top{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.n-emoji{font-size:1.35rem}
.niche-name{font-family:'Clash Display',sans-serif;font-size:.9rem;font-weight:600;transition:color .2s;flex:1}
.niche-desc{font-size:.73rem;color:${dark?"rgba(240,238,255,0.32)":"rgba(26,16,64,0.4)"};font-weight:300}
.sel-ring{width:20px;height:20px;border-radius:50%;background:var(--nc);display:flex;align-items:center;justify-content:center;font-size:11px;color:${dark?"#06060f":"#fff"};font-weight:700;flex-shrink:0}
.platform-row{display:flex;gap:10px}
.plat-btn{flex:1;border-radius:14px;padding:12px 8px;text-align:center;cursor:pointer;background:${dark?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.8)"};border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"};transition:all .2s ease;box-shadow:${dark?"none":"0 2px 8px rgba(0,0,0,0.04)"}}
.plat-btn:hover{transform:translateY(-1px);border-color:${dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.12)"}}
.plat-btn.sel{background:${dark?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.95)"};border-color:var(--pc)}
.plat-emoji{font-size:1.4rem;display:block;margin-bottom:4px}
.plat-name{font-family:'Clash Display',sans-serif;font-size:.78rem;font-weight:600}
.plat-btn.sel .plat-name{color:var(--pc)}
.dur-row{display:flex;gap:10px}
.dur-btn{flex:1;border-radius:14px;padding:14px 10px;text-align:center;cursor:pointer;background:${dark?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.8)"};border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"};transition:all .2s ease;box-shadow:${dark?"none":"0 2px 8px rgba(0,0,0,0.04)"}}
.dur-btn:hover{transform:translateY(-1px)}
.dur-btn.sel{background:${dark?"rgba(139,92,246,0.12)":"rgba(255,255,255,0.95)"};border-color:${dark?"rgba(139,92,246,0.5)":"#7c3aed"}}
.dur-top{font-family:'Clash Display',sans-serif;font-size:1.8rem;font-weight:700;line-height:1}
.dur-btn.sel .dur-top{background:${dark?"linear-gradient(135deg,#a78bfa,#f472b6)":"linear-gradient(135deg,#7c3aed,#db2777)"};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.dur-sub{font-size:.7rem;color:${dark?"rgba(240,238,255,0.3)":"rgba(26,16,64,0.35)"};margin-top:4px}
.tone-row{display:flex;gap:10px}
.tone-btn{flex:1;border-radius:12px;padding:11px 6px;text-align:center;cursor:pointer;font-size:.8rem;font-weight:500;background:${dark?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.8)"};border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"};color:${dark?"rgba(240,238,255,0.45)":"rgba(26,16,64,0.45)"};transition:all .2s ease}
.tone-btn.sel{border-color:transparent;color:${dark?"#06060f":"#fff"};font-weight:600;background:var(--tg)}
.topic-wrap{position:relative}
.topic-input{width:100%;background:${dark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)"};border:1px solid ${dark?"rgba(255,255,255,0.09)":"rgba(0,0,0,0.09)"};border-radius:14px;padding:16px 60px 16px 52px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.95rem;color:${dark?"#f0eeff":"#1a1040"};outline:none;resize:none;transition:border-color .2s;line-height:1.6;box-shadow:${dark?"none":"0 2px 8px rgba(0,0,0,0.04)"}}
.topic-input::placeholder{color:${dark?"rgba(240,238,255,0.2)":"rgba(26,16,64,0.25)"}}
.topic-input:focus{border-color:${dark?"rgba(139,92,246,0.5)":"rgba(124,58,237,0.35)"}}
.topic-icon{position:absolute;left:18px;top:16px;font-size:1.2rem;pointer-events:none}
.char-count{position:absolute;bottom:12px;right:16px;font-size:.7rem;color:${dark?"rgba(240,238,255,0.2)":"rgba(26,16,64,0.25)"}}
.gen-btn{width:100%;margin-top:24px;border:none;border-radius:14px;padding:18px;cursor:pointer;font-family:'Clash Display',sans-serif;font-size:1.05rem;font-weight:700;letter-spacing:.5px;background:${dark?"linear-gradient(135deg,#a78bfa 0%,#f472b6 60%,#f59e0b 100%)":"linear-gradient(135deg,#7c3aed 0%,#db2777 60%,#d97706 100%)"};color:#fff;position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;box-shadow:${dark?"0 0 40px rgba(167,139,250,0.3)":"0 4px 24px rgba(124,58,237,0.3)"}}
.gen-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:${dark?"0 0 60px rgba(167,139,250,0.45)":"0 8px 32px rgba(124,58,237,0.4)"}}
.gen-btn:active:not(:disabled){transform:translateY(0)}
.gen-btn:disabled{opacity:.35;cursor:not-allowed;box-shadow:none}
.shimmer{position:absolute;top:-50%;left:-60%;width:40%;height:200%;background:rgba(255,255,255,0.18);transform:skewX(-20deg);transition:left .5s ease}
.gen-btn:hover .shimmer{left:130%}
.gen-btn-inner{position:relative}
.loading-box{margin-top:28px;border-radius:20px;padding:48px 24px;text-align:center;background:${dark?"rgba(139,92,246,0.05)":"rgba(124,58,237,0.04)"};border:1px solid ${dark?"rgba(139,92,246,0.15)":"rgba(124,58,237,0.12)"};animation:fadeUp .3s ease}
.loading-ring{width:56px;height:56px;border-radius:50%;margin:0 auto 20px;background:${dark?"conic-gradient(#a78bfa 0deg,#f472b6 120deg,#f59e0b 240deg,rgba(255,255,255,0.05) 240deg)":"conic-gradient(#7c3aed 0deg,#db2777 120deg,#d97706 240deg,rgba(0,0,0,0.05) 240deg)"};display:flex;align-items:center;justify-content:center;animation:spin 1s linear infinite}
.loading-ring-inner{width:40px;height:40px;background:${dark?"#06060f":"#f8f7ff"};border-radius:50%}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-text{font-family:'Clash Display',sans-serif;font-size:1rem;font-weight:600;color:${dark?"#a78bfa":"#7c3aed"}}
.loading-sub{font-size:.8rem;color:${dark?"rgba(240,238,255,0.3)":"rgba(26,16,64,0.35)"};margin-top:6px;font-weight:300}
.result-wrap{margin-top:32px;animation:fadeUp .4s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.result-header{background:${dark?"linear-gradient(135deg,rgba(167,139,250,0.12),rgba(244,114,182,0.08))":"linear-gradient(135deg,rgba(124,58,237,0.07),rgba(219,39,119,0.04))"};border:1px solid ${dark?"rgba(167,139,250,0.2)":"rgba(124,58,237,0.15)"};border-radius:20px;padding:24px;margin-bottom:12px}
.result-sup{font-size:.7rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:${dark?"#a78bfa":"#7c3aed"};margin-bottom:8px}
.result-titresugg{font-family:'Clash Display',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:14px;line-height:1.3}
.result-actions{display:flex;gap:8px;flex-wrap:wrap}
.copy-all{display:inline-flex;align-items:center;gap:6px;background:${dark?"rgba(167,139,250,0.15)":"rgba(124,58,237,0.09)"};border:1px solid ${dark?"rgba(167,139,250,0.3)":"rgba(124,58,237,0.2)"};border-radius:10px;padding:8px 16px;font-size:.78rem;font-family:'Clash Display',sans-serif;font-weight:600;color:${dark?"#a78bfa":"#7c3aed"};cursor:pointer;transition:all .15s}
.copy-all.ok{border-color:#34d399;color:#34d399;background:rgba(52,211,153,0.1)}
.share-btn{display:inline-flex;align-items:center;gap:6px;border-radius:10px;padding:8px 16px;font-size:.78rem;font-family:'Clash Display',sans-serif;font-weight:600;cursor:pointer;transition:all .15s;text-decoration:none}
.share-wa{background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.25);color:#16a34a}
.share-wa:hover{background:rgba(37,211,102,0.18)}
.share-tw{background:rgba(29,161,242,0.1);border:1px solid rgba(29,161,242,0.25);color:#0284c7}
.share-tw:hover{background:rgba(29,161,242,0.18)}
.sblock{background:${dark?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.85)"};border:1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"};border-radius:16px;padding:20px 22px;margin-bottom:10px;transition:all .2s;box-shadow:${dark?"none":"0 2px 8px rgba(0,0,0,0.04)"}}
.sblock:hover{background:${dark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.95)"}}
.sblock-hook{border-left:3px solid #f97316}
.sblock-corps{border-left:3px solid ${dark?"#a78bfa":"#7c3aed"}}
.sblock-cta{border-left:3px solid #34d399}
.sblock-conseil{border-left:3px solid #f59e0b}
.sb-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.sb-tag{font-size:.65rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${dark?"rgba(240,238,255,0.28)":"rgba(26,16,64,0.3)"}}
.copy-mini{background:none;border:1px solid ${dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)"};border-radius:7px;padding:4px 12px;font-size:.72rem;color:${dark?"rgba(240,238,255,0.35)":"rgba(26,16,64,0.35)"};cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
.copy-mini.ok{border-color:#34d399;color:#34d399}
.sb-text{font-size:.95rem;line-height:1.75;color:${dark?"rgba(240,238,255,0.82)":"rgba(26,16,64,0.75)"};font-weight:300}
.corps-line{display:block;margin-bottom:2px}
.conseil-text{font-style:italic;color:${dark?"rgba(240,238,255,0.45)":"rgba(26,16,64,0.4)"};font-size:.88rem}
.wordcount{font-size:.72rem;color:${dark?"rgba(240,238,255,0.2)":"rgba(26,16,64,0.25)"};margin-top:8px;text-align:right}
.tools-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px;padding-top:20px;border-top:1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}}
.tool-chip{display:flex;align-items:center;gap:6px;background:${dark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.8)"};border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"};border-radius:100px;padding:6px 14px;font-size:.75rem;color:${dark?"rgba(240,238,255,0.4)":"rgba(26,16,64,0.45)"};transition:all .15s;text-decoration:none}
.tool-chip:hover{background:${dark?"rgba(255,255,255,0.1)":"#fff"};transform:translateY(-1px)}
.reset-btn{width:100%;margin-top:12px;background:none;border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"};border-radius:12px;padding:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;color:${dark?"rgba(240,238,255,0.3)":"rgba(26,16,64,0.3)"};cursor:pointer;transition:all .15s}
.err-box{margin-top:24px;border-radius:16px;padding:24px;text-align:center;background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.2)}
.err-text{font-family:'Clash Display',sans-serif;font-size:.9rem;color:#f97316}
.seo-section{max-width:700px;margin:0 auto;padding:60px 20px 40px;border-top:1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}}
.seo-section h2{font-family:'Clash Display',sans-serif;font-size:1.4rem;font-weight:700;margin-bottom:16px}
.seo-section h3{font-family:'Clash Display',sans-serif;font-size:1rem;font-weight:600;margin-bottom:12px;margin-top:20px}
.seo-section p{font-size:.9rem;line-height:1.8;color:${dark?"rgba(240,238,255,0.4)":"rgba(26,16,64,0.45)"};font-weight:300;margin-bottom:12px}
.seo-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
.seo-tag{background:${dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"};border:1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.06)"};border-radius:100px;padding:4px 12px;font-size:.72rem;color:${dark?"rgba(240,238,255,0.25)":"rgba(26,16,64,0.3)"}}
`;

export default function ScriptAI() {
  const [dark,     setDark]    = useState(true);
  const [niche,    setNiche]   = useState(null);
  const [platform, setPlatform]= useState("tiktok");
  const [dur,      setDur]     = useState("60");
  const [tone,     setTone]    = useState("choc");
  const [topic,    setTopic]   = useState("");
  const [loading,  setLoading] = useState(false);
  const [result,   setResult]  = useState(null);
  const [dots,     setDots]    = useState("");
  const [copied,   setCopied]  = useState(null);
  const [count,    setCount]   = useState(2847);

  useEffect(() => {
    if (!loading) return;
    const iv = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 380);
    return () => clearInterval(iv);
  }, [loading]);

  const generate = async () => {
    if (!niche || !topic.trim()) return;
    setLoading(true); setResult(null);
    const n = NICHES.find(x => x.id === niche);
    const t = TONES.find(x => x.id === tone);
    const p = PLATFORMS.find(x => x.id === platform);
    const platStyle = platform === "tiktok" ? "ultra rapide, décalé, tendance Gen Z"
      : platform === "reels" ? "esthétique, inspirant, smooth"
      : "informatif, structuré, forte valeur ajoutée";

    const prompt = `Tu es un expert en contenu viral pour ${p.label} (${dur} secondes).
Génère un script pour la niche ${n.label} — Sujet : ${topic} — Ton : ${t.label}
Style ${p.label} : ${platStyle}

Règles absolues :
- Phrases max 8 mots, style parlé
- Zéro intro formelle
- Hook = choc ou intrigue en 3 secondes
- Chiffres précis si possible
- CTA naturel jamais robotique

Réponds UNIQUEMENT en JSON valide sans backticks :
{"hook":"...","corps":["...","...","...","...","..."],"cta":"...","titre_suggere":"...","conseil":"..."}`;

    try {
      const res  = await fetch("/api/generate", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] }),
      });
      const data  = await res.json();
      const raw   = (data.content||[]).map(c=>c.text||"").join("");
      const clean = raw.replace(/```json|```/g,"").trim();
      setResult(JSON.parse(clean));
      setCount(c => c + 1);
    } catch {
      setResult({ error:true });
    }
    setLoading(false);
  };

  const cp = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const fullScript = result && !result.error
    ? `${result.titre_suggere}\n\nHOOK\n${result.hook}\n\nSCRIPT\n${(result.corps||[]).join("\n")}\n\nCTA\n${result.cta}\n\nCONSEIL\n${result.conseil}`
    : "";

  const wordCount = result && !result.error
    ? [result.hook, ...(result.corps||[]), result.cta].join(" ").split(/\s+/).filter(Boolean).length
    : 0;

  const shareText = result && !result.error
    ? encodeURIComponent(`Script généré avec ScriptAI\n\n${result.hook}\n\nhttps://scriptai-seven.vercel.app`)
    : "";

  const selPlat = PLATFORMS.find(p => p.id === platform);

  return (
    <>
      <style>{makeCss(dark)}</style>
      <div className="app">
        <div className="bg"/>
        <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>

        <div className="topbar">
          <button className="theme-btn" onClick={() => setDark(d => !d)}>
            {dark ? "☀️ Mode clair" : "🌙 Mode sombre"}
          </button>
        </div>

        <div className="inner">
          <div className="hero">
            <div className="pill"><span className="pill-dot"/>Générateur IA gratuit</div>
            <h1 className="hero-title">Ton script<br/><span className="grad">viral en 10s</span></h1>
            <p className="hero-sub">TikTok · Instagram Reels · YouTube Shorts<br/>Scripts viraux en français, propulsés par IA.</p>
            <div className="stats">
              <div><div className="stat-num">{count.toLocaleString("fr")}</div><div className="stat-lbl">Scripts générés</div></div>
              <div><div className="stat-num">3</div><div className="stat-lbl">Plateformes</div></div>
              <div><div className="stat-num">100%</div><div className="stat-lbl">Gratuit</div></div>
            </div>
          </div>

          <div className="div-line"/>

          <div className="sec-label">① Plateforme</div>
          <div className="platform-row">
            {PLATFORMS.map(p => (
              <div key={p.id} className={`plat-btn ${platform===p.id?"sel":""}`}
                style={{"--pc":p.color}} onClick={() => setPlatform(p.id)}>
                <span className="plat-emoji">{p.emoji}</span>
                <span className="plat-name">{p.label}</span>
              </div>
            ))}
          </div>

          <div className="sec-label">② Niche</div>
          <div className="niche-grid">
            {NICHES.map(n => (
              <div key={n.id} className={`niche-card ${niche===n.id?"sel":""}`}
                style={{"--nc":n.color}} onClick={() => setNiche(n.id)}>
                <div className="n-top">
                  <span className="n-emoji">{n.emoji}</span>
                  <span className="niche-name">{n.label}</span>
                  {niche===n.id && <span className="sel-ring">✓</span>}
                </div>
                <div className="niche-desc">{n.desc}</div>
              </div>
            ))}
          </div>

          <div className="sec-label">③ Durée</div>
          <div className="dur-row">
            {DURATIONS.map(d => (
              <div key={d.id} className={`dur-btn ${dur===d.id?"sel":""}`} onClick={() => setDur(d.id)}>
                <div className="dur-top">{d.top}</div>
                <div className="dur-sub">{d.sub}</div>
              </div>
            ))}
          </div>

          <div className="sec-label">④ Ton & style</div>
          <div className="tone-row">
            {TONES.map(t => (
              <div key={t.id} className={`tone-btn ${tone===t.id?"sel":""}`}
                style={{"--tg":t.grad}} onClick={() => setTone(t.id)}>{t.label}</div>
            ))}
          </div>

          <div className="sec-label">⑤ Ton sujet</div>
          <div className="topic-wrap">
            <span className="topic-icon">✏️</span>
            <textarea className="topic-input" rows={2} maxLength={200} value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Ex : Pourquoi tu procrastines vraiment ? L erreur epargne 90%"/>
            <span className="char-count">{topic.length}/200</span>
          </div>

          <button className="gen-btn" onClick={generate}
            disabled={loading || !niche || !topic.trim()}>
            <span className="shimmer"/>
            <span className="gen-btn-inner">
              {loading ? `⚡ Rédaction en cours${dots}` : "⚡ Générer mon script maintenant"}
            </span>
          </button>

          {loading && (
            <div className="loading-box">
              <div className="loading-ring"><div className="loading-ring-inner"/></div>
              <div className="loading-text">Rédaction IA en cours{dots}</div>
              <div className="loading-sub">Hook · Développement · CTA · Conseil</div>
            </div>
          )}

          {result?.error && (
            <div className="err-box">
              <div className="err-text">⚠ Erreur réseau — réessaie dans quelques secondes</div>
            </div>
          )}

          {result && !result.error && (
            <div className="result-wrap">
              <div className="result-header">
                <div className="result-sup">✦ Script généré pour {selPlat?.label}</div>
                <div className="result-titresugg">🎬 {result.titre_suggere}</div>
                <div className="result-actions">
                  <button className={`copy-all ${copied==="all"?"ok":""}`} onClick={() => cp(fullScript,"all")}>
                    {copied==="all" ? "✓ Copié !" : "📋 Tout copier"}
                  </button>
                  <a className="share-btn share-wa"
                    href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp
                  </a>
                  <a className="share-btn share-tw"
                    href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer">
                    𝕏 Twitter
                  </a>
                </div>
              </div>

              <div className="sblock sblock-hook">
                <div className="sb-head">
                  <span className="sb-tag">⚡ HOOK — 0 à 3s</span>
                  <button className={`copy-mini ${copied==="hook"?"ok":""}`} onClick={() => cp(result.hook,"hook")}>
                    {copied==="hook"?"✓":"Copier"}</button>
                </div>
                <div className="sb-text" style={{fontSize:"1.05rem",fontWeight:"500"}}>{result.hook}</div>
              </div>

              <div className="sblock sblock-corps">
                <div className="sb-head">
                  <span className="sb-tag">📝 DÉVELOPPEMENT</span>
                  <button className={`copy-mini ${copied==="corps"?"ok":""}`} onClick={() => cp((result.corps||[]).join("\n"),"corps")}>
                    {copied==="corps"?"✓":"Copier"}</button>
                </div>
                <div className="sb-text">
                  {(result.corps||[]).map((l,i) => <span key={i} className="corps-line">{l}</span>)}
                </div>
              </div>

              <div className="sblock sblock-cta">
                <div className="sb-head">
                  <span className="sb-tag">🎯 CALL TO ACTION</span>
                  <button className={`copy-mini ${copied==="cta"?"ok":""}`} onClick={() => cp(result.cta,"cta")}>
                    {copied==="cta"?"✓":"Copier"}</button>
                </div>
                <div className="sb-text">{result.cta}</div>
              </div>

              <div className="sblock sblock-conseil">
                <div className="sb-head"><span className="sb-tag">💡 CONSEIL MONTAGE</span></div>
                <div className="sb-text conseil-text">{result.conseil}</div>
                <div className="wordcount">~{wordCount} mots · ~{Math.round(wordCount/2.5)}s lu à voix haute</div>
              </div>

              <div className="tools-row">
                {TOOLS.map(t => (
                  <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="tool-chip">
                    {t.name}
                  </a>
                ))}
              </div>

              <button className="reset-btn" onClick={() => { setResult(null); setTopic(""); setNiche(null); }}>
                Nouveau script →
              </button>
            </div>
          )}

          <div className="seo-section">
            <h2>Générateur de script TikTok, Reels et Shorts gratuit</h2>
            <p>ScriptAI est un générateur de scripts vidéo gratuit propulsé par IA. Crée en 10 secondes un script viral pour TikTok, Instagram Reels ou YouTube Shorts en français. Hook accrocheur, développement rythmé et call-to-action engageant générés automatiquement.</p>
            <h3>Comment générer un script viral ?</h3>
            <p>Choisis ta plateforme (TikTok, Reels ou Shorts), ta niche, la durée (30, 60 ou 90 secondes), le ton souhaité, entre ton sujet et génère. Partage ensuite via WhatsApp ou Twitter en un clic.</p>
            <h3>Pourquoi utiliser un script IA pour tes vidéos courtes ?</h3>
            <p>Un script structuré multiplie le taux de rétention. Le hook capte l attention en 3 secondes, le développement retient le spectateur, le CTA génère abonnés et engagement. Gratuit, sans inscription.</p>
            <div className="seo-tags">
              {["script tiktok gratuit","générateur script reels","script youtube shorts","script vidéo ia français","hook viral tiktok","script créateur contenu"].map(tag => (
                <span key={tag} className="seo-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
