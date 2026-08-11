/* global React, Ico, useI18n */
const { useState: useStateS, useEffect: useEffectS } = React;

// ------- Image placeholder -------
function Ph({ tone = "dune", label, ico, children, style, src, alt = "", loading = "lazy" }) {
  return (
    <div className={`img-ph ph-${tone}`} style={style}>
      {src && <img className="actual-img" src={src} alt={alt} loading={loading}/>} 
      {label && <div className="lbl">{label}</div>}
      <div className="icon">{ico || ""}</div>
      {children}
    </div>
  );
}

// ===== HERO =====
function Hero({ onReserveClick, onGalleryClick }) {
  const { copy } = useI18n();
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <Ph src="assets/property/entree.jpeg" alt="" loading="eager"/>
      </div>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-meta">{copy.hero.meta}</div>
            <h1>{copy.hero.title}</h1>
            <p className="lede" style={{maxWidth: 540}}>
              {copy.hero.lede}
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onReserveClick}>
                {copy.hero.cta}
                <Ico.arrow/>
              </button>
              <button className="btn btn-ghost" onClick={onGalleryClick}>
                {copy.hero.photos}
              </button>
            </div>
            <div className="hero-stats" aria-label={copy.hero.features}>
              <span><strong>6–8</strong> {copy.hero.guests}</span>
              <span><strong>4</strong> {copy.hero.bedrooms}</span>
              <span><strong>2</strong> {copy.hero.bathrooms}</span>
              <span><strong>100 m</strong> {copy.hero.sea}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== ABOUT (the house) =====
