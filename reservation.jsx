/* global React, useI18n */
const { useState, useEffect, useMemo } = React;

// ------- Icon set (line, opaalkust-friendly) -------
const Ico = {
  wave: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></svg>,
  pine: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M12 3l-5 7h3l-4 5h3l-4 5h14l-4-5h3l-4-5h3z"/><path d="M12 20v3"/></svg>,
  fire: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M12 3c0 4 4 5 4 9a4 4 0 1 1-8 0c0-2 2-3 2-5 1 0 2 0 2-4z"/></svg>,
  bed: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M3 18V8h12a4 4 0 0 1 4 4v6"/><path d="M3 14h18"/><path d="M3 18v3M21 18v3"/><circle cx="7" cy="11" r="1.5"/></svg>,
  bath: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z"/><path d="M5 12V6a2 2 0 0 1 2-2c1 0 1.5.5 2 1"/><path d="M9 6h2"/><path d="M5 21l1-2M19 21l-1-2"/></svg>,
  car: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M5 16l1-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l1 5"/><rect x="3" y="16" width="18" height="4" rx="1"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg>,
  wifi: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M2 9a16 16 0 0 1 20 0"/><path d="M5 12a12 12 0 0 1 14 0"/><path d="M8 15a8 8 0 0 1 8 0"/><circle cx="12" cy="18.5" r="1"/></svg>,
  paw: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><ellipse cx="6" cy="10" rx="1.5" ry="2"/><ellipse cx="18" cy="10" rx="1.5" ry="2"/><ellipse cx="9" cy="6" rx="1.5" ry="2"/><ellipse cx="15" cy="6" rx="1.5" ry="2"/><path d="M9 14c0-2 1.5-3 3-3s3 1 3 3c0 3-1 5-3 5s-3-2-3-5z"/></svg>,
  garden: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M12 22V8"/><path d="M12 8c-2-3-6-2-6 1 0 2 2 3 4 3"/><path d="M12 8c2-3 6-2 6 1 0 2-2 3-4 3"/><path d="M4 22h16"/></svg>,
  bbq: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M4 10h16l-2 7a3 3 0 0 1-3 2H9a3 3 0 0 1-3-2L4 10z"/><path d="M7 14h10"/><path d="M9 4c-1 1 1 2 0 4"/><path d="M13 4c-1 1 1 2 0 4"/></svg>,
  tv: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 18v3"/></svg>,
  oven: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/><circle cx="8" cy="6.5" r="0.5" fill="currentColor"/><circle cx="12" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  wash: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="8" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  coffee: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M4 8h14v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"/><path d="M18 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 3c-1 1 1 2 0 4M12 3c-1 1 1 2 0 4"/></svg>,
  baby: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><circle cx="12" cy="6" r="3"/><path d="M9 10c-3 1-5 3-5 6v4h16v-4c0-3-2-5-5-6"/><path d="M10 6.5h.01M14 6.5h.01"/></svg>,
  game: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8l8 8M16 8l-8 8"/></svg>,
  book: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 0-2 2V5z"/><path d="M20 5a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 1 2 2V5z"/></svg>,
  smoke: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M5 5l14 14"/></svg>,
  pin: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M12 22s-7-7-7-13a7 7 0 1 1 14 0c0 6-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  castle: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M3 21V10l3 1V8l3 1V6h6v3l3-1v3l3-1v11z"/><path d="M3 21h18"/><path d="M10 21v-5h4v5"/><path d="M9 13h.01M15 13h.01"/></svg>,
  bird: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M16 7a2 2 0 1 1-2-2"/><path d="M14 5c-3 0-7 3-7 7 0 4 3 7 7 7 2 0 4-1 5-3l3 1-2-3 2-3-4 1c-1-3-2-4-4-4z"/><path d="M9 14l-4 3"/></svg>,
  ferris: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><circle cx="12" cy="10" r="6"/><path d="M12 4v12M6 10h12M7.8 5.8 16.2 14.2M16.2 5.8 7.8 14.2"/><path d="M9 20h6M10 16l-1 4M14 16l1 4"/></svg>,
  museum: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M3 9 12 4l9 5"/><path d="M5 11v6M9 11v6M15 11v6M19 11v6"/><path d="M4 20h16"/><path d="M3 9h18"/></svg>,
  cliff: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M2 20h20"/><path d="M2 20V9l4-3 4 4v10"/><path d="M14 20V13l3-2 5 3v6"/><path d="M2 15l3-1 3 2"/></svg>,
  ship: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M3 17l1.5 3a3 3 0 0 0 2.7 2h9.6a3 3 0 0 0 2.7-2L21 17"/><path d="M4 17h16l-1-5H5z"/><path d="M12 12V3l5 4"/></svg>,
  walk: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><circle cx="13" cy="4" r="1.5"/><path d="M9 22l2-7-3-3 2-5 4 1 2 4 3 1"/><path d="M9 12l-2 4"/></svg>,
  bike: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><circle cx="6" cy="17" r="3.5"/><circle cx="18" cy="17" r="3.5"/><path d="M6 17l4-7h6l-3-4"/><path d="M14 6h3"/><circle cx="14" cy="6" r="0.5" fill="currentColor"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z"/></svg>,
  chevL: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  mail: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  phone: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>,
  whats: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M20 12a8 8 0 1 1-3-6.2L20 4l-1.2 3.5A8 8 0 0 1 20 12z"/><path d="M9 9c0 4 2 6 6 6l1.5-1.5L14 12c-1 1-2 0-2-1l-1-2L9.5 8 9 9z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M5 12l4 4 10-10"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  minus: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M5 12h14"/></svg>,
  trend: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M3 17l5-6 4 3 8-9"/><path d="M16 5h4v4"/></svg>,
};

