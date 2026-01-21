"use client";

import Link from "next/link";
import Reveal from "../../src/components/Reveal/Reveal";
import { MdPsychology, MdChildCare, MdPeople, MdHome, MdPublic, MdSchool, MdAssessment, MdHelpOutline } from 'react-icons/md';

function getIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('counsel') || t.includes('counselling') || t.includes('counseling') || t.includes('psych')) return <MdPsychology size={28} className="text-amber-600" />;
  if (t.includes('play') || t.includes('therapy') || t.includes('child')) return <MdChildCare size={28} className="text-amber-600" />;
  if (t.includes('community') || t.includes('mobil')) return <MdPublic size={28} className="text-amber-600" />;
  if (t.includes('caregiver') || t.includes('group') || t.includes('family')) return <MdPeople size={28} className="text-amber-600" />;
  if (t.includes('school') || t.includes('training')) return <MdSchool size={28} className="text-amber-600" />;
  if (t.includes('monitor') || t.includes('evaluation') || t.includes('evaluate')) return <MdAssessment size={28} className="text-amber-600" />;
  return <MdHelpOutline size={28} className="text-amber-600" />;
}

export default function ProjectsPage() {
  const groups = [
    {
      heading: "Counselling & Therapy",
      items: [
        {
          title: "Individual & Group Counselling",
          body: "Short-term and ongoing counselling for children, adolescents and caregivers to address emotional and behavioural needs.",
        },
        {
          title: "Play Therapy",
          body: "Structured therapeutic play to support children's emotional processing and resilience.",
        },
      ],
    },
    {
      heading: "Psycho-social Support",
      items: [
        {
          title: "Community Psychosocial Support",
          body: "Community-level activities that build coping skills and social connections for vulnerable families.",
        },
        {
          title: "Caregiver Support Groups",
          body: "Peer-led groups providing practical advice, emotional support and referral pathways.",
        },
      ],
    },
    {
      heading: "Family & Community Programs",
      items: [
        { title: "Family Strengthening", body: "Home visiting, parenting support and family workshops to improve care environments." },
        { title: "Community Mobilisation", body: "Working with leaders and volunteers to create locally-led child protection systems." },
        { title: "School-based Support", body: "Integrated social work services and child protection in schools." },
      ],
    },
    {
      heading: "Training & Capacity Building",
      items: [
        { title: "Social Work Training", body: "Professional development for frontline social workers and caregivers." },
        { title: "Monitoring & Evaluation", body: "Training local partners to measure outcomes and strengthen programs." },
      ],
    },
  ];

  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <Reveal>
        <section className="w-full py-16 bg-neutral-50 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4">
            <h1 className="text-[28px] md:text-[36px] font-semibold text-gray-900">Programs & Services</h1>
            <p className="mt-4 max-w-[720px] text-gray-700 leading-relaxed">
              SaCHSWAL provides a range of child-centred programmes across Lesotho focused on protection,
              family strengthening, psychological wellbeing and capacity building. Below are our main programme
              areas with the services we offer.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Groups */}
      <div className="w-full">
        {groups.map((g, gi) => (
          <Reveal key={g.heading} delay={gi * 60}>
            <section aria-labelledby={`group-${gi}-heading`} className="w-full py-16 border-b border-gray-100">
              <div className="max-w-[1200px] mx-auto px-4">
                <div className="w-16 h-1 bg-gray-300 mb-4" />
                <h2 id={`group-${gi}-heading`} className="text-[28px] md:text-[32px] font-semibold text-gray-900">{g.heading}</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {g.items.map((it, i) => (
                    <Reveal key={it.title} delay={i * 80}>
                      <article className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-16 w-16 bg-neutral-100 rounded-md flex items-center justify-center mb-4 text-indigo-600">
                          {/* icon per service */}
                          {getIcon(it.title)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
                        <p className="mt-2 text-gray-700 text-sm leading-relaxed">{it.body}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal>
        <section className="w-full py-16 bg-neutral-50">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <div className="w-16 h-1 bg-gray-300 mb-4 mx-auto" />
            <h2 className="text-[28px] md:text-[32px] font-semibold text-gray-900">Interested in our work?</h2>
            <p className="mt-4 max-w-[720px] mx-auto text-gray-700">Get in touch to discuss partnerships, referrals or how to access our services.</p>
            <div className="mt-6">
              <Link href="/contact" className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

