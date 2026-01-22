"use client";

import Reveal from "../../src/components/Reveal/Reveal";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';

export default function PartnersPage() {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="w-full bg-white">
      <Reveal>
        <section className="w-full relative">
          <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <Image
              src="/images/partners.jpg"
              alt="Partners"
              fill
              className="object-cover"
              sizes="100vw"
              style={{ transform: `translate3d(0, ${parallaxY}px, 0)`, filter: 'blur(2px)', objectPosition: 'center 40%' }}
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="max-w-300 mx-auto text-center">
                <div className="inline-block bg-black/50 p-6 md:p-8 text-white w-full md:max-w-2xl">
                  <h1 className="text-[28px] md:text-[44px] font-extrabold">Partners</h1>
                  <p className="mt-4 max-w-200 mx-auto text-gray-100 text-lg leading-relaxed">A snapshot of partner organisations, projects and trainings that support our child-protection and family-strengthening work.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="w-full py-12">
          <div className="max-w-300 mx-auto px-4">
            <div className="w-20 h-1 bg-orange-400 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900">Partners</h2>

            {/* Partners grid: image card with caption underneath */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(
                // Partner logos provided by user (placed in `public/images/`)
                [
                  { name: 'Brot für die Welt', src: '/images/Logo_Brot_für_die_Welt.png' },
                  { name: 'HigherLife Foundation', src: '/images/logo_higherlife.png' },
                  { name: 'UNICEF', src: '/images/logo_unicef.png' },
                  { name: 'Ministry of Education and Training', src: '/images/logo_moet.png' },
                  { name: 'Ministry of Social Development', src: '/images/ministry_social_development.png' },
                ]
              ).map((p) => (
                <article key={p.name} className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full h-28 sm:h-44 bg-white flex items-center justify-center overflow-hidden">
                    {/* Logo area: keeps aspect ratio and centers */}
                    <Image
                      src={p.src}
                      alt={p.name}
                      width={420}
                      height={220}
                      className="object-contain max-h-full max-w-full"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>

                  {/* Divider between logo and caption */}
                  <div aria-hidden="true" className="border-t border-gray-100" />

                  <div className="px-4 py-3">
                    <div className="text-base font-medium text-gray-900">{p.name}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="w-full py-12 bg-neutral-50">
          <div className="max-w-300 mx-auto px-4">
            <div className="w-20 h-1 bg-orange-400 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900">Selected Projects</h2>
            <div className="mt-6 space-y-6 text-gray-700">
              <article className="py-4">
                <h3 className="text-lg font-semibold text-gray-900">NISSA Updating — National Information System for Social Assistance</h3>
                <div className="text-sm text-slate-500 mt-1">2025–2026</div>
                <p className="mt-2 text-sm text-gray-700">Updating NISSA to improve targeting, data quality and case management. Implemented with EPRI, UNICEF and the Ministry of Youth, Gender and Social Development.</p>
              </article>

              <article className="py-4">
                <h3 className="text-lg font-semibold text-gray-900">UNICEF — Lesotho</h3>
                <div className="text-sm text-slate-500 mt-1">December 2024 – June 2025</div>
                <p className="mt-2 text-sm text-gray-700">Baseline KAP survey on social norms and behaviours related to vaccination in schools and communities; development of child protection training manuals. Maseru, Lesotho.</p>
              </article>

              <article className="py-4">
                <h3 className="text-lg font-semibold text-gray-900">Transformation Resource Centre & Brot für die Welt — Se-ea-le-methati</h3>
                <div className="text-sm text-slate-500 mt-1">September 2023 – April 2024</div>
                <p className="mt-2 text-sm text-gray-700">Supporting high school learners project.</p>
              </article>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="w-full py-12">
          <div className="max-w-300 mx-auto px-4">
            <h2 className="text-2xl font-semibold text-gray-900">Trainings Conducted</h2>
            <div className="mt-6 space-y-6 text-gray-700">
              <article className="py-4">
                <h3 className="text-lg font-semibold text-gray-900">HigherLife Foundation, Econet Telecom Lesotho — Child Protection training</h3>
                <div className="text-sm text-slate-500 mt-1">August 2023</div>
                <p className="mt-2 text-sm text-gray-700">Training for high school teachers and principals in Mafeteng.</p>
              </article>

              <article className="py-4">
                <h3 className="text-lg font-semibold text-gray-900">HigherLife Foundation, Econet Telecom Lesotho — Psycho-Social Support training</h3>
                <div className="text-sm text-slate-500 mt-1">December 2023</div>
                <p className="mt-2 text-sm text-gray-700">Training for caregivers and social workers in children’s homes.</p>
              </article>
            </div>

            <div className="mt-8 text-center">
              <Link href="/contact" className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-medium px-6 py-3 rounded-lg transition-colors">Contact Us for Partnerships</Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
