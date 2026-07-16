export interface EventParticipation {
  // rpelago_* seasons
  xp?:       number;
  tiles?:    number;
  missions?: number;
  // casino_* seasons
  gold?:        number;
  handsPlayed?: number;
  games:     Record<string, true>;
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
    const stats: Stat[] = [
      { key: 'xp', label: 'TOTAL XP', value: part.xp ?? 0, format: 'number' },
    ];
    if (part.tiles)    stats.push({ key: 'tiles',    label: 'TILES PLAYED',    value: part.tiles,    format: 'number' });
    if (part.missions) stats.push({ key: 'missions', label: 'MISSIONS PLAYED', value: part.missions, format: 'number' });
    return stats;
  }
  if (eventId.startsWith('casino')) {
    const stats: Stat[] = [];
    // gold is the headline stat; show it even when the balance is 0.
    if (part.gold !== undefined)        stats.push({ key: 'gold',        label: 'GOLD',         value: part.gold,        format: 'number' });
    if (part.handsPlayed !== undefined) stats.push({ key: 'handsPlayed', label: 'HANDS PLAYED', value: part.handsPlayed, format: 'number' });
    return stats;
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