// ------- Date helpers -------
function fmtDate(d, locale = "nl-BE") {
  if (!d) return "—";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(d);
}
function fmtDateShort(d, locale = "nl-BE") {
  if (!d) return "";
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "2-digit" }).format(d);
}
function daysBetween(a, b) {
  if (!a || !b) return 0;
  return Math.round((b - a) / 86400000);
}
function sameDay(a, b) { return a && b && a.toDateString() === b.toDateString(); }

// Until a live calendar is connected, every selected period remains a preference.
const BOOKED = [];

function isBooked(d) {
  return BOOKED.some(r => d >= r.from && d < r.to);
}

// Season pricing (per night, base)
function seasonNightly(d) {
  const m = d.getMonth();
  const day = d.getDate();
  // High season July/Aug
  if (m === 6 || m === 7) return 164;
  // Easter / school holidays April + Christmas
  if (m === 3) return 132;
  if (m === 11 && day >= 20) return 158;
  // June, September
  if (m === 5 || m === 8) return 122;
  // Shoulder Spring/Autumn
  if (m === 2 || m === 4 || m === 9) return 108;
  // Low Jan/Feb/Nov/early Dec
  return 96;
}

function nightlyForRange(from, to) {
  if (!from || !to || to <= from) return [];
  const nights = [];
  let cur = new Date(from);
  while (cur < to) {
    nights.push({ date: new Date(cur), price: seasonNightly(cur) });
    cur.setDate(cur.getDate() + 1);
  }
  return nights;
}

