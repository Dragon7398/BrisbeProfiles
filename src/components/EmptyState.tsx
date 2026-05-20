interface Props {
  heading?: string;
  tagline?: string;
}

export default function EmptyState({
  heading = 'Uncharted waters',
  tagline = 'This explorer is en route. Their first event will surface here once they make landfall.',
}: Props) {
  return (
    <div className="ap-empty-state">
      <span className="ap-empty-icon" aria-hidden>
        <svg width="64" height="48" viewBox="0 0 80 60" fill="none">
          <ellipse cx="40" cy="44" rx="28" ry="6" fill="currentColor" opacity="0.18" />
          <path
            d="M14 42 C14 28 24 16 40 14 C56 16 66 28 66 42"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M22 42 C22 32 30 22 40 20 C50 22 58 32 58 42"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.08"
          />
          <circle cx="40" cy="38" r="3" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
      <h2 className="ap-empty-heading">{heading}</h2>
      <p className="ap-empty-tagline">{tagline}</p>
    </div>
  );
}
