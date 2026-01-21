"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  delay?: number; // milliseconds
};

export default function Reveal({ children, className = "", once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.15, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user preference for reduced motion
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // schedule state change on next animation frame for smoother update
            window.requestAnimationFrame(() => {
              if (!cancelled) setVisible(true);
              if (once && observer && el) observer.unobserve(el);
            });
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const classes = `reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim();

  return (
    <div
      ref={ref}
      className={classes}
      style={{ willChange: 'transform, opacity', transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
