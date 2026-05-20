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
    dates:      'Mar – May 2026',
    tagline:    'Collaborative Archipelago metagame on a 5×7 grid.',
    lore:       'Players send adventurers to map tiles, complete randomizer challenges together, and unlock the boss.',
    badgeSrc:   '/assets/rpelago-badge.png',
    accent:     '#d6a64a',
    status:     'active',
  },
  {
    id:         'rpelago_s2',
    name:       'RPelago',
    season:     'Season 2',
    shortLabel: 'RPELAGO · S2',
    dates:      'Coming late 2026',
    tagline:    'The grid returns. New tiles, new traits, larger map.',
    lore:       'Season 2 is brewing in the workshop.',
    badgeSrc:   null,
    accent:     '#d6a64a',
    status:     'upcoming',
  },
  {
    id:         'infected',
    name:       'Infected',
    season:     'Season 1',
    shortLabel: 'INFECTED · S1',
    dates:      'TBA · 2026',
    tagline:    'Multi-world survival. Hint pools spread between slots.',
    lore:       'Quarantine a slot, ration your items, survive the spread.',
    badgeSrc:   null,
    accent:     '#7e3b6b',
    status:     'upcoming',
  },
  {
    id:         'beat_the_reaper',
    name:       'Beat the Reaper',
    season:     'Season 1',
    shortLabel: 'BTR · S1',
    dates:      'TBA · 2026',
    tagline:    'Race the clock — the Reaper gains hours every day.',
    lore:       'A timed Archipelago format where the world dies if you stall.',
    badgeSrc:   null,
    accent:     '#a83e3e',
    status:     'upcoming',
  },
];

export function eventById(id: string | null | undefined): EventDef | undefined {
  if (!id) return undefined;
  return EVENTS.find(e => e.id === id);
}
