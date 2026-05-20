import { useRef, type ReactNode, type MouseEvent } from 'react';

interface Props {
  children:  ReactNode;
  disabled?: boolean;
}

const MAX_TILT = 6;

export default function HoverTilt({ children, disabled = false }: Props) {
  const elRef = useRef<HTMLDivElement>(null);

  const noPointer =
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: none)').matches
      : false;
  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const inactive = disabled || noPointer || reduced;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (inactive || !elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    elRef.current.style.transform =
      `perspective(600px) rotateY(${dx * MAX_TILT}deg) rotateX(${-dy * MAX_TILT}deg)`;
  };

  const handleLeave = () => {
    if (inactive || !elRef.current) return;
    elRef.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={elRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: inactive ? undefined : 'transform 250ms ease' }}
    >
      {children}
    </div>
  );
}
