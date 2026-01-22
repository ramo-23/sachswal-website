"use client";

import GalleryGrid from './GalleryGrid';
import { GALLERY_ITEMS } from '../../data/gallery';

export default function GalleryClient(){
  return (
    <div className="py-6">
      <GalleryGrid items={GALLERY_ITEMS} />
    </div>
  );
}