// ------- Calendar -------
function Calendar({ value, onChange, anchor = new Date() }) {
  const [view, setView] = useState(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
  const [hover, setHover] = useState(null);
  const { copy, locale } = useI18n();

  const days = useMemo(() => {
    const y = view.getFullYear(), m = view.getMonth();
    const first = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0).getDate();
    const startDow = (first.getDay() + 6) % 7; // Mon=0
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= lastDay; d++) cells.push(new Date(y, m, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [view]);

  const today = new Date(); today.setHours(0,0,0,0);

  function handleClick(d) {
    if (!d || isBooked(d) || d < today) return;
    if (!value.from || (value.from && value.to)) {
      onChange({ from: d, to: null });
    } else if (d > value.from) {
      // Make sure no booked night sits between
      let ok = true;
      const tmp = new Date(value.from);
      while (tmp < d) { if (isBooked(tmp)) ok = false; tmp.setDate(tmp.getDate()+1); }
      if (!ok) { onChange({ from: d, to: null }); return; }
      onChange({ from: value.from, to: d });
    } else {
      onChange({ from: d, to: null });
    }
  }

  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} aria-label={copy.form.previousMonth}><Ico.chevL/></button>
        <div className="month">{new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(view)}</div>
        <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} aria-label={copy.form.nextMonth}><Ico.chevR/></button>
      </div>
      <div className="cal-grid">
        {copy.form.weekdays.map(d => <div key={d} className="cal-dow">{d}</div>)}
        {days.map((d, i) => {
          if (!d) return <div key={i} className="cal-day empty"></div>;
          const disabled = d < today;
          const booked = isBooked(d);
          const isStart = value.from && sameDay(d, value.from);
          const isEnd = value.to && sameDay(d, value.to);
          const inRange = value.from && (value.to || hover) &&
            d > value.from && d < (value.to || hover);
          const isToday = sameDay(d, new Date());
          let cls = "cal-day";
          if (disabled) cls += " disabled";
          else if (booked) cls += " booked";
          else if (isStart || isEnd) cls += " selected";
          else if (inRange) cls += " in-range";
          if (isToday) cls += " today";
          return (
            <button
              type="button"
              key={i}
              className={cls}
              aria-label={new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(d)}
              disabled={disabled || booked}
              onClick={() => handleClick(d)}
              onMouseEnter={() => setHover(d)}
              onMouseLeave={() => setHover(null)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div className="cal-legend">
        <span><i style={{background:"var(--ink)"}}/>{copy.form.selected}</span>
        <span>{copy.form.confirm}</span>
      </div>
    </div>
  );
}

// ------- Counter input -------
function Counter({ label, sub, value, onChange, min = 0, max = 8 }) {
  const { copy } = useI18n();
  return (
    <div className="toggle-row" style={{justifyContent:"space-between"}}>
      <div className="label">
        {label}
        {sub && <small>{sub}</small>}
      </div>
      <div style={{display:"flex", alignItems:"center", gap:8}}>
        <button
          type="button"
          aria-label={`${label} ${copy.form.decrease}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          style={{width:26,height:26,borderRadius:"var(--radius-sm)",border:"1px solid var(--rule)",background:"var(--paper)",color:"var(--ink-2)",display:"flex",alignItems:"center",justifyContent:"center"}}
          disabled={value <= min}
        ><Ico.minus/></button>
        <span style={{fontFamily:"var(--mono)",fontSize:14,minWidth:18,textAlign:"center",fontWeight:600}}>{value}</span>
        <button
          type="button"
          aria-label={`${label} ${copy.form.increase}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          style={{width:26,height:26,borderRadius:"var(--radius-sm)",border:"1px solid var(--rule)",background:"var(--paper)",color:"var(--ink-2)",display:"flex",alignItems:"center",justifyContent:"center"}}
          disabled={value >= max}
        ><Ico.plus/></button>
      </div>
    </div>
  );
}

// ------- Price checker logic -------
function PriceChecker({ from, to, adults, children, pets, totalEur }) {
  // Compose an internal guide band based on factors. This is not a live market comparison.
  const { copy } = useI18n();
  const nights = daysBetween(from, to);
  if (!nights) {
    return (
      <div className="price-check">
        <div className="pc-head">
          <div className="pc-title"><Ico.trend/> {copy.form.priceTitle}</div>
        </div>
        <div className="pc-explainer" style={{marginTop:0,color:"var(--ink-3)"}}>
          {copy.form.priceEmpty}
        </div>
      </div>
    );
  }

  // Base per night for the period
  const midPoint = new Date(from.getTime() + (to - from) / 2);
  const m = midPoint.getMonth();
  const seasonFactor = (m === 6 || m === 7) ? 1.22 :
                       (m === 3) ? 1.08 :
                       (m === 5 || m === 8) ? 1.0 :
                       (m === 2 || m === 4 || m === 9) ? 0.92 :
                       (m === 11 && midPoint.getDate() >= 20) ? 1.15 : 0.86;

  const guests = adults + children;
  const guestFactor = guests >= 7 ? 1.12 : guests >= 5 ? 1.05 : 1.0;
  const petFactor = pets ? 1.04 : 1.0;

  // Reference per night for this house profile.
  const refBase = 138; // €/night reference at shoulder season
  const refMid = refBase * seasonFactor * guestFactor * petFactor;
  const refLow = refMid * 0.85;
  const refHigh = refMid * 1.18;

  const yourPerNight = totalEur / nights;
  const yourPct = (yourPerNight - refLow) / (refHigh - refLow);
  const clamped = Math.max(0, Math.min(1, yourPct));

  // Bar full scale: 60% to 140% of refMid
  const scaleMin = refMid * 0.6;
  const scaleMax = refMid * 1.4;
  const yourPos = Math.max(0, Math.min(1, (yourPerNight - scaleMin) / (scaleMax - scaleMin)));
  const bandLeft = ((refLow - scaleMin) / (scaleMax - scaleMin)) * 100;
  const bandRight = ((refHigh - scaleMin) / (scaleMax - scaleMin)) * 100;

  let verdict, badgeCls, msg;
  if (yourPerNight < refLow) {
    verdict = copy.form.attractive;
    badgeCls = "good";
    msg = copy.form.attractiveText;
  } else if (yourPerNight <= refHigh) {
    verdict = copy.form.normal;
    badgeCls = "fair";
    msg = copy.form.normalText;
  } else {
    verdict = copy.form.busy;
    badgeCls = "high";
    msg = copy.form.busyText;
  }

  return (
    <div className="price-check">
      <div className="pc-head">
        <div className="pc-title"><Ico.trend/> {copy.form.priceTitle}</div>
        <span className={`pc-badge ${badgeCls}`}>{verdict}</span>
      </div>
      <div className="pc-bar">
        <div className="market-band" style={{ left: `${bandLeft}%`, right: `${100 - bandRight}%` }}/>
        <div className="yours" style={{ left: `${yourPos * 100}%` }} data-label={`€${Math.round(yourPerNight)}/n`}/>
      </div>
      <div className="pc-legend">
        <span>€{Math.round(scaleMin)}/n</span>
        <span>{copy.form.zone} €{Math.round(refLow)}–{Math.round(refHigh)}</span>
        <span>€{Math.round(scaleMax)}/n</span>
      </div>
      <div className="pc-explainer">{msg}</div>
      <div className="pc-factors">
        <div><span>{copy.form.period}</span><span>{m === 6 || m === 7 ? copy.form.seasonHigh : (m === 5 || m === 8) ? copy.form.seasonShoulder : (m === 11 && midPoint.getDate() >= 20) ? copy.form.seasonChristmas : copy.form.seasonLow}</span></div>
        <div><span>{copy.form.nights}</span><span>{nights}</span></div>
        <div><span>{copy.form.guests}</span><span>{guests}</span></div>
        <div><span>{copy.form.beach}</span><span>≈100 m</span></div>
        <div><span>{copy.form.bedrooms}</span><span>4</span></div>
        <div><span>{copy.form.petFee}</span><span>{pets ? copy.form.yes : "—"}</span></div>
      </div>
      <div style={{marginTop:12, fontSize:11, color:"var(--ink-3)", lineHeight:1.5}}>
        {copy.form.estimate}
      </div>
    </div>
  );
}

// ------- Main reservation card -------
function ReservationCard({ onSubmit }) {
  const { copy, locale } = useI18n();
  const [range, setRange] = useState({ from: null, to: null });
  const [adults, setAdults] = useState(4);
  const [kids, setKids] = useState(2);
  const [pets, setPets] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const nights = daysBetween(range.from, range.to);
  const breakdown = nightlyForRange(range.from, range.to);
  const subtotal = breakdown.reduce((s, n) => s + n.price, 0);
  const cleaning = 85;
  const tourist = 0;
  const petsFee = pets ? 35 : 0;
  const total = subtotal + cleaning + tourist + petsFee;

  const valid = range.from && range.to && nights >= 2 && name && email;

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;
    setSubmitted(true);
    onSubmit({ range, adults, kids, pets, name, email, phone, note, total, nights });
  }

  function inquiryText() {
    return [
      copy.form.inquiryTitle,
      `${copy.form.preferredDates}: ${fmtDate(range.from, locale)} — ${fmtDate(range.to, locale)} (${nights} ${copy.form.nights})`,
      `${copy.form.party}: ${adults} ${copy.form.adultsWord}, ${kids} ${copy.form.childrenWord}${pets ? `, ${copy.form.petRequest}` : ""}`,
      `${copy.form.websitePrice}: €${total.toFixed(0)}`,
      `${copy.form.name}: ${name}`,
      `${copy.form.email}: ${email}`,
      phone ? `${copy.form.phone}: ${phone}` : "",
      note ? `${copy.form.messageWord}: ${note}` : "",
      copy.form.requestConfirm
    ].filter(Boolean).join("\n");
  }

  async function copyInquiry() {
    const text = inquiryText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = text;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
    setCopied(true);
  }

  return (
    <div className="book-card" id="reserveer">
      <div className="head">
        <h3>{copy.form.title}</h3>
        <div className="from">
          {copy.form.from}
          <strong>€750 {copy.form.week}</strong>
        </div>
      </div>
      <form className="book-body" onSubmit={handleSubmit}>
        <Calendar value={range} onChange={setRange}/>

        <div className="field-row">
          <div className="field">
            <label htmlFor="arrival">{copy.form.arrival}</label>
            <input id="arrival" readOnly value={fmtDate(range.from, locale)} placeholder="—"/>
          </div>
          <div className="field">
            <label htmlFor="departure">{copy.form.departure}</label>
            <input id="departure" readOnly value={fmtDate(range.to, locale)} placeholder="—"/>
          </div>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          <Counter label={copy.form.adults} value={adults} onChange={setAdults} min={1} max={8}/>
          <Counter label={copy.form.children} sub={copy.form.childrenSub} value={kids} onChange={setKids} min={0} max={4}/>
          <div className="toggle-row">
            <div className="label">
              {copy.form.pet}
              <small>{copy.form.petSub}</small>
            </div>
            <button type="button" className={`toggle ${pets ? "on" : ""}`} onClick={() => setPets(!pets)} role="switch" aria-label={copy.form.petAria} aria-checked={pets}/>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="guest-name">{copy.form.name}</label>
            <input id="guest-name" required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Dany Dupont"/>
          </div>
          <div className="field">
            <label htmlFor="guest-email">{copy.form.email}</label>
            <input id="guest-email" required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nom@email.com"/>
          </div>
        </div>
        <div className="field">
          <label htmlFor="guest-phone">{copy.form.phone}</label>
          <input id="guest-phone" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+32 …"/>
        </div>
        {!showMsg ? (
          <button type="button" onClick={() => setShowMsg(true)}
            style={{alignSelf:"flex-start",fontSize:12,fontWeight:500,color:"var(--ink-3)",textDecoration:"underline",textUnderlineOffset:3}}>
            {copy.form.addMessage}
          </button>
        ) : (
          <div className="field">
            <label htmlFor="guest-note">{copy.form.message}</label>
            <textarea id="guest-note" value={note} onChange={e => setNote(e.target.value)} placeholder={copy.form.messagePlaceholder}/>
          </div>
        )}

        <div className="price-summary">
          {nights > 0 ? (
            <>
              <div className="price-row"><span>€{Math.round(subtotal/nights)} × {nights} {copy.form.nights}</span><span className="right">€{subtotal}</span></div>
              <div className="price-row"><span>{copy.form.cleaning}</span><span className="right">€{cleaning}</span></div>
              <div className="price-row"><span>{copy.form.tax}</span><span className="right">{copy.form.toConfirm}</span></div>
              {pets && <div className="price-row"><span>{copy.form.petFee}</span><span className="right">€{petsFee}</span></div>}
              <div className="price-row total"><span>{copy.form.total}</span><span className="right">€{total.toFixed(0)}</span></div>
            </>
          ) : (
            <div style={{fontSize:13,color:"var(--ink-3)"}}>{copy.form.chooseDates}</div>
          )}
        </div>

        <PriceChecker
          from={range.from}
          to={range.to}
          adults={adults}
          children={kids}
          pets={pets}
          totalEur={total}
        />

        <button type="submit" className={`btn btn-primary`} style={{width:"100%",padding:"16px",fontSize:14, opacity: valid ? 1 : 0.55, cursor: valid ? "pointer":"not-allowed"}}>
          {copy.form.submit}
          <Ico.arrow/>
        </button>
        <div style={{fontSize:11, color:"var(--ink-3)", textAlign:"center", lineHeight:1.5}}>
          {copy.form.disclaimer}
        </div>
        {submitted && (
          <div className="inquiry-ready" role="status">
            <strong>{copy.form.ready}</strong>
            <p>{copy.form.readyBody}</p>
            <div className="inquiry-actions">
              <button type="button" className="btn btn-ghost" onClick={copyInquiry}>{copied ? copy.form.copied : copy.form.copy}</button>
              <a className="btn btn-primary" href="https://www.mediavakanties.com/vakantiewoningen/70284" target="_blank" rel="noreferrer">{copy.form.open} <Ico.arrow/></a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

Object.assign(window, { ReservationCard, Ico, fmtDate, fmtDateShort });
