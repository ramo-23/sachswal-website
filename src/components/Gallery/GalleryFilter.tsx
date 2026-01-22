"use client";

import React from 'react';

export default function GalleryFilter({ categories, years, activeCategories, activeYears, onToggleCategory, onToggleYear, onClear }: {
  categories: string[];
  years: number[];
  activeCategories: Set<string>;
  activeYears: Set<number>;
  onToggleCategory: (c:string)=>void;
  onToggleYear: (y:number)=>void;
  onClear: ()=>void;
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-700 mr-2">Categories:</span>
        {categories.map(c => (
          <button key={c} onClick={() => onToggleCategory(c)} className={`px-3 py-1 rounded-full text-sm ${activeCategories.has(c) ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-gray-700 mr-2">Year:</span>
        {years.map(y => (
          <button key={y} onClick={() => onToggleYear(y)} className={`px-3 py-1 rounded-full text-sm ${activeYears.has(y) ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {y}
          </button>
        ))}

        <button onClick={onClear} className="ml-4 px-3 py-1 text-sm text-slate-600">Clear</button>
      </div>
    </div>
  );
}