function About() {
  const { copy } = useI18n();
  const groundIcons = ["fire", "oven", "bed", "bath", "check"];
  const groundMeta = ["—", "—", "180 cm", "—", "—"];
  const firstIcons = ["bed", "bed", "baby", "bath"];
  const firstMeta = ["160 cm", "2 × 90 cm", copy.about.optional, "—"];
  return (
    <section className="block" id="woning">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <h2>{copy.about.title}</h2>
          </div>
          <p className="lede">
            {copy.about.lede}
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p style={{fontSize:15, color:"var(--ink-2)", lineHeight:1.7, maxWidth:520}}>
              {copy.about.body}
            </p>
            <div style={{display:"flex", flexWrap:"wrap", gap:8, marginTop:8}}>
              {copy.about.tags.map(t => (
                <span key={t} style={{fontSize:12, padding:"6px 12px", borderRadius:999, background:"var(--bg-2)", color:"var(--ink-2)"}}>{t}</span>
              ))}
            </div>
            <div style={{marginTop:24, display:"grid", gridTemplateColumns:"1fr 1fr", gap:14}}>
              <div style={{aspectRatio:"4/5", borderRadius:"var(--radius-lg)", overflow:"hidden"}}>
                <Ph src="assets/property/salon.jpg" alt={copy.about.imageSalon}/>
              </div>
              <div style={{aspectRatio:"4/5", borderRadius:"var(--radius-lg)", overflow:"hidden", marginTop:30}}>
                <Ph src="assets/property/leefruimte.jpg" alt={copy.about.imageLiving}/>
              </div>
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:16}}>
            <div className="floor-card">
              <h4>{copy.about.ground}</h4>
              <ul className="floor-list">
                {copy.about.groundRooms.map((room, index) => {
                  const Icon = Ico[groundIcons[index]];
                  return <li key={room}><span className="iconbox"><Icon/></span><div><div>{room}</div></div><span className="meta">{groundMeta[index]}</span></li>;
                })}
              </ul>
            </div>
            <div className="floor-card">
              <h4>{copy.about.first}</h4>
              <ul className="floor-list">
                {copy.about.firstRooms.map((room, index) => {
                  const Icon = Ico[firstIcons[index]];
                  return <li key={room}><span className="iconbox"><Icon/></span><div><div>{room}</div></div><span className="meta">{firstMeta[index]}</span></li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== GALLERY =====
const GALLERY = {
  buiten: [
    { src: "assets/property/gevel.jpg", size: "g-wide" },
    { src: "assets/property/entree.jpeg", size: "g-sq" },
    { src: "assets/property/terras.jpg", size: "g-med" },
    { src: "assets/property/gevel-zon.jpg", size: "g-med" },
  ],
  living: [
    { src: "assets/property/leefruimte.jpg", size: "g-wide" },
    { src: "assets/property/salon.jpg", size: "g-sq" },
    { src: "assets/property/keuken.jpg", size: "g-full" },
  ],
  slaap: [
    { src: "assets/property/slaapkamer-1.jpg", size: "g-wide" },
    { src: "assets/property/slaapkamer-2.jpg", size: "g-sq" },
    { src: "assets/property/slaapkamer-twin.jpg", size: "g-wide" },
    { src: "assets/property/kinderkamer.jpg", size: "g-med" },
    { src: "assets/property/babyspullen.jpg", size: "g-med" },
  ],
  bad: [
    { src: "assets/property/badkamer-beneden.jpg", size: "g-med" },
    { src: "assets/property/badkamer-boven.jpg", size: "g-med" },
  ],
};
const GALLERY_TABS = ["buiten", "living", "slaap", "bad"];

function Gallery({ onOpen }) {
  const [tab, setTab] = useStateS("buiten");
  const { copy } = useI18n();
  const items = GALLERY[tab].map((item, index) => ({ ...item, cap: copy.gallery.captions[tab][index] }));
  return (
    <section className="block" id="galerij">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <h2>{copy.gallery.title}</h2>
          </div>
          <p className="lede">
            {copy.gallery.lede}
          </p>
        </div>

        <div className="gallery-tabs">
          {GALLERY_TABS.map(k => (
            <button
              key={k}
              className={`gallery-tab ${tab === k ? "active" : ""}`}
              aria-pressed={tab === k}
              onClick={() => setTab(k)}
            >
              {copy.gallery.tabs[k]}
              <span className="count">{GALLERY[k].length}</span>
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {items.map((it, i) => (
            <button type="button" aria-label={`${copy.gallery.enlarge} ${it.cap}`} key={`${tab}-${i}`} className={`gallery-item ${it.size}`} onClick={() => onOpen({ tab, index: i, items })}>
              <Ph src={it.src} alt={it.cap} tone={it.tone}/>
              <div className="cap">{it.cap}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== AMENITIES =====
const AMENITY_ICONS = ["wifi", "tv", "oven", "wash", "wash", "coffee", "fire", "bbq", "garden", "car", "baby", "game", "book", "bath", "paw", "smoke"];

function Amenities() {
  const { copy } = useI18n();
  return (
    <section className="block" id="voorzieningen">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <h2>{copy.amenities.title}</h2>
          </div>
          <p className="lede">
            {copy.amenities.lede}
          </p>
        </div>

        <div className="amenity-grid">
          {AMENITY_ICONS.map((icon, i) => {
            const Icon = Ico[icon];
            const [label, sub] = copy.amenities.items[i];
            return (
              <div key={i} className={`amenity ${sub === "muted" ? "muted" : ""}`}>
                <div className="ico"><Icon/></div>
                <div>
                  <div className="label">{label}</div>
                  {sub && sub !== "muted" && <div className="sub">{sub}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <p style={{marginTop:18, fontSize:12, color:"var(--ink-3)"}}>
          {copy.amenities.linen}
        </p>
      </div>
    </section>
  );
}

// ===== LOCATION =====
function LeafletMap() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || ref.current._leafletInited) return;
    ref.current._leafletInited = true;

    // Avenue Philippe Hurepel 4 — Hardelot-Plage
    const center = [50.6378, 1.5938];
    const map = L.map(ref.current, {
      center,
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
      tap: false,
    });

    // CartoDB Voyager — more detail (labels, parks, points of interest) than Positron.
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      subdomains: "abcd",
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    // Privacy circles — gasten zien de wijk, niet het exacte adres.
    L.circle(center, {
      radius: 180,
      color: "#123b4a",
      weight: 1.5,
      opacity: 0.55,
      fillColor: "#123b4a",
      fillOpacity: 0.10,
      dashArray: "6 4",
    }).addTo(map);
    L.circle(center, {
      radius: 70,
      color: "#123b4a",
      weight: 1,
      opacity: 0.35,
      fillColor: "#123b4a",
      fillOpacity: 0.08,
    }).addTo(map);

    // Central privacy pin (not exact address)
    const pin = L.divIcon({
      className: "",
      html: '<div class="privacy-pin"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    L.marker(center, { icon: pin, interactive: false }).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <>
      <div ref={ref} className="leaflet-map"/>
      <div className="map-compass" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M12 3 L15 15 L12 12 L9 15 Z" fill="#123b4a"/>
          <text x="12" y="22" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="6" fill="#6c7a80" letterSpacing="0">N</text>
        </svg>
      </div>
    </>
  );
}

function SatMap() {
  // Stylized satellite-style map of Hardelot-Plage.
  // Buildings/trees generated deterministically with a small PRNG so they vary but stay stable.
  const rand = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();

  const blocks = [];
  for (let i = 0; i < 150; i++) {
    const x = 188 + rand() * 240;
    const y = 90 + rand() * 420;
    const w = 5 + rand() * 12;
    const h = 5 + rand() * 12;
    const cx = 320 + Math.sin((y - 80) / 90) * 28;
    if (Math.abs(x + w / 2 - cx) < 14) continue;
    if (x > 250 && x < 295 && y > 250 && y < 295) continue;
    const tone = ["#b8a98e", "#a89880", "#c4b497", "#9d8e76", "#b1a187", "#cabd9e", "#a09275"][Math.floor(rand() * 7)];
    blocks.push({ x, y, w, h, tone, rot: Math.floor(rand() * 8) - 4 });
  }

  const trees = [];
  for (let i = 0; i < 280; i++) {
    const x = 440 + rand() * 160;
    const y = rand() * 600;
    const r = 3 + rand() * 4;
    trees.push({ x, y, r, tone: ["#4f6846", "#6b7657", "#3e533c", "#778262"][Math.floor(rand() * 4)] });
  }
  for (let i = 0; i < 30; i++) {
    const x = 200 + rand() * 220;
    const y = 80 + rand() * 440;
    const r = 2.5 + rand() * 2;
    trees.push({ x, y, r, tone: "#6b7657" });
  }
  for (let i = 0; i < 70; i++) {
    const x = 200 + rand() * 240;
    const y = rand() * 80;
    const r = 3 + rand() * 4;
    trees.push({ x, y, r, tone: ["#7e8a6b", "#8a9476"][Math.floor(rand() * 2)] });
  }

  return (
    <svg className="map-svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="seaRipple" width="32" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 8 Q8 4 16 8 T32 8" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" fill="none"/>
          <path d="M-4 12 Q4 8 12 12 T28 12" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" fill="none"/>
        </pattern>
        <pattern id="sand" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.35" fill="rgba(120,90,50,0.18)"/>
          <circle cx="4.5" cy="4" r="0.25" fill="rgba(120,90,50,0.13)"/>
        </pattern>
        <pattern id="dune" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.5" fill="rgba(100,80,40,0.25)"/>
          <circle cx="7" cy="6" r="0.4" fill="rgba(100,80,40,0.18)"/>
          <path d="M0 8 Q5 6 10 8" stroke="rgba(140,110,70,0.10)" strokeWidth="0.6" fill="none"/>
        </pattern>
        <pattern id="grass" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.6" fill="rgba(60,80,40,0.18)"/>
          <circle cx="8" cy="9" r="0.5" fill="rgba(60,80,40,0.13)"/>
        </pattern>
        <radialGradient id="vig" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0.55" stopColor="rgba(0,0,0,0)"/>
          <stop offset="1" stopColor="rgba(30,25,15,0.22)"/>
        </radialGradient>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5e7a8a"/>
          <stop offset="1" stopColor="#8aa3b1"/>
        </linearGradient>
        <linearGradient id="surfGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0)"/>
          <stop offset="0.6" stopColor="rgba(255,255,255,0.35)"/>
          <stop offset="1" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>

      {/* Sea */}
      <rect x="0" y="0" width="180" height="600" fill="url(#seaGrad)"/>
      <rect x="0" y="0" width="180" height="600" fill="url(#seaRipple)"/>
      <rect x="170" y="0" width="22" height="600" fill="url(#surfGrad)"/>

      {/* Beach */}
      <rect x="180" y="0" width="40" height="600" fill="#e6d3a8"/>
      <rect x="180" y="0" width="40" height="600" fill="url(#sand)"/>

      {/* Dunes */}
      <rect x="220" y="0" width="22" height="600" fill="#c9b58e"/>
      <rect x="220" y="0" width="22" height="600" fill="url(#dune)"/>
      <g fill="#c9b58e" opacity="0.85">
        <ellipse cx="248" cy="180" rx="14" ry="8"/>
        <ellipse cx="252" cy="350" rx="16" ry="9"/>
        <ellipse cx="244" cy="490" rx="12" ry="7"/>
      </g>

      {/* Town base */}
      <rect x="242" y="0" width="200" height="600" fill="#ece2cc"/>

      {/* Golf / park north */}
      <path d="M242 0 L442 0 L442 80 Q360 95 280 80 Q260 78 242 70 Z" fill="#a8b48d"/>
      <path d="M242 0 L442 0 L442 80 Q360 95 280 80 Q260 78 242 70 Z" fill="url(#grass)"/>
      <g stroke="#c4cca8" strokeWidth="6" fill="none" opacity="0.7">
        <path d="M260 20 Q310 40 380 25"/>
        <path d="M300 55 Q360 70 420 60"/>
      </g>
      <ellipse cx="350" cy="48" rx="14" ry="6" fill="#7d96a3"/>
      <ellipse cx="350" cy="48" rx="14" ry="6" fill="url(#seaRipple)"/>

      {/* Forest */}
      <path d="M442 0 L600 0 L600 600 L442 600 Q436 480 440 360 Q446 240 442 0 Z" fill="#6b7657"/>
      <path d="M442 0 L600 0 L600 600 L442 600 Q436 480 440 360 Q446 240 442 0 Z" fill="url(#grass)"/>
      <path d="M442 0 Q420 200 432 400 Q440 540 442 600 L460 600 L460 0 Z" fill="rgba(107,118,87,0.3)"/>

      {/* Promenade */}
      <g>
        <path d="M232 0 L232 600" stroke="#a99775" strokeWidth="5"/>
        <path d="M232 0 L232 600" stroke="#efe4cc" strokeWidth="3"/>
      </g>
      {/* Main curved avenue */}
      <g>
        <path d="M340 0 Q316 100 322 220 Q330 360 312 460 Q300 540 318 600" stroke="#bba88a" strokeWidth="7" fill="none"/>
        <path d="M340 0 Q316 100 322 220 Q330 360 312 460 Q300 540 318 600" stroke="#f4ead2" strokeWidth="5" fill="none"/>
      </g>
      {/* Cross streets */}
      <g stroke="#cdbb9c" strokeWidth="2.5" fill="none">
        {[120,180,240,300,360,420,480,540].map(y => <line key={y} x1="232" y1={y} x2="442" y2={y}/>)}
      </g>
      <g stroke="#efe4cc" strokeWidth="1.4" fill="none">
        {[120,180,240,300,360,420,480,540].map(y => <line key={y} x1="232" y1={y} x2="442" y2={y}/>)}
      </g>
      {/* Parallel secondary streets */}
      <g stroke="#d4c4a6" strokeWidth="1.5" fill="none">
        <line x1="270" y1="80" x2="270" y2="600"/>
        <line x1="380" y1="80" x2="380" y2="600"/>
        <line x1="420" y1="80" x2="420" y2="600"/>
      </g>

      {/* Central park */}
      <rect x="252" y="252" width="44" height="36" fill="#b5c293" rx="3"/>
      <rect x="252" y="252" width="44" height="36" fill="url(#grass)" rx="3"/>

      {/* Buildings */}
      <g>
        {blocks.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}>
            <rect x="0" y="0" width={b.w} height={b.h} fill={b.tone} rx="0.5"/>
            <rect x="0" y="0" width={b.w} height={b.h} fill="none" stroke="rgba(60,45,25,0.18)" strokeWidth="0.4"/>
          </g>
        ))}
      </g>

      {/* Trees */}
      <g>
        {trees.map((t, i) => (
          <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={t.tone} opacity="0.85"/>
        ))}
      </g>

      {/* Labels */}
      <g fontFamily="'DM Serif Display', Georgia, serif" fontStyle="italic">
        <text x="90" y="320" fill="rgba(255,255,255,0.55)" fontSize="22" textAnchor="middle" letterSpacing="0">la Manche</text>
        <text x="200" y="560" fill="rgba(60,45,25,0.55)" fontSize="11" textAnchor="middle" transform="rotate(-90 200 560)">plage de Hardelot</text>
        <text x="340" y="585" fill="rgba(60,45,25,0.7)" fontSize="14" textAnchor="middle">Hardelot-Plage</text>
        <text x="525" y="320" fill="rgba(255,255,255,0.7)" fontSize="16" textAnchor="middle" transform="rotate(-90 525 320)">forêt d'Écault</text>
        <text x="340" y="40" fill="rgba(60,45,25,0.55)" fontSize="11" textAnchor="middle">golf international</text>
      </g>
      <g fontFamily="'IBM Plex Mono', monospace" fontSize="6" fill="rgba(60,45,25,0.45)" letterSpacing="0">
        <text x="245" y="118">av. de la mer</text>
        <text x="245" y="298">av. françois 1er</text>
        <text x="245" y="478">rue des dunes</text>
      </g>

      {/* Vignette */}
      <rect x="0" y="0" width="600" height="600" fill="url(#vig)"/>

      {/* North arrow */}
      <g transform="translate(548 38)">
        <circle cx="0" cy="0" r="16" fill="rgba(255,253,247,0.92)" stroke="rgba(20,33,42,0.4)" strokeWidth="0.6"/>
        <path d="M0 -10 L4 6 L0 3 L-4 6 Z" fill="#123b4a"/>
        <text x="0" y="-20" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="7" fill="rgba(20,33,42,0.72)" letterSpacing="0">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(36 558)">
        <rect x="0" y="0" width="30" height="4" fill="#123b4a"/>
        <rect x="30" y="0" width="30" height="4" fill="rgba(255,253,247,0.95)" stroke="#123b4a" strokeWidth="0.5"/>
        <rect x="60" y="0" width="30" height="4" fill="#123b4a"/>
        <text x="0"  y="-4" fontFamily="'IBM Plex Mono', monospace" fontSize="7" fill="rgba(255,253,247,0.85)">0</text>
        <text x="44" y="-4" fontFamily="'IBM Plex Mono', monospace" fontSize="7" fill="rgba(255,253,247,0.85)">250 m</text>
        <text x="86" y="-4" fontFamily="'IBM Plex Mono', monospace" fontSize="7" fill="rgba(255,253,247,0.85)">500</text>
      </g>
    </svg>
  );
}

const LOCATION_ICONS = [
  ["wave", "coffee", "pine", "game"],
  ["coffee", "pin", "check", "car"],
  ["castle", "wave", "wave", "pin", "pin", "ferris", "cliff"],
];

function Location() {
  const { copy } = useI18n();
  return (
    <section className="block" id="locatie">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <h2>{copy.location.title}</h2>
          </div>
          <p className="lede">
            {copy.location.lede}
          </p>
        </div>

        <div className="location-block">
          <div className="location-intro">
            <div>
              <h3>{copy.location.introTitle}</h3>
            </div>
            <p>
              {copy.location.intro}
            </p>
          </div>

          <div className="local-grid">
            {copy.location.groups.map((g, gi) => (
              <div key={gi} className="local-card">
                <div className="local-card-head">
                  <div>
                    <span className="poi-group-label">{g.label}</span>
                    <div className="poi-group-sub">{g.sub}</div>
                  </div>
                </div>
                <div className="local-list">
                  {g.items.map(([name, desc, dist], i) => {
                    const Icon = Ico[LOCATION_ICONS[gi][i]];
                    return (
                      <div key={`${gi}-${i}`} className="poi">
                        <div className="ico"><Icon/></div>
                        <div>
                          <div className="name">{name}</div>
                          <div className="desc">{desc}</div>
                        </div>
                        <div className="dist">{dist}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FAMILIES =====
function Families() {
  const { copy } = useI18n();
  const icons = ["wave", "baby", "garden", "car", "pine", "fire"];
  return (
    <section className="block" id="gezinnen">
      <div className="wrap">
        <div className="families">
          <div className="families-head">
            <div>
              <h2>{copy.families.title}</h2>
            </div>
            <p className="lede" style={{maxWidth:480}}>
              {copy.families.lede}
            </p>
          </div>

          <div className="families-grid">
            {copy.families.items.map(([title, text], i) => {
              const Icon = Ico[icons[i]];
              return (
                <div key={i} className="family-card">
                  <div className="ico"><Icon/></div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== REVIEWS =====
const REVIEW_AUTHORS = [["Jonathan", 5], ["Beatrice", 5], ["Marc", 5], ["Robert", 5], ["Laura", 4], ["Michaël", 5]];
function Reviews() {
  const { copy } = useI18n();
  return (
    <section className="block" id="reviews">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <h2>{copy.reviews.title}</h2>
          </div>
          <p className="lede">
            {copy.reviews.lede}
          </p>
        </div>
        <div className="reviews-grid">
          {REVIEW_AUTHORS.map(([author, stars], i) => (
            <div key={i} className="review">
              <div className="stars">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
              <p className="quote">“{copy.reviews.items[i][0]}”</p>
              <div className="author"><strong>{author}</strong> · {copy.reviews.items[i][1]} · {copy.reviews.platform}</div>
            </div>
          ))}
        </div>
        <p className="review-note">
          {copy.reviews.note} <a href="https://www.mediavakanties.com/vakantiewoningen/70284" target="_blank" rel="noreferrer">{copy.reviews.source} →</a>
        </p>
      </div>
    </section>
  );
}

// ===== RATES =====
function Rates() {
  const { copy } = useI18n();
  return (
    <section className="block" id="tarieven">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <h2>{copy.rates.title}</h2>
          </div>
          <p className="lede">
            {copy.rates.lede}
          </p>
        </div>

        <div className="rates-grid">
          <div className="rate-card">
            <span className="season">{copy.rates.from}</span>
            <div className="price">€ 750<span style={{fontSize:18,color:"var(--ink-3)"}}> {copy.rates.week}</span></div>
            <div className="per">{copy.rates.adSource}</div>
            <ul>
              {copy.rates.low.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="rate-card featured">
            <span className="season">{copy.rates.max}</span>
            <div className="price">€ 1 150<span style={{fontSize:18,color:"rgba(255,253,247,0.58)"}}> {copy.rates.week}</span></div>
            <div className="per">{copy.rates.exact}</div>
            <ul>
              {copy.rates.high.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="rate-meta">
          {copy.rates.meta.map(([label, value]) => <div key={label}><strong>{label}</strong>{value}</div>)}
        </div>
      </div>
    </section>
  );
}

// ===== FAQ =====
function FAQ() {
  const [open, setOpen] = useStateS(0);
  const { copy } = useI18n();
  return (
    <section className="block" id="faq">
      <div className="wrap">
        <div className="section-head">
          <div className="meta">
            <h2>{copy.faq.title}</h2>
          </div>
          <p className="lede">
            {copy.faq.lede}
          </p>
        </div>

        <div className="faq-list">
          {copy.faq.items.map(([question, answer], i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{question}</span>
                <span className="plus"><Ico.plus/></span>
              </button>
              <div className="faq-a">{answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CONTACT =====
function Contact({ onReserveClick }) {
  const { copy } = useI18n();
  return (
    <section className="block" id="contact">
      <div className="wrap">
        <div className="contact-band">
          <div>
            <h2>{copy.contact.title}</h2>
            <p className="lede" style={{marginTop:18, maxWidth:480}}>
              {copy.contact.lede}
            </p>
            <div style={{marginTop:24, display:"flex", gap:10, flexWrap:"wrap"}}>
              <button className="btn btn-soft" onClick={onReserveClick}>
                {copy.contact.ask}
                <Ico.arrow/>
              </button>
              <button className="btn" style={{background:"transparent", color:"var(--bg)", border:"1px solid rgba(255,253,247,0.34)"}} onClick={onReserveClick}>
                {copy.contact.check}
              </button>
            </div>
          </div>
          <div className="contact-channels">
            <a href="https://www.mediavakanties.com/vakantiewoningen/70284" target="_blank" rel="noreferrer" className="contact-channel">
              <div className="ic"><Ico.mail/></div>
              <div>
                <div className="lbl">{copy.contact.verified}</div>
                <div className="val">{copy.contact.via}</div>
              </div>
            </a>
            <div className="contact-note">{copy.contact.note}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  const { copy } = useI18n();
  return (
    <footer className="wrap footer">
      <div>© 2026 Les Trois Loups · Hardelot-Plage · {copy.footer.region}</div>
      <div className="footer-links"><a href="https://www.mediavakanties.com/vakantiewoningen/70284" target="_blank" rel="noreferrer">{copy.contact.listing}</a></div>
    </footer>
  );
}

Object.assign(window, {
  Hero, About, Gallery, Amenities, Location, Families, Reviews, Rates, FAQ, Contact, Footer, Ph, GALLERY, GALLERY_TABS
});
