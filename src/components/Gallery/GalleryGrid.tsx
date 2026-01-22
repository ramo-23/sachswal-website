"use client";

import React, { useMemo, useState } from 'react';
import GalleryItem from './GalleryItem';
import GalleryFilter from './GalleryFilter';
import LightboxModal from './LightboxModal';
import type { ImageItem } from '../../data/gallery';

export default function GalleryGrid({ items }: { items: ImageItem[] }){
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [activeYears, setActiveYears] = useState<Set<number>>(new Set());
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [layout, setLayout] = useState<'grid'|'masonry'>('grid');

  const categories = Array.from(new Set(items.map(i=>i.category)));
  const years = Array.from(new Set(items.map(i=>i.year).filter(Boolean))).sort((a,b)=>Number(b)-Number(a)) as number[];

  const toggleCategory = (c:string) => {
    const copy = new Set(activeCategories);
    if (copy.has(c)) copy.delete(c); else copy.add(c);
    setActiveCategories(copy);
  };

  const toggleYear = (y:number) => {
    const copy = new Set(activeYears);
    if (copy.has(y)) copy.delete(y); else copy.add(y);
    setActiveYears(copy);
  };

  const clearFilters = ()=>{ setActiveCategories(new Set()); setActiveYears(new Set()); };

  const filtered = useMemo(()=>{
    return items.filter(it=>{
      if (activeCategories.size && !activeCategories.has(it.category)) return false;
      if (activeYears.size && it.year && !activeYears.has(it.year)) return false;
      return true;
    });
  }, [items, activeCategories, activeYears]);

  const openLightbox = (i:number) => setOpenIndex(i);
  const closeLightbox = () => setOpenIndex(null);
  const showPrev = () => setOpenIndex(i => i === null ? null : (i - 1 + filtered.length) % filtered.length);
  const showNext = () => setOpenIndex(i => i === null ? null : (i + 1) % filtered.length);

  // Group by category for story-driven layout
  const groups = useMemo(()=>{
    const map = new Map<string, ImageItem[]>();
    filtered.forEach(it=>{
      const arr = map.get(it.category) || [];
      arr.push(it);
      map.set(it.category, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <GalleryFilter categories={categories} years={years} activeCategories={activeCategories} activeYears={activeYears} onToggleCategory={toggleCategory} onToggleYear={toggleYear} onClear={clearFilters} />

        <div className="ml-4 flex gap-2">
          <button onClick={() => setLayout('grid')} className={`px-3 py-1 text-sm rounded ${layout==='grid' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>Grid</button>
          <button onClick={() => setLayout('masonry')} className={`px-3 py-1 text-sm rounded ${layout==='masonry' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>Masonry</button>
        </div>
      </div>

      {layout === 'grid' ? (
        <div className="space-y-12">
          {groups.map(([category, items])=>{
          const featured = items.find(i=>i.featured) || items[0];
          const others = items.filter(i=>i.id !== featured.id);

          const getFilteredIndex = (it: any) => filtered.findIndex(f => f.id === it.id);

          return (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <h3 id={`cat-${category}`} className="text-2xl font-semibold text-gray-900 mb-4">{category}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2">
                  <div className="overflow-hidden rounded-sm">
                    <GalleryItem item={featured} onOpen={() => openLightbox(getFilteredIndex(featured))} index={getFilteredIndex(featured)} isFeatured />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {others.map((it, idx)=> (
                    <GalleryItem key={it.id} item={it} onOpen={() => openLightbox(getFilteredIndex(it))} index={getFilteredIndex(it)} isThumbnail />
                  ))}
                </div>
              </div>
            </section>
          );
          })}
        </div>
      ) : (
        <div>
          {/* Masonry using CSS columns for organic layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((it, idx) => (
              <div key={it.id}>
                <GalleryItem item={it} onOpen={() => openLightbox(filtered.findIndex(f=>f.id===it.id))} index={filtered.findIndex(f=>f.id===it.id)} variant="masonry" />
              </div>
            ))}
          </div>
        </div>
      )}

      {openIndex !== null && (
        <LightboxModal items={filtered} currentIndex={openIndex} onClose={closeLightbox} onPrev={showPrev} onNext={showNext} />
      )}
    </div>
  );
}
