export default function HeaderStrip() {
  return (
    <header className="ap-header-strip">
      <span className="ap-header-compass" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 2 14.5 9.5 12 12 9.5 9.5" fill="currentColor" stroke="none" />
          <polygon points="12 22 9.5 14.5 12 12 14.5 14.5" fill="currentColor" opacity="0.35" stroke="none" />
          <polygon points="2 12 9.5 9.5 12 12 9.5 14.5" fill="currentColor" opacity="0.35" stroke="none" />
          <polygon points="22 12 14.5 14.5 12 12 14.5 9.5" fill="currentColor" opacity="0.35" stroke="none" />
        </svg>
      </span>
      <div className="ap-header-text">
        <span className="ap-header-title">The Archipelago</span>
        <span className="ap-header-sub">Player Logbook</span>
      </div>
      <span className="ap-coord-pill" aria-hidden>38°N · 27°E</span>
    </header>
  );
}
