"use client";

import Image from 'next/image';
import React from 'react';
import type { ImageItem } from '../../data/gallery';

export default function GalleryItem({ item, onOpen, index, variant = 'standard', isFeatured = false, isThumbnail = false }: { item: ImageItem; onOpen: (i:number)=>void; index:number; variant?: 'standard'|'masonry'; isFeatured?: boolean; isThumbnail?: boolean }) {
  const altText = item.shortDescription ? `${item.title} — ${item.shortDescription}` : item.title;

  const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsbD0nI2U1ZTdlYicvPjwvc3ZnPg==";

  if (variant === 'masonry') {
    return (
      <article className="break-inside-avoid mb-4 group">
        <button
          onClick={() => onOpen(index)}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          aria-label={`Open image: ${item.title}`}
        >
          <div className={`w-full overflow-hidden bg-gray-50 ${isThumbnail ? 'filter grayscale group-hover:grayscale-0 transition-all duration-300' : ''}`}>
            <Image src={item.src} alt={altText} width={1200} height={800} className="w-full h-auto block transition-transform duration-300 group-hover:scale-105" />
          </div>
        </button>

        <div className="mt-2">
          <div className="text-sm font-medium text-gray-900">{item.title}</div>
          <div className="text-xs text-slate-500">{item.year}{item.location ? ` — ${item.location}` : ''}</div>
        </div>
      </article>
    );
  }

  // standard / featured
  return (
    <article className="group relative">
      <button
        onClick={() => onOpen(index)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        aria-label={`Open image: ${item.title}`}
      >
        <div className={`relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-50 ${isThumbnail ? 'filter grayscale group-hover:grayscale-0 transition-all duration-300' : ''}`}>
          <Image src={item.src} alt={altText} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" priority={isFeatured} placeholder={isFeatured ? 'blur' : undefined} blurDataURL={isFeatured ? blurDataURL : undefined} />

            {isFeatured ? (
            <div className="absolute inset-0 flex items-end">
              <div className="w-full bg-black/50 backdrop-blur-sm text-white p-4">
                <div className="text-xl font-semibold">{item.title}</div>
                {item.shortDescription ? <div className="text-sm mt-1">{item.shortDescription}</div> : null}
              </div>
            </div>
          ) : null}
        </div>
      </button>

      <div className="mt-2">
        <div className="text-sm font-medium text-gray-900">{item.title}</div>
        <div className="text-xs text-slate-500">{item.year}{item.location ? ` — ${item.location}` : ''}</div>
      </div>
    </article>
  );
}
