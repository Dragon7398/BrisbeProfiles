import { useEffect, useRef, useState } from 'react';

interface Props {
  value:   number;
  format?: 'number' | 'time';
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(n: number, format: 'number' | 'time'): string {
  if (format === 'time') {
    const mins = Math.floor(n / 60);
    const secs = Math.floor(n % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }
  return Math.round(n).toLocaleString();
}

export default function AnimatedNumber({ value, format = 'number' }: Props) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(value * easeOutCubic(t));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span>{formatValue(display, format)}</span>;
}
