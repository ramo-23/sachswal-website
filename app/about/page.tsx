"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "../../src/components/Reveal/Reveal";

export default function AboutPage() {
  return (
    <>
      <Reveal>
        <section aria-labelledby="about-hero-heading" className="w-full py-16 bg-neutral-50">
          <div className="max-w-300 mx-auto px-4">
            <h1 id="about-hero-heading" className="text-[28px] md:text-[36px] font-semibold leading-tight text-gray-900">
              About SaCHSWAL
            </h1>
            <p className="mt-6 max-w-3xl text-gray-700 text-lg leading-relaxed">
              SaCHSWAL works with communities across Lesotho to improve child health, strengthen families, and
              support sustainable community-led services. We partner with local leaders and caregivers to deliver
              training, advocacy, and practical support that creates measurable improvements for children and
              families.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Organisation Background */}
      <Reveal>
        <section aria-labelledby="background-heading" className="w-full py-16 border-t border-gray-200">
          <div className="max-w-300 mx-auto px-4">
            <div>
              <div className="w-16 h-1 bg-gray-300 mb-4" />
              <h2 id="background-heading" className="text-[32px] font-semibold text-gray-900">
                Organisation Background
              </h2>
              <p className="mt-4 text-gray-700 prose">
                Founded to address the needs of vulnerable children and families, SaCHSWAL works at the
                intersection of health, education and community capacity building. Our programmes focus on
                practical, evidence-informed interventions delivered in partnership with local communities.
              </p>
              <p className="mt-4 text-gray-700 prose">
                We prioritise respectful engagement, local leadership, and measurable outcomes—ensuring that
                every programme responds to community priorities and builds lasting capacity.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Mission & Vision (two-column on md+) */}
      <Reveal>
        <section aria-labelledby="mission-heading" className="w-full py-16 bg-neutral-50 border-t border-gray-200">
          <div className="max-w-300 mx-auto px-4">
            <div className="w-16 h-1 bg-gray-300 mb-4" />
            <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
              <div>
                <h2 id="mission-heading" className="text-[32px] font-semibold text-gray-900">
                  Mission
                </h2>
                <p className="mt-4 text-gray-700 prose max-w-[720px]">
                  To strengthen community systems in Lesotho so that children thrive in safe, healthy, and
                  supportive environments. We do this through training, family-centred services, and long-term
                  community partnerships.
                </p>

                <ul className="mt-6 list-disc pl-5 text-gray-700">
                  <li className="mb-4">Child-focused health and nutrition programmes</li>
                  <li className="mb-4">Caregiver training and family support</li>
                  <li className="mb-4">Community capacity building and leadership development</li>
                </ul>
              </div>

              <div className="mt-8 md:mt-0">
                <h3 id="vision-heading" className="text-[28px] font-semibold text-gray-900">
                  Vision
                </h3>
                <p className="mt-4 text-gray-700 prose max-w-[560px]">
                  A Lesotho where every child grows up in a safe and nurturing environment supported by
                  communities that value their rights, health and education. We work towards long-term,
                  sustainable change by strengthening families and local systems.
                </p>
                <ul className="mt-4 list-disc pl-5 text-gray-700 max-w-[560px]">
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
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="w-16 h-1 bg-gray-300 mb-4" />
          <h2 id="membership-heading" className="text-[32px] font-semibold text-gray-900">
            Membership & Training Areas
          </h2>

          <p className="mt-4 text-gray-700 prose max-w-[720px]">
            Our members include local community leaders, health workers, caregivers, and partner organisations.
            We provide training and resources across a range of areas designed to improve child and family outcomes.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: 'Community Leaders', body: 'Local leaders who help coordinate and sustain programmes.' },
              { title: 'Health Workers', body: 'Frontline workers trained in child health and referral pathways.' },
              { title: 'Caregivers', body: 'Parents and carers receiving training and support to nurture children.' },
              { title: 'Schools', body: 'Teachers and school staff collaborating on child protection and wellbeing.' },
              { title: 'Partner NGOs', body: 'Local and international partners providing complementary services.' },
              { title: 'Volunteers', body: 'Community volunteers supporting programme delivery and monitoring.' },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-10 bg-sky-600 rounded-sm" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{m.title}</h3>
                    <p className="mt-2 text-gray-700 text-sm">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
