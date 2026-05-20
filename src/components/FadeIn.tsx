import { useEffect, useRef, useState, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?:   number;
}

export default function FadeIn({ children, delay = 0 }: Props) {
  const [visible, setVisible] = useState(false);
  const reduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (reduced.current) {
      setVisible(true);
      return;
    }
    const id = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  if (reduced.current) return <>{children}</>;

  return (
    <div
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 500ms ease, transform 500ms ease',
      }}
    >
      {children}
    </div>
  );
}
