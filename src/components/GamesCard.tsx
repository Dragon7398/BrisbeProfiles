import { useState } from 'react';
import type { ProfileRecord } from '../lib/profileTypes.ts';
import { uniqueGames } from '../lib/profileTypes.ts';
import { eventById } from '../lib/events.ts';
import FadeIn from './FadeIn.tsx';

interface GameChipProps {
  game:  { name: string; eventIds: string[] };
  delay: number;
}

function GameChip({ game, delay }: GameChipProps) {
  return (
    <FadeIn delay={delay}>
      <div className="ap-game-chip">
        <span className="ap-dot-cluster" aria-hidden>
          {game.eventIds.map(id => {
            const ev = eventById(id);
            return (
              <span
                key={id}
                className="ap-event-dot"
                style={{ background: ev?.accent ?? '#8A938F' }}
                title={ev?.shortLabel ?? id}
              />
            );
          })}
        </span>
        <span className="ap-game-name" title={game.name}>{game.name}</span>
      </div>
    </FadeIn>
  );
}

interface Props {
  record:   ProfileRecord;
  density?: 'cozy' | 'compact';
}

export default function GamesCard({ record, density = 'cozy' }: Props) {
  const [expanded, setExpanded] = useState(false);
  const games = uniqueGames(record);
  const previewCount = density === 'compact' ? 4 : 6;
  const overflow = games.length - previewCount;
  const visible = expanded ? games : games.slice(0, previewCount);

  if (games.length === 0) {
    return (
      <div className="ap-card">
        <div className="ap-games-toggle" style={{ cursor: 'default' }}>
          <div className="ap-games-header-text">
            <span className="ap-eyebrow">Cargo Hold · All Expeditions</span>
            <div className="ap-games-title">
              Games brought to slots
              <span className="ap-count-pill">0</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '14px', border: '1px dashed var(--c-rule)', borderRadius: 'var(--radius)', padding: '20px', textAlign: 'center' }}>
          <span className="ap-eyebrow">Cargo hold empty.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ap-card">
      <button
        className="ap-games-toggle"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
      >
        <div className="ap-games-header-text">
          <span className="ap-eyebrow">Cargo Hold · All Expeditions</span>
          <div className="ap-games-title">
            Games brought to slots
            <span className="ap-count-pill">{games.length}</span>
          </div>
        </div>
        <span className="ap-chevron-pill">
          {expanded ? 'Hide manifest' : 'View manifest'}
        </span>
      </button>

      <div className="ap-games-chips" role="list">
        {visible.map((game, i) => (
          <GameChip
            key={game.name}
            game={game}
            delay={expanded ? 420 + i * 26 : 0}
          />
        ))}

        {!expanded && overflow > 0 && (
          <button
            className="ap-games-overflow"
            onClick={() => setExpanded(true)}
            aria-label={`Show ${overflow} more games`}
          >
            +{overflow} more
          </button>
        )}
      </div>
    </div>
  );
}
