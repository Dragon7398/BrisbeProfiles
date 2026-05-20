import { useEffect, useState } from 'react';
import { ref, get, onValue } from 'firebase/database';
import { db } from '../firebase/config.ts';
import type { ProfileRecord } from '../lib/profileTypes.ts';
import { encodeHandle } from '../lib/utils.ts';

export type ProfileLoadState =
  | { status: 'loading' }
  | { status: 'not_found' }
  | { status: 'loaded'; data: ProfileRecord };

function isUid(s: string): boolean {
  return /^discord_\d+$/.test(s);
}

export function usePlayerProfile(identifier: string | undefined): ProfileLoadState {
  const [state, setState] = useState<ProfileLoadState>({ status: 'loading' });

  useEffect(() => {
    if (!identifier) return;

    if (!db) {
      setState({ status: 'not_found' });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading' });

    const subscribe = (uid: string) => {
      const playerRef = ref(db!, `profiles/players/${uid}`);
      const unsub = onValue(playerRef, snap => {
        if (cancelled) return;
        if (!snap.exists()) {
          setState({ status: 'not_found' });
        } else {
          setState({ status: 'loaded', data: snap.val() as ProfileRecord });
        }
      });
      return unsub;
    };

    let unsub: (() => void) | undefined;

    if (isUid(identifier)) {
      unsub = subscribe(identifier);
    } else {
      const encoded = encodeHandle(identifier);
      get(ref(db, `profiles/handleIndex/${encoded}`)).then(snap => {
        if (cancelled) return;
        if (!snap.exists()) {
          setState({ status: 'not_found' });
          return;
        }
        const uid = snap.val() as string;
        unsub = subscribe(uid);
      }).catch(() => {
        if (!cancelled) setState({ status: 'not_found' });
      });
    }

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [identifier]);

  return state;
}
