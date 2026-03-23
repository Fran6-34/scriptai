import { useState, useEffect, useRef } from "react";

const G = `@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');`;

const NICHES = [
  { id:"psycho",  emoji:"🧠", label:"Psychologie",     desc:"Biais cognitifs & comportement", color:"#a78bfa" },
  { id:"finance", emoji:"💸", label:"Finance perso",   desc:"Épargne, ETF & investissement",  color:"#34d399" },
  { id:"ia",      emoji:"⚡", label:"Astuces IA",      desc:"Outils concrets & productivité", color:"#f59e0b" },
  { id:"histoire",emoji:"📜", label:"Histoire choc",   desc:"Faits cachés & anecdotes rares", color:"#f97316" },
  { id:"sante",   emoji:"🌿", label:"Santé & Science", desc:"Habitudes & découvertes",        color:"#2dd4bf" },
  { id:"humour",  emoji:"😂", label:"Humour absurde",  desc:"Sketchs & situations décalées",  color:"#e879f9" },
];

const DURATIONS = [
  { id:"30", top:"30s", sub:"Viral éclair" },
  { id:"60", top:"60s", sub:"Short parfait" },
  { id:"90", top:"90s", sub:"Reels long"   },
];

const TONES = [
  { id:"choc",      label:"⚡ Choc",      grad:"linear-gradient(135deg,#ff416c,#ff4b2b)" },
  { id:"educatif",  label:"📚 Éducatif",  grad:"linear-gradient(135deg,#11998e,#38ef7d)" },
  { id:"inspirant", label:"✨ Inspirant",  grad:"linear-gradient(135deg,#f7971e,#ffd200)" },
  { id:"drole",     label:"😄 Drôle",     grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)" },
];

