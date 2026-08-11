/* global React, ReactDOM, Ico, Hero, About, Gallery, Amenities, Location, Families, Reviews, Rates, FAQ, Contact, Footer, ReservationCard, Ph, fmtDate, I18nProvider, useI18n, SUPPORTED_LANGUAGES */
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

// ----------- Lightbox -----------
function Lightbox({ open, onClose }) {
  const { copy } = useI18n();
  const tabItems = open?.items || [];
  const [idx, setIdx] = useStateA(open?.index || 0);
  useEffectA(() => { if (open) setIdx(open.index); }, [open]);
  useEffectA(() => {
    if (!open || !tabItems.length) return undefined;
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx(i => (i - 1 + tabItems.length) % tabItems.length);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % tabItems.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, tabItems.length, onClose]);
  if (!open || !tabItems.length) return null;
  const cur = tabItems[idx];
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="close" onClick={onClose} aria-label={copy.lightbox.close}>✕</button>
      <button className="nav-btn prev" aria-label={copy.lightbox.previous} onClick={(e)=>{e.stopPropagation(); setIdx((idx-1+tabItems.length)%tabItems.length);}}><Ico.chevL/></button>
      <button className="nav-btn next" aria-label={copy.lightbox.next} onClick={(e)=>{e.stopPropagation(); setIdx((idx+1)%tabItems.length);}}><Ico.chevR/></button>
      <div className="inner" onClick={(e) => e.stopPropagation()}>
        <Ph src={cur.src} alt={cur.cap} tone={cur.tone} label={`${String(idx+1).padStart(2,"0")} / ${tabItems.length}`}/>
        <div className="caption">{cur.cap}</div>
      </div>
    </div>
  );
}

// ----------- Toast -----------
function Toast({ msg, onDone }) {
  useEffectA(() => {
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [msg]);
  return (
    <div className="toast">
      <div style={{width:22,height:22,borderRadius:"var(--radius-sm)",background:"var(--sea-deep)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Ico.check/>
      </div>
      <div>{msg}</div>
    </div>
  );
}

// ----------- Nav -----------
function Nav({ onReserveClick }) {
  const [scrolled, setScrolled] = useStateA(false);
  const { lang, setLang, copy } = useI18n();
  useEffectA(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#" className="brand" aria-label="Les Trois Loups">
          <img className="brand-mark" src="assets/logo-three-wolves.svg" alt=""/>
          <span>Les Trois Loups</span>
        </a>
        <nav className="nav-links">
          <a href="#woning">{copy.nav.house}</a>
          <a href="#galerij">{copy.nav.gallery}</a>
          <a href="#locatie">{copy.nav.location}</a>
          <a href="#reviews">{copy.nav.reviews}</a>
          <a href="#tarieven">{copy.nav.rates}</a>
          <a href="#faq">{copy.nav.faq}</a>
        </nav>
        <div className="nav-right">
          <div className="language-switcher" role="group" aria-label={copy.nav.languages}>
            {SUPPORTED_LANGUAGES.map(code => (
              <button key={code} type="button" aria-pressed={lang === code} className={lang === code ? "active" : ""} onClick={() => setLang(code)}>{code.toUpperCase()}</button>
            ))}
          </div>
          <button className="btn btn-primary" style={{padding:"10px 18px",fontSize:13}} onClick={onReserveClick}>
            {copy.nav.cta}
          </button>
        </div>
      </div>
    </header>
  );
}

function TrustBar() {
  const { copy } = useI18n();
  return (
    <div className="wrap trust-wrap" aria-label={copy.trust.label}>
      <div className="trust-bar">
        <span><Ico.check/> {copy.trust.reviews}</span>
        <span><Ico.mail/> {copy.trust.owners}</span>
        <span><Ico.check/> {copy.trust.payment}</span>
      </div>
    </div>
  );
}

function BookingSection({ bookRef, onSubmit }) {
  const { copy } = useI18n();
  const icons = [Ico.check, Ico.trend, Ico.fire];
  return (
    <section className="block" id="reserveren" ref={bookRef}>
      <div className="wrap">
        <div className="book-section">
          <div className="book-grid">
            <div className="book-side">
              <div>
                <h2>{copy.booking.title}</h2>
                <p style={{marginTop:18, color:"var(--ink-2)", fontSize:15.5, maxWidth:480, lineHeight:1.65}}>
                  {copy.booking.body}
                </p>
              </div>

              {copy.booking.qualifiers.map(([title, text], index) => {
                const Icon = icons[index];
                return <div className="qualifier" key={title}><div className="ic"><Icon/></div><div><strong>{title}</strong> {text}</div></div>;
              })}

              <div className="owner-note">
                <div className="owner-avatar"><img src="assets/logo-three-wolves.svg" alt=""/></div>
                <div><strong>{copy.booking.ownerNames}</strong><small>{copy.booking.owners}</small></div>
                <p>{copy.booking.ownerNote}</p>
              </div>
            </div>

            <ReservationCard onSubmit={onSubmit}/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------- App -----------
function App() {
  const [lightbox, setLightbox] = useStateA(null);
  const [toast, setToast] = useStateA(null);
  const bookRef = useRefA(null);
  const { copy, locale } = useI18n();

  function scrollToBook() {
    if (bookRef.current) {
      const top = bookRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function scrollToGallery() {
    document.getElementById("galerij")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(payload) {
    setToast(copy.form.toast.replace("{from}", fmtDate(payload.range.from, locale)).replace("{to}", fmtDate(payload.range.to, locale)));
  }

  return (
    <>
      <Nav onReserveClick={scrollToBook}/>
      <Hero onReserveClick={scrollToBook} onGalleryClick={scrollToGallery}/>
      <TrustBar/>

      <About/>
      <Gallery onOpen={setLightbox}/>
      <Amenities/>
      <Location/>
      <Families/>
      <Reviews/>
      <Rates/>
      <BookingSection bookRef={bookRef} onSubmit={handleSubmit}/>
      <FAQ/>
      <Contact onReserveClick={scrollToBook}/>
      <Footer/>

      <button className="mobile-book-bar" onClick={scrollToBook}>
        <div className="price-lead">{copy.mobile.from} €750<small> {copy.mobile.week}</small></div>
        <span>{copy.mobile.check} →</span>
      </button>

      <Lightbox open={lightbox} onClose={() => setLightbox(null)}/>
      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<I18nProvider><App/></I18nProvider>);
