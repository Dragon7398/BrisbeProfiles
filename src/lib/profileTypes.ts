export interface EventParticipation {
  xp:    number;
  tiles: number;
  games: Record<string, true>;
}

export interface ProfileRecord {
  id:            string;
  displayName:   string;
  discordHandle: string | null;
  avatarHash:    string | null;
  joinedAt:      number | null;
  firstEvent:    string | null;
  events?:       Record<string, EventParticipation>;
}

export interface Stat {
  key:    string;
  label:  string;
  value:  number;
  format: 'number' | 'time';
}

export function eventToStats(eventId: string, part: EventParticipation): Stat[] {
  if (eventId.startsWith('rpelago')) {
    return [
      { key: 'xp',    label: 'TOTAL XP',              value: part.xp,    format: 'number' },
      { key: 'tiles', label: 'TILES HELPED COMPLETE', value: part.tiles, format: 'number' },
    ];
  }
  return [];
}

export function uniqueGames(record: ProfileRecord): { name: string; eventIds: string[] }[] {
  const map = new Map<string, Set<string>>();
  for (const [eventId, part] of Object.entries(record.events ?? {})) {
    for (const encoded of Object.keys(part.games ?? {})) {
      const name = decodeURIComponent(encoded);
      if (!map.has(name)) map.set(name, new Set());
      map.get(name)!.add(eventId);
    }
  }
  return [...map.entries()]
    .map(([name, ids]) => ({ name, eventIds: [...ids] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