const css = `
${G}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#06060f}
.app{min-height:100vh;font-family:'Plus Jakarta Sans',sans-serif;color:#f0eeff;position:relative;overflow-x:hidden;background:#06060f}
.bg{position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(139,92,246,0.18) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 110%,rgba(245,158,11,0.12) 0%,transparent 60%)}
.orb{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0;animation:drift 12s ease-in-out infinite alternate}
.orb1{width:500px;height:500px;background:rgba(139,92,246,0.12);top:-150px;left:-150px;animation-delay:0s}
.orb2{width:400px;height:400px;background:rgba(236,72,153,0.09);top:40%;right:-100px;animation-delay:-4s}
.orb3{width:350px;height:350px;background:rgba(245,158,11,0.08);bottom:-100px;left:30%;animation-delay:-8s}
@keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,20px) scale(1.05)}}
.inner{position:relative;z-index:1;max-width:700px;margin:0 auto;padding:0 20px 100px}
.hero{padding:64px 0 44px;text-align:center}
.pill{display:inline-flex;align-items:center;gap:8px;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.3);border-radius:100px;padding:6px 16px 6px 10px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#a78bfa;margin-bottom:24px;animation:fadeDown .6s ease both}
.pill-dot{width:8px;height:8px;background:#a78bfa;border-radius:50%;animation:pulse 2s ease infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
.hero-title{font-family:'Clash Display',sans-serif;font-size:clamp(3rem,9vw,5.5rem);font-weight:700;line-height:.95;letter-spacing:-3px;margin-bottom:20px;animation:fadeDown .6s .1s ease both}
.hero-title .grad{background:linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#f59e0b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:1.05rem;font-weight:300;color:rgba(240,238,255,0.45);max-width:420px;margin:0 auto 32px;line-height:1.7;animation:fadeDown .6s .2s ease both}
.stats{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;animation:fadeDown .6s .3s ease both}
.stat-num{font-family:'Clash Display',sans-serif;font-size:1.6rem;font-weight:700;color:#f0eeff}
.stat-lbl{font-size:.72rem;color:rgba(240,238,255,0.35);letter-spacing:1px;text-transform:uppercase;margin-top:2px}
@keyframes fadeDown{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
.div-line{height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,0.25),transparent);margin:40px 0}
.sec-label{font-family:'Clash Display',sans-serif;font-size:.72rem;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:rgba(240,238,255,0.28);margin-bottom:14px;margin-top:36px;display:flex;align-items:center;gap:10px}
.sec-label::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.05)}
.niche-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.niche-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:16px 18px;cursor:pointer;transition:all .2s ease;position:relative;overflow:hidden}
.niche-card:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.14)}
.niche-card.sel{border-color:var(--nc);background:rgba(255,255,255,0.05);transform:translateY(-2px)}
.niche-card.sel .niche-name{color:var(--nc)}
.n-top{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.n-emoji{font-size:1.35rem}
.niche-name{font-family:'Clash Display',sans-serif;font-size:.9rem;font-weight:600;color:#f0eeff;transition:color .2s;flex:1}
.niche-desc{font-size:.73rem;color:rgba(240,238,255,0.32);font-weight:300}
.sel-ring{width:20px;height:20px;border-radius:50%;background:var(--nc);display:flex;align-items:center;justify-content:center;font-size:11px;color:#06060f;font-weight:700;flex-shrink:0}
.dur-row{display:flex;gap:10px}
.dur-btn{flex:1;border-radius:14px;padding:14px 10px;text-align:center;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);transition:all .2s ease}
.dur-btn:hover{border-color:rgba(255,255,255,0.15);transform:translateY(-1px)}
.dur-btn.sel{background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.5)}
.dur-top{font-family:'Clash Display',sans-serif;font-size:1.8rem;font-weight:700;color:#f0eeff;line-height:1}
.dur-btn.sel .dur-top{background:linear-gradient(135deg,#a78bfa,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.dur-sub{font-size:.7rem;color:rgba(240,238,255,0.3);margin-top:4px}
.tone-row{display:flex;gap:10px}
.tone-btn{flex:1;border-radius:12px;padding:11px 6px;text-align:center;cursor:pointer;font-size:.8rem;font-weight:500;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:rgba(240,238,255,0.45);transition:all .2s ease}
.tone-btn:hover{border-color:rgba(255,255,255,0.15);color:#f0eeff}
.tone-btn.sel{border-color:transparent;color:#06060f;font-weight:600;background:var(--tg)}
.topic-wrap{position:relative}
.topic-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:16px 60px 16px 52px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.95rem;font-weight:400;color:#f0eeff;outline:none;resize:none;transition:border-color .2s,background .2s;line-height:1.6}
.topic-input::placeholder{color:rgba(240,238,255,0.2)}
.topic-input:focus{border-color:rgba(139,92,246,0.5);background:rgba(139,92,246,0.04)}
.topic-icon{position:absolute;left:18px;top:16px;font-size:1.2rem;pointer-events:none}
.char-count{position:absolute;bottom:12px;right:16px;font-size:.7rem;color:rgba(240,238,255,0.2)}
.gen-btn{width:100%;margin-top:24px;border:none;border-radius:14px;padding:18px;cursor:pointer;font-family:'Clash Display',sans-serif;font-size:1.05rem;font-weight:700;letter-spacing:.5px;background:linear-gradient(135deg,#a78bfa 0%,#f472b6 60%,#f59e0b 100%);color:#fff;position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;box-shadow:0 0 40px rgba(167,139,250,0.3)}
.gen-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 0 60px rgba(167,139,250,0.45)}
.gen-btn:active:not(:disabled){transform:translateY(0)}
.gen-btn:disabled{opacity:.35;cursor:not-allowed;box-shadow:none}
.gen-btn .shimmer{position:absolute;top:-50%;left:-60%;width:40%;height:200%;background:rgba(255,255,255,0.18);transform:skewX(-20deg);transition:left .5s ease}
.gen-btn:hover .shimmer{left:130%}
.gen-btn-inner{position:relative}
.loading-box{margin-top:28px;border-radius:20px;padding:48px 24px;text-align:center;background:rgba(139,92,246,0.05);border:1px solid rgba(139,92,246,0.15);animation:fadeUp .3s ease}
.loading-ring{width:56px;height:56px;border-radius:50%;margin:0 auto 20px;background:conic-gradient(#a78bfa 0deg,#f472b6 120deg,#f59e0b 240deg,rgba(255,255,255,0.05) 240deg);display:flex;align-items:center;justify-content:center;animation:spin 1s linear infinite}
.loading-ring-inner{width:40px;height:40px;background:#06060f;border-radius:50%}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-text{font-family:'Clash Display',sans-serif;font-size:1rem;font-weight:600;color:#a78bfa}
.loading-sub{font-size:.8rem;color:rgba(240,238,255,0.3);margin-top:6px;font-weight:300}
.result-wrap{margin-top:32px;animation:fadeUp .4s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.result-header{background:linear-gradient(135deg,rgba(167,139,250,0.12),rgba(244,114,182,0.08));border:1px solid rgba(167,139,250,0.2);border-radius:20px;padding:24px;margin-bottom:12px;position:relative;overflow:hidden}
.result-sup{font-size:.7rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#a78bfa;margin-bottom:8px}
.result-titresugg{font-family:'Clash Display',sans-serif;font-size:1.2rem;font-weight:700;color:#f0eeff;margin-bottom:14px;line-height:1.3}
.copy-all{display:inline-flex;align-items:center;gap:6px;background:rgba(167,139,250,0.15);border:1px solid rgba(167,139,250,0.3);border-radius:10px;padding:8px 16px;font-size:.78rem;font-family:'Clash Display',sans-serif;font-weight:600;color:#a78bfa;cursor:pointer;transition:all .15s}
.copy-all:hover{background:rgba(167,139,250,0.25)}
.copy-all.ok{border-color:#34d399;color:#34d399;background:rgba(52,211,153,0.1)}
.sblock{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:20px 22px;margin-bottom:10px;position:relative;transition:border-color .2s,background .2s}
.sblock:hover{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.1)}
.sblock-hook{border-left:3px solid #f97316}
.sblock-corps{border-left:3px solid #a78bfa}
.sblock-cta{border-left:3px solid #34d399}
.sblock-conseil{border-left:3px solid #f59e0b}
.sb-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.sb-tag{font-size:.65rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(240,238,255,0.28)}
.copy-mini{background:none;border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:4px 12px;font-size:.72rem;color:rgba(240,238,255,0.35);cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif}
.copy-mini:hover{border-color:rgba(255,255,255,0.2);color:#f0eeff}
.copy-mini.ok{border-color:#34d399;color:#34d399}
.sb-text{font-size:.95rem;line-height:1.75;color:rgba(240,238,255,0.82);font-weight:300}
.corps-line{display:block;margin-bottom:2px}
.conseil-text{font-style:italic;color:rgba(240,238,255,0.45);font-size:.88rem}
.tools-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.05)}
.tool-chip{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:100px;padding:6px 14px;font-size:.75rem;color:rgba(240,238,255,0.4);transition:all .15s}
.tool-chip:hover{background:rgba(255,255,255,0.07);color:rgba(240,238,255,0.7)}
.reset-btn{width:100%;margin-top:12px;background:none;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;color:rgba(240,238,255,0.3);cursor:pointer;transition:all .15s}
.reset-btn:hover{border-color:rgba(255,255,255,0.15);color:rgba(240,238,255,0.6)}
.err-box{margin-top:24px;border-radius:16px;padding:24px;text-align:center;background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.2)}
.err-text{font-family:'Clash Display',sans-serif;font-size:.9rem;color:#f97316}
`;

