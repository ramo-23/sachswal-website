"use client";

import Image from "next/image";
import Reveal from "../../src/components/Reveal/Reveal";
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Reveal>
        <section aria-labelledby="about-hero-heading" className="w-full relative">
          <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <Image
              src="/images/about_hero.jpg"
              alt="Community work in Mafeteng"
              fill
              className="object-cover"
              sizes="100vw"
              style={{ transform: `translate3d(0, ${parallaxY}px, 0)`, filter: 'blur(2px)', objectPosition: 'center 35%' }}
            />

            {/* stronger overlay for legibility */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="max-w-300 mx-auto text-center">
                <div className="inline-block bg-black/50 p-6 md:p-8 text-white w-full md:max-w-2xl">
                  <h1 id="about-hero-heading" className="text-[28px] md:text-[44px] font-extrabold">About SaCHSWAL</h1>
                  <p className="mt-4 max-w-180 mx-auto text-gray-100 text-lg leading-relaxed">SaCHSWAL works with communities across Lesotho to improve child health, strengthen families, and support sustainable community-led services.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Organisation Background */}
      <Reveal>
        <section aria-labelledby="background-heading" className="w-full py-16 border-t border-gray-200">
          <div className="max-w-300 mx-auto px-4">
            <div className="w-16 h-1 bg-orange-400 mb-6" />
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div>
                <h2 id="background-heading" className="text-[32px] font-semibold text-gray-900">Organisation Background</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">Founded to address the needs of vulnerable children and families, SaCHSWAL works at the intersection of health, education and community capacity building. Our programmes focus on practical, evidence-informed interventions delivered in partnership with local communities.</p>
                <p className="mt-4 text-gray-700 leading-relaxed">We prioritise respectful engagement, local leadership, and measurable outcomes—ensuring that every programme responds to community priorities and builds lasting capacity.</p>
              </div>

              <div className="mt-8 md:mt-0">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border-l-4 border-orange-400 bg-white shadow-sm">
                    <div className="font-semibold text-gray-900">Locally led partnerships</div>
                    <div className="text-sm text-gray-700">We work with community leaders and organisations to co-design programs.</div>
                  </div>

                  <div className="p-4 border-l-4 border-orange-400 bg-white shadow-sm">
                    <div className="font-semibold text-gray-900">Training & capacity building</div>
                    <div className="text-sm text-gray-700">Targeted training for teachers, caregivers and social workers.</div>
                  </div>

                  <div className="p-4 border-l-4 border-orange-400 bg-white shadow-sm">
                    <div className="font-semibold text-gray-900">Child-centred programming</div>
                    <div className="text-sm text-gray-700">Services designed around children&#39;s rights and wellbeing.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Mission & Vision (two-column on md+) */}
      <Reveal>
        <section aria-labelledby="mission-heading" className="w-full py-16 bg-neutral-50 border-t border-gray-200">
          <div className="max-w-300 mx-auto px-4">
            <div className="w-16 h-1 bg-orange-400 mb-6" />
            <div className="md:grid md:grid-cols-2 md:gap-20 md:items-start">
              <div>
                <h2 id="mission-heading" className="text-[32px] font-semibold text-gray-900 flex items-center gap-3">
                  <span className="w-1 h-6 bg-orange-400 inline-block" />
                  Mission
                </h2>
                <p className="mt-4 text-gray-700 leading-relaxed max-w-180">To strengthen community systems in Lesotho so that children thrive in safe, healthy, and supportive environments. We do this through training, family-centred services, and long-term community partnerships.</p>

                <ul className="mt-6 list-disc pl-5 text-gray-700">
                  <li className="mb-4">Child-focused health and nutrition programmes</li>
                  <li className="mb-4">Caregiver training and family support</li>
                  <li className="mb-4">Community capacity building and leadership development</li>
                </ul>
              </div>

              <div className="mt-8 md:mt-0">
                <h3 id="vision-heading" className="text-[32px] font-semibold text-gray-900 flex items-center gap-3">
                  <span className="w-1 h-6 bg-orange-400 inline-block" />
                  Vision
                </h3>
                <p className="mt-4 text-gray-700 leading-relaxed max-w-140">A Lesotho where every child grows up in a safe and nurturing environment supported by communities that value their rights, health and education. We work towards long-term, sustainable change by strengthening families and local systems.</p>
                <ul className="mt-4 list-disc pl-5 text-gray-700 max-w-140">
                  <li className="mb-2">Communities are empowered with skills and resources to protect and nurture children.</li>
                  <li className="mb-2">Locally led, sustainable services provide reliable care and support for every family in need.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Membership & Training Areas */}
      <section aria-labelledby="membership-heading" className="w-full py-16 border-t border-gray-200">
        <div className="max-w-300 mx-auto px-4">
          <div className="w-16 h-1 bg-orange-400 mb-4" />
          <h2 id="membership-heading" className="text-[32px] font-semibold text-gray-900">Membership & Training Areas</h2>

          <p className="mt-4 text-gray-700 max-w-180">Our members include local community leaders, health workers, caregivers, and partner organisations. We provide training and resources across a range of areas designed to improve child and family outcomes.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { title: 'Community Leaders', body: 'Local leaders who help coordinate and sustain programmes.' },
              { title: 'Health Workers', body: 'Frontline workers trained in child health and referral pathways.' },
              { title: 'Caregivers', body: 'Parents and carers receiving training and support to nurture children.' },
              { title: 'Schools', body: 'Teachers and school staff collaborating on child protection and wellbeing.' },
              { title: 'Partner NGOs', body: 'Local and international partners providing complementary services.' },
              { title: 'Volunteers', body: 'Community volunteers supporting programme delivery and monitoring.' },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <div className="p-6 bg-white border-l-4 border-orange-400 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{m.title}</h3>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
