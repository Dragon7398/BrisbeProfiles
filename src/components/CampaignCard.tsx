import type { EventDef } from '../lib/events.ts';
import type { EventParticipation, Stat } from '../lib/profileTypes.ts';
import { eventToStats } from '../lib/profileTypes.ts';
import AnimatedNumber from './AnimatedNumber.tsx';
import FadeIn from './FadeIn.tsx';

function StatTile({ stat, isLast }: { stat: Stat; isLast: boolean }) {
  return (
    <>
      <div className="ap-stat-tile">
        <div className="ap-stat-value">
          <AnimatedNumber value={stat.value} format={stat.format} />
        </div>
        <div className="ap-eyebrow">{stat.label}</div>
      </div>
      {!isLast && <div className="ap-stat-divider" aria-hidden />}
    </>
  );
}

function CampaignThumb({ event }: { event: EventDef }) {
  return (
    <div
      className="ap-campaign-thumb"
      style={!event.badgeSrc ? { background: event.accent } : undefined}
    >
      {event.badgeSrc ? (
        <img src={event.badgeSrc} alt={event.name} />
      ) : (
        <span className="ap-campaign-thumb-label">{event.shortLabel}</span>
      )}
    </div>
  );
}

interface Props {
  event: EventDef;
  part:  EventParticipation;
  index: number;
}

export default function CampaignCard({ event, part, index }: Props) {
  const stats = eventToStats(event.id, part);

  return (
    <FadeIn delay={40 + index * 60}>
      <div className="ap-card ap-campaign-card" style={{ paddingLeft: '28px' }}>
        <div
          className="ap-campaign-stripe"
          style={{ background: event.accent }}
          aria-hidden
        />

        <div className="ap-campaign-header">
          <CampaignThumb event={event} />
          <div className="ap-campaign-meta">
            <span className="ap-eyebrow">Expedition</span>
            <div className="ap-campaign-name">{event.name}</div>
            {event.season && (
              <div className="ap-campaign-season">{event.season}</div>
            )}
            <div className="ap-campaign-dates">{event.dates}</div>
          </div>
        </div>

        {stats.length > 0 && (
          <>
            <hr className="ap-rule" />
            <div className="ap-stats-row">
              {stats.map((stat, i) => (
                <StatTile key={stat.key} stat={stat} isLast={i === stats.length - 1} />
              ))}
            </div>
          </>
        )}
      </div>
    </FadeIn>
  );
}
