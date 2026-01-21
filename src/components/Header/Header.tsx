"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header({ children }: { children?: ReactNode }) {
  const pathname = usePathname() || "/";
  const ref = useRef<HTMLElement | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setHeight(el.getBoundingClientRect().height);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset;
          setIsFixed(y > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => setHeight(el.getBoundingClientRect().height));

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const linkClass = (path: string) => {
    const base = "transition-colors duration-150 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200";
    const active = pathname === path ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-gray-900";
    return `${active} ${base}`;
  };

  return (
    <>
      <header
        ref={ref}
        className={`top-0 left-0 right-0 z-50 transition-colors duration-200 ${isFixed ? 'fixed bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200' : 'bg-transparent'}`}
      >
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-3 items-center gap-6 py-4">

          {/* Left: Logo / Organisation Name */}
          <div className="col-start-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo/logo.jpg" alt="SaCHSWAL logo" width={56} height={56} className="object-contain" style={{ width: '56px', height: 'auto' }} />
              <span className="sr-only">SaCHSWAL</span>
            </Link>
          </div>

          {/* Center: Navigation (centered) */}
          <nav aria-label="Primary navigation" className="col-start-2 justify-self-center flex gap-8 text-base font-medium">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/about" className={linkClass("/about")}>About Us</Link>
            <Link href="/projects" className={linkClass("/projects")}>Programs & Services</Link>
            <Link href="/gallery" className={linkClass("/gallery")}>Gallery</Link>
            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
          </nav>

          {/* Right: placeholder for actions (keeps nav centered) */}
          <div className="col-start-3 text-right">
          </div>

        </div>
        <div className="h-px bg-gray-100" aria-hidden="true" />
      </header>

      {/* Spacer to prevent layout jump when header becomes fixed */}
      {isFixed && <div style={{ height: height }} aria-hidden="true" />}

      {children}
    </>
  );
}
