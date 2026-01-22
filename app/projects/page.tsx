"use client";

import Link from "next/link";
import Reveal from "../../src/components/Reveal/Reveal";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MdPsychology, MdChildCare, MdPeople, MdPublic, MdSchool, MdAssessment, MdHelpOutline } from 'react-icons/md';

function getIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('counsel') || t.includes('counselling') || t.includes('counseling') || t.includes('psych')) return <MdPsychology size={28} className="text-amber-600" />;
  if (t.includes('play') || t.includes('therapy') || t.includes('child')) return <MdChildCare size={28} className="text-amber-600" />;
  if (t.includes('community') || t.includes('mobil')) return <MdPublic size={28} className="text-sky-600" />;
  if (t.includes('caregiver') || t.includes('group') || t.includes('family')) return <MdPeople size={28} className="text-emerald-600" />;
  if (t.includes('school') || t.includes('training')) return <MdSchool size={28} className="text-indigo-600" />;
  if (t.includes('monitor') || t.includes('evaluation') || t.includes('evaluate')) return <MdAssessment size={28} className="text-rose-600" />;
  return <MdHelpOutline size={28} className="text-amber-600" />;
}

function getSvgIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('psychosocial')) return '/icons/community_psychosocial_support.svg';
  if (t.includes('mobilisation')) return '/icons/community_mobilisation.svg';
  if (t.includes('training')) return '/icons/social_work_training.svg';
  if (t.includes('counsel') || t.includes('psych')) return '/icons/Individual_group_counselling.svg';
  if (t.includes('play')) return '/icons/playground.svg';
  if (t.includes('caregiver') || t.includes('hug') ) return '/icons/hug.svg';
  if (t.includes('community') || t.includes('mobil')) return '/icons/community.svg';
  if (t.includes('school') || t.includes('child')) return '/icons/children.svg';
  if (t.includes('home') || t.includes('family')) return '/icons/home.svg';
  if( t.includes('monitor') || t.includes('evaluation') || t.includes('evaluate')) return '/icons/monitoring_and_evaluation.svg';
  return '';
}

type ServiceItem = {
  title: string;
  body?: string;
  access?: string;
  delivery?: string;
  cost?: string;
  coverage?: string;
  description?: string;
};

function firstSentence(text: string) {
  if (!text) return '';
  const parts = text.trim().split(/(?<=[.!?])\s+/);
  return parts[0].endsWith('.') || parts[0].endsWith('!') || parts[0].endsWith('?') ? parts[0] : parts[0] + '.';
}

