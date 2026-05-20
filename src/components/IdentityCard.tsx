import { useState } from 'react';
import type { ProfileRecord } from '../lib/profileTypes.ts';
import { eventById } from '../lib/events.ts';
import { fmtDate } from '../lib/utils.ts';

function InitialsAvatar({ displayName, handle }: { displayName: string; handle: string | null }) {
  const words = displayName.trim().split(/\s+/);
  const initials = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : (words[0][0] ?? '?').toUpperCase();

  const source = handle ?? displayName;
  let charSum = 0;
  for (let i = 0; i < source.length; i++) charSum += source.charCodeAt(i);
  const hue1 = charSum % 360;
  const hue2 = (hue1 + 60) % 360;

  return (
    <div
      className="ap-initials-avatar"
      style={{
        background: `linear-gradient(135deg, hsl(${hue1}, 55%, 45%), hsl(${hue2}, 60%, 38%))`,
      }}
      aria-label={`${displayName} avatar`}
    >
      {initials}
    </div>
  );
}

function DiscordLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

interface Props {
  record: ProfileRecord;
}

export default function IdentityCard({ record }: Props) {
  const [avatarError, setAvatarError] = useState(false);

  const numericId = record.id.replace('discord_', '');
  const avatarSrc = record.avatarHash && !avatarError
    ? `https://cdn.discordapp.com/avatars/${numericId}/${record.avatarHash}.png?size=128`
    : null;

  const firstEventDef = eventById(record.firstEvent);

  return (
    <div className="ap-card ap-identity-card">
      {avatarSrc ? (
        <img
          className="ap-avatar"
          src={avatarSrc}
          alt={`${record.displayName} avatar`}
          onError={() => setAvatarError(true)}
        />
      ) : (
        <InitialsAvatar displayName={record.displayName} handle={record.discordHandle} />
      )}

      <div className="ap-identity-name">{record.displayName}</div>

      {record.discordHandle && (
        <div className="ap-discord-chip">
          <DiscordLogo />
          <span>@{record.discordHandle}</span>
        </div>
      )}

      <hr className="ap-dashed-rule" />

      <div className="ap-meta-row">
        <span className="ap-meta-label">Set sail</span>
        <span className="ap-meta-value">{fmtDate(record.joinedAt)}</span>
      </div>
      <div className="ap-meta-row">
        <span className="ap-meta-label">First voyage</span>
        <span className="ap-meta-value">{firstEventDef?.shortLabel ?? '—'}</span>
      </div>
    </div>
  );
}
