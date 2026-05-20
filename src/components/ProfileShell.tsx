import type { ProfileRecord } from '../lib/profileTypes.ts';
import { EVENTS, eventById } from '../lib/events.ts';
import FadeIn from './FadeIn.tsx';
import HeaderStrip from './HeaderStrip.tsx';
import IdentityCard from './IdentityCard.tsx';
import BadgeCase from './BadgeCase.tsx';
import CampaignCard from './CampaignCard.tsx';
import GamesCard from './GamesCard.tsx';
import EmptyState from './EmptyState.tsx';

interface Props {
  record: ProfileRecord;
}

export default function ProfileShell({ record }: Props) {
  // Only render campaign cards for events that exist in our registry, in EVENTS order
  const campaignEntries = EVENTS
    .filter(ev => record.events?.[ev.id] !== undefined)
    .map(ev => ({ event: ev, part: record.events![ev.id] }));

  const hasEvents = campaignEntries.length > 0;
  // Also need games card if player has any games even without campaigns (shouldn't happen but guard it)
  const hasGames = Object.values(record.events ?? {}).some(p => Object.keys(p.games ?? {}).length > 0);

  return (
    <div className="ap-shell" data-density="cozy">
      <HeaderStrip />
      <div className="ap-grid">
        <div className="ap-left">
          <FadeIn delay={0}>
            <IdentityCard record={record} />
          </FadeIn>
          <FadeIn delay={80}>
            <BadgeCase record={record} />
          </FadeIn>
        </div>

        <div className="ap-right">
          {hasEvents ? (
            <>
              {campaignEntries.map(({ event, part }, i) => (
                <CampaignCard
                  key={event.id}
                  event={event}
                  part={part}
                  index={i}
                />
              ))}
              {hasGames && (
                <FadeIn delay={40 + campaignEntries.length * 60}>
                  <GamesCard record={record} />
                </FadeIn>
              )}
            </>
          ) : (
            <EmptyState
              tagline={`${record.displayName} is en route. Their first event will surface here once they make landfall.`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Needed so ProfilePage can look up firstEvent label without importing eventById separately
export { eventById };