function ServiceRow({ it, idx, delay }: { it: ServiceItem; idx: number; delay?: number }) {
  const svg = getSvgIcon(it.title);
  const sentence = firstSentence(it.body || it.description || '');

  return (
    <Reveal delay={(delay || 0) + idx * 60}>
      <div className="group flex items-start gap-4 md:gap-6">
        <div className="shrink-0 mt-1 h-12 w-12 flex items-center justify-center overflow-hidden">
          {svg ? (
            <Image src={svg} alt={`${it.title} icon`} width={48} height={48} className="object-contain transition-transform duration-200 group-hover:scale-105" />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center bg-[#FFF3EB]">
              {getIcon(it.title)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">{it.title}</h3>
          <p className="mt-1 text-gray-700">{sentence}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function ProjectsPage() {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setParallaxY(window.scrollY * 0.2);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const groups: { heading: string; items: ServiceItem[] }[] = [
    {
      heading: "Counselling & Therapy",
      items: [
        {
          title: "Individual & Group Counselling",
          body: "Short-term and ongoing counselling to address emotional and behavioural needs.",
          access: "Children (6-17), adolescents and caregivers; referrals and self-referral accepted",
          delivery: "One-on-one sessions, small group therapy, and telephone follow-ups; delivered at community centres and partner clinics",
          cost: "Free for eligible clients (programme-funded); some specialist referrals may incur fees",
          coverage: "Primarily Mafeteng district with targeted outreach across neighbouring districts",
        },
        {
          title: "Play Therapy",
          body: "Structured therapeutic play to support children's emotional processing and resilience.",
          access: "Children aged 3-10 referred by caregivers or teachers",
          delivery: "Individual play sessions and group play workshops at child-friendly spaces",
          cost: "Free",
          coverage: "Mafeteng and local outreach locations",
        },
      ],
    },
    {
      heading: "Psychosocial Support",
      items: [
        {
          title: "Community Psychosocial Support",
          body: "Community-level activities that build coping skills and social connections for vulnerable families.",
          access: "Open to community members, with a focus on vulnerable families and youth",
          delivery: "Group workshops, community events, and volunteers-led peer activities",
          cost: "Free",
          coverage: "Community-based across Mafeteng district; scalable to other districts by request",
        },
        {
          title: "Caregiver Support Groups",
          body: "Peer-led groups providing practical advice, emotional support and referral pathways.",
          access: "Parents and caregivers of children up to 18 years",
          delivery: "Regular peer-group meetings and facilitated workshops; virtual check-ins when needed",
          cost: "Free",
          coverage: "Local community hubs in Mafeteng; occasional regional workshops",
        },
      ],
    },
    {
      heading: "Family & Community Programs",
      items: [
        {
          title: "Family Strengthening",
          body: "Home visiting, parenting support and family workshops to improve care environments.",
          access: "Families with children under 18; referral-based prioritisation for highest need",
          delivery: "Home visits, targeted parenting workshops, and group follow-ups",
          cost: "Free",
          coverage: "Mafeteng district with targeted outreach to surrounding communities",
        },
        {
          title: "Community Mobilisation",
          body: "Working with leaders and volunteers to create locally-led child protection systems.",
          access: "Community leaders, volunteers, and civic groups",
          delivery: "Workshops, training sessions, and community action planning",
          cost: "Usually free for community partners",
          coverage: "District-level partnerships across Lesotho as projects scale",
        },
        {
          title: "School-based Support",
          body: "Integrated social work services and child protection in schools.",
          access: "School-aged children and school staff",
          delivery: "In-school counselling, teacher training, and referral pathways",
          cost: "Free for partner schools; programme-dependent",
          coverage: "Partner schools in Mafeteng and nearby districts",
        },
      ],
    },
    {
      heading: "Training & Capacity Building",
      items: [
        {
          title: "Social Work Training",
          body: "Professional development for frontline social workers and caregivers.",
          access: "Frontline workers, caregivers, and partner staff",
          delivery: "Workshops, blended learning and in-person mentorship",
          cost: "Often fee-waived for partner organisations; some courses may have a fee",
          coverage: "Regional workshops with follow-up mentoring",
        },
        {
          title: "Monitoring & Evaluation",
          body: "Training local partners to measure outcomes and strengthen programs.",
          access: "Local partners and programme staff",
          delivery: "Practical training, tools, and on-site coaching",
          cost: "Typically fee-waived as part of project support",
          coverage: "Nationally when integrated into funded projects",
        },
      ],
    },
    {
      heading: "Research & Consultancy",
      items: [
        {
          title: "Research as a Service",
          body: "On-demand research, monitoring, evaluation and consultancy support for programme design, evidence generation and policy engagement. We partner with governments and agencies to produce timely, practical evidence that informs social protection and child protection programming.",
        },
      ],
    },
  ];

  return (
    <main className="w-full bg-white">
      {/* Hero (parallax + blur) */}
      <Reveal>
        <section className="w-full relative" aria-hidden="false">
          <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <Image
              src="/images/hero_image.jpg"
              alt="Programs background"
              fill
              className="object-cover"
              sizes="100vw"
              style={{ transform: `translate3d(0, ${parallaxY}px, 0)`, filter: 'blur(2px)' }}
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="max-w-300 mx-auto text-center">
                <div className="inline-block bg-black/50 p-6 md:p-8 text-white w-full md:max-w-2xl">
                  <h1 className="text-[28px] md:text-[44px] font-extrabold">Programs & Services</h1>
                  <p className="mt-4 max-w-180 mx-auto text-gray-100 text-lg leading-relaxed">SaCHSWAL provides a range of child-centred programmes across Lesotho focused on protection, family strengthening, psychosocial wellbeing and capacity building.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Groups */}
      <div className="w-full">
        {groups.map((g, gi) => (
          <Reveal key={g.heading} delay={gi * 60}>
            <section aria-labelledby={`group-${gi}-heading`} className="w-full py-16 border-b border-gray-100">
              <div className="max-w-300 mx-auto px-4">
                <h2 id={`group-${gi}-heading`} className="text-[30px] md:text-[36px] font-semibold text-gray-900">{g.heading}</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {g.items.map((it, i) => (
                    <article key={it.title} className="bg-white border border-gray-200 p-6 shadow-sm transition-transform transform hover:-translate-y-1 hover:shadow-md">
                      <ServiceRow it={it} idx={i} delay={gi * 60} />
                    </article>
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
          <div className="max-w-300 mx-auto px-4 text-center">
            
            <h2 className="text-[28px] md:text-[32px] font-semibold text-gray-900">Interested in our work?</h2>
            <p className="mt-4 max-w-180 mx-auto text-gray-700">Get in touch to discuss partnerships, referrals or how to access our services.</p>
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

