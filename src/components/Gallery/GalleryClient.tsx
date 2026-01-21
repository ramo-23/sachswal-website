"use client";

import Reveal from "../Reveal/Reveal";
import { useCallback, useEffect, useState } from "react";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";

type ImageItem = { src: string; alt: string; caption?: string };

const IMAGES: ImageItem[] = [
  { src: "/images/school_counselling_session.jpg", alt: "School-based counselling session", caption: "School-based counselling session" },
  { src: "/images/fun_day.jpg", alt: "Community outreach in Mafeteng", caption: "Fun day hosted by Sachswal" },
  { src: "/images/farewell_ceremony.jpg", alt: "Play therapy session with children", caption: "PFarewell Ceremony" },
  { src: "/images/training_session.jpg", alt: "Teacher training workshop", caption: "HigherLife education training session" },
  { src: "/images/workshop.jpg", alt: "Reading circle at Mafeteng Primary School", caption: "Teacher training workshop" },
  { src: "/images/community_meeting.jpg", alt: "Community meeting in Mafeteng", caption: "Community meeting in Mafeteng" },
];

export default function GalleryClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setOpenIndex(i), []);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => setOpenIndex((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length)), []);
  const showNext = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + 1) % IMAGES.length)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, closeLightbox, showNext, showPrev]);

  return (
    <>
      {IMAGES.length === 0 ? (
        <div className="py-12 text-center text-gray-600">Images from our programs and community work will be added here.</div>
      ) : (
          <div className="max-w-[1400px] mx-auto px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {IMAGES.map((img, idx) => (
                <Reveal key={img.src} delay={idx * 60}>
                  <article className="group">
                    <button
                      onClick={() => openLightbox(idx)}
                      className="w-full text-left rounded-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                      aria-label={`Open image: ${img.alt}`}
                    >
                      <div className="bg-gray-50">
                        <img src={img.src} alt={img.alt} className="w-full h-auto block rounded-md" />
                      </div>
                    </button>

                    {img.caption ? (
                      <p className="mt-2 text-sm text-gray-600">{img.caption}</p>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
      )}

      {openIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeLightbox} aria-hidden="true" />

          <div className="relative max-w-[1400px] w-full mx-4 sm:mx-6">
            <div className="bg-white rounded-md overflow-hidden shadow-lg">
              <div className="relative">
                <img src={IMAGES[openIndex].src} alt={IMAGES[openIndex].alt} className="w-full h-auto max-h-[80vh] object-contain block" />

                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 p-2 rounded-md bg-white/80 hover:bg-white text-gray-800 focus:outline-none"
                  aria-label="Close"
                >
                  <MdClose size={20} />
                </button>

                <button
                  onClick={showPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-white/80 hover:bg-white text-gray-800 focus:outline-none"
                  aria-label="Previous image"
                >
                  <MdChevronLeft size={22} />
                </button>

                <button
                  onClick={showNext}
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-md bg-white/80 hover:bg-white text-gray-800 focus:outline-none"
                  aria-label="Next image"
                >
                  <MdChevronRight size={22} />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700">{IMAGES[openIndex].caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
