"use client";

import Reveal from "../../src/components/Reveal/Reveal";
import PageContainer from "../../src/components/PageContainer/PageContainer";
import GalleryClient from "../../src/components/Gallery/GalleryClient";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GalleryPage() {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-white text-gray-900">
      <Reveal>
        <section className="w-full relative">
          <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <Image
              src="/images/gallery_image.png"
              alt="Gallery background"
              fill
              className="object-cover"
              sizes="100vw"
              style={{ transform: `translate3d(0, ${parallaxY}px, 0)`, filter: 'blur(2px)', objectPosition: 'center 40%' }}
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="max-w-300 mx-auto text-center">
                <div className="inline-block bg-black/50 p-6 md:p-8 text-white w-full md:max-w-2xl">
                  <h1 className="text-[28px] md:text-[44px] font-extrabold">Gallery</h1>
                  <p className="mt-4 max-w-180 mx-auto text-gray-100 text-lg leading-relaxed">Browse images and highlights from SaCHSWAL&lsquo;s programmes, community activities, research and events across Lesotho.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <PageContainer>
        <section className="py-8">
          <GalleryClient />
        </section>
      </PageContainer>
    </main>
  );
}
