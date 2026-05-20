export type EventStatus = 'completed' | 'active' | 'upcoming';

export interface EventDef {
  id:         string;
  name:       string;
  season:     string;
  shortLabel: string;
  dates:      string;
  tagline:    string;
  lore:       string;
  badgeSrc:   string | null;
  accent:     string;
  status:     EventStatus;
}

export const EVENTS: EventDef[] = [
  {
    id:         'rpelago_s1',
    name:       'RPelago',
    season:     'Season 1',
    shortLabel: 'RPELAGO · S1',
    dates:      'May 2026 – Present',
    tagline:    'Collaborative Archipelago metagame on a 5×7 grid.',
    lore:       'Players send adventurers to map tiles, complete randomizer challenges together, and unlock the boss.',
    badgeSrc:   '/assets/rpelago-badge.png',
    accent:     '#d6a64a',
    status:     'active',
  },
];

export function eventById(id: string | null | undefined): EventDef | undefined {
  if (!id) return undefined;
  return EVENTS.find(e => e.id === id);
}
