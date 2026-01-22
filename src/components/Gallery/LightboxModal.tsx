"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { ImageItem } from '../../data/gallery';

export default function LightboxModal({ items, currentIndex, onClose, onPrev, onNext }: { items: ImageItem[]; currentIndex: number; onClose: ()=>void; onPrev: ()=>void; onNext: ()=>void }){
  const overlayRef = useRef<HTMLDivElement|null>(null);
  const closeBtnRef = useRef<HTMLButtonElement|null>(null);

  useEffect(()=>{
    const prev = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      // trap tab key within modal using simple sentinel approach handled by focus sentinels
    };
    window.addEventListener('keydown', onKey);
    return ()=>{
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [onClose, onPrev, onNext]);

  const item = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />

      <div tabIndex={0} onFocus={() => closeBtnRef.current?.focus()} aria-hidden="true" />

      <div ref={overlayRef} role="dialog" aria-modal="true" aria-label="Image viewer" className="relative max-w-5xl w-full mx-4 sm:mx-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl">
          <div className="bg-black rounded-t-lg flex items-center justify-center" style={{ minHeight: '60vh', maxHeight: '80vh' }}>
            <div className="p-4 w-full flex items-center justify-center">
              <Image src={item.src} alt={item.shortDescription || item.title} width={1200} height={800} className="object-contain max-h-[70vh] max-w-full" />
            </div>

            <button ref={closeBtnRef} onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 focus:outline-none shadow-lg" aria-label="Close">
              <MdClose size={20} />
            </button>

            <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 focus:outline-none shadow-lg" aria-label="Previous image">
              <MdChevronLeft size={22} />
            </button>

            <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-gray-800 focus:outline-none shadow-lg" aria-label="Next image">
              <MdChevronRight size={22} />
            </button>
          </div>

          <div className="bg-white px-5 py-3 border-t">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            {item.shortDescription && <p className="text-sm text-slate-600 mt-1">{item.shortDescription}</p>}
            <div className="text-xs text-slate-500 mt-2">{item.year}{item.location ? ` — ${item.location}` : ''}</div>
          </div>
        </div>
      </div>

      <div tabIndex={0} onFocus={() => closeBtnRef.current?.focus()} aria-hidden="true" />
    </div>
  );
}