export default function ScriptAI() {
  const [niche,   setNiche]   = useState(null);
  const [dur,     setDur]     = useState("60");
  const [tone,    setTone]    = useState("choc");
  const [topic,   setTopic]   = useState("");
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [dots,    setDots]    = useState("");
  const [copied,  setCopied]  = useState(null);
  const [count,   setCount]   = useState(2847);

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
    const prompt = `Tu es un expert en contenu viral YouTube Shorts / TikTok / Reels.
Génère un script de ${dur} secondes pour : ${n.label} — Sujet : ${topic} — Ton : ${t.label}
Règles : phrases courtes (max 12 mots), langage parlé, zéro "Bonjour tout le monde", hook = surprise immédiate.
Réponds UNIQUEMENT en JSON valide sans backticks :
{"hook":"...","corps":["...","...","..."],"cta":"...","titre_suggere":"...","conseil":"..."}`;

    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
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
    ? `🎬 ${result.titre_suggere}\n\n⚡ HOOK\n${result.hook}\n\n📝 SCRIPT\n${(result.corps||[]).join("\n")}\n\n🎯 CTA\n${result.cta}\n\n💡 CONSEIL\n${result.conseil}`
    : "";

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="bg"/>
        <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>

        <div className="inner">
          {/* HERO */}
          <div className="hero">
            <div className="pill"><span className="pill-dot"/>Générateur IA gratuit</div>
            <h1 className="hero-title">Ton script<br/><span className="grad">viral en 10s</span></h1>
            <p className="hero-sub">Shorts · Reels · TikTok — en français, propulsé par IA.<br/>Hook + Script + CTA. Prêt à filmer.</p>
            <div className="stats">
              <div><div className="stat-num">{count.toLocaleString("fr")}</div><div className="stat-lbl">Scripts générés</div></div>
              <div><div className="stat-num">6</div><div className="stat-lbl">Niches</div></div>
              <div><div className="stat-num">100%</div><div className="stat-lbl">Gratuit</div></div>
            </div>
          </div>

          <div className="div-line"/>

          {/* NICHE */}
          <div className="sec-label">① Choisis ta niche</div>
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

          {/* DURATION */}
          <div className="sec-label">② Durée</div>
          <div className="dur-row">
            {DURATIONS.map(d => (
              <div key={d.id} className={`dur-btn ${dur===d.id?"sel":""}`} onClick={() => setDur(d.id)}>
                <div className="dur-top">{d.top}</div>
                <div className="dur-sub">{d.sub}</div>
              </div>
            ))}
          </div>

          {/* TONE */}
          <div className="sec-label">③ Ton & style</div>
          <div className="tone-row">
            {TONES.map(t => (
              <div key={t.id} className={`tone-btn ${tone===t.id?"sel":""}`}
                style={{"--tg":t.grad}} onClick={() => setTone(t.id)}>{t.label}</div>
            ))}
          </div>

          {/* TOPIC */}
          <div className="sec-label">④ Ton sujet</div>
          <div className="topic-wrap">
            <span className="topic-icon">✏️</span>
            <textarea className="topic-input" rows={2} maxLength={200} value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder='Ex : "Pourquoi tu procrastines vraiment" ou "L\'erreur d\'épargne que 90% font"'/>
            <span className="char-count">{topic.length}/200</span>
          </div>

          {/* BUTTON */}
          <button className="gen-btn" onClick={generate}
            disabled={loading || !niche || !topic.trim()}>
            <span className="shimmer"/>
            <span className="gen-btn-inner">
              {loading ? `⚡ Rédaction en cours${dots}` : "⚡ Générer mon script maintenant"}
            </span>
          </button>

          {/* LOADING */}
          {loading && (
            <div className="loading-box">
              <div className="loading-ring"><div className="loading-ring-inner"/></div>
              <div className="loading-text">Rédaction IA en cours{dots}</div>
              <div className="loading-sub">Hook · Développement · CTA · Conseil montage</div>
            </div>
          )}

          {/* ERROR */}
          {result?.error && (
            <div className="err-box">
              <div className="err-text">⚠ Erreur réseau — réessaie dans quelques secondes</div>
            </div>
          )}

          {/* RESULT */}
          {result && !result.error && (
            <div className="result-wrap">
              <div className="result-header">
                <div className="result-sup">✦ Script généré</div>
                <div className="result-titresugg">🎬 {result.titre_suggere}</div>
                <button className={`copy-all ${copied==="all"?"ok":""}`} onClick={() => cp(fullScript,"all")}>
                  {copied==="all" ? "✓ Copié !" : "📋 Tout copier"}
                </button>
              </div>

              <div className="sblock sblock-hook">
                <div className="sb-head">
                  <span className="sb-tag">⚡ HOOK — 0 à 5s</span>
                  <button className={`copy-mini ${copied==="hook"?"ok":""}`} onClick={() => cp(result.hook,"hook")}>
                    {copied==="hook"?"✓ ok":"Copier"}</button>
                </div>
                <div className="sb-text" style={{fontSize:"1.05rem",fontWeight:"500",color:"#f0eeff"}}>{result.hook}</div>
              </div>

              <div className="sblock sblock-corps">
                <div className="sb-head">
                  <span className="sb-tag">📝 DÉVELOPPEMENT</span>
                  <button className={`copy-mini ${copied==="corps"?"ok":""}`} onClick={() => cp((result.corps||[]).join("\n"),"corps")}>
                    {copied==="corps"?"✓ ok":"Copier"}</button>
                </div>
                <div className="sb-text">
                  {(result.corps||[]).map((l,i) => <span key={i} className="corps-line">{l}</span>)}
                </div>
              </div>

              <div className="sblock sblock-cta">
                <div className="sb-head">
                  <span className="sb-tag">🎯 CALL TO ACTION</span>
                  <button className={`copy-mini ${copied==="cta"?"ok":""}`} onClick={() => cp(result.cta,"cta")}>
                    {copied==="cta"?"✓ ok":"Copier"}</button>
                </div>
                <div className="sb-text">{result.cta}</div>
              </div>

              <div className="sblock sblock-conseil">
                <div className="sb-head"><span className="sb-tag">💡 CONSEIL MONTAGE</span></div>
                <div className="sb-text conseil-text">{result.conseil}</div>
              </div>

              <div className="tools-row">
                {["🎬 CapCut","🎙 ElevenLabs","🎨 Canva","📹 Pexels","🎵 YT Audio Library"].map(t=>(
                  <span key={t} className="tool-chip">{t}</span>
                ))}
              </div>

              <button className="reset-btn" onClick={() => { setResult(null); setTopic(""); setNiche(null); }}>
                Nouveau script →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
