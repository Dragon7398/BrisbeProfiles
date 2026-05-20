import { EVENTS, type EventDef } from '../lib/events.ts';
import type { ProfileRecord } from '../lib/profileTypes.ts';
import HoverTilt from './HoverTilt.tsx';

interface DiskProps {
  event:  EventDef;
  played: boolean;
}

function BadgeDisk({ event, played }: DiskProps) {
  if (played) {
    return (
      <div className="ap-badge-disk-wrap">
        <HoverTilt>
          <div
            className="ap-badge-disk ap-badge-known"
            style={!event.badgeSrc ? { background: event.accent } : undefined}
          >
            {event.badgeSrc ? (
              <img src={event.badgeSrc} alt={event.name} />
            ) : (
              <span className="ap-badge-disk-label">{event.shortLabel}</span>
            )}
          </div>
        </HoverTilt>
        <div className="ap-tooltip">{event.lore}</div>
        <span className="ap-badge-event-name">{event.name}</span>
      </div>
    );
  }

  return (
    <div className="ap-badge-disk-wrap" aria-label={`${event.name} — upcoming`}>
      <div className="ap-badge-disk ap-badge-upcoming">
        <span className="ap-badge-upcoming-q">?</span>
      </div>
      <span className="ap-badge-event-name" style={{ opacity: 0.5 }}>{event.name}</span>
    </div>
  );
}

interface Props {
  record: ProfileRecord;
}

export default function BadgeCase({ record }: Props) {
  const playedIds = new Set(Object.keys(record.events ?? {}));
  const playedCount = EVENTS.filter(e => playedIds.has(e.id)).length;

  return (
    <div className="ap-card">
      <div className="ap-badge-case-header">
        <span className="ap-badge-case-title">Discovered Islands</span>
        <span className="ap-count-pill">{playedCount} / {EVENTS.length}</span>
      </div>
      <div className="ap-badge-grid">
        {EVENTS.map(event => (
          <BadgeDisk
            key={event.id}
            event={event}
            played={playedIds.has(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
