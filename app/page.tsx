import Link from "next/link";
import Image from "next/image";
import Reveal from "../src/components/Reveal/Reveal";

export default function Home() {
  // Static home content — server-side markdown import removed



  const services = [
    { title: "Child Protection", body: "Professional social work interventions to protect vulnerable children." },
    { title: "School Social Work", body: "Support within schools to address social and welfare needs." },
    { title: "Residential Care Support", body: "Guidance and casework for children's homes and carers." },
    { title: "Capacity Building", body: "Training and development for social workers and caregivers." },
  ];

  return (
    <main>
      <section aria-labelledby="hero-heading" className="hero bg-white border-b border-gray-200">
        <div className="relative w-full h-105 md:h-140">

          {/* Mobile: stacked text above image */}
          <div className="max-w-350 mx-auto px-8 md:hidden py-8 text-center relative z-20">
            <h1 id="hero-heading" className="text-2xl font-bold">Building children’s future together</h1>
            <p className="mt-3 text-sm text-gray-700">SaCHSWAL is a legally registered social work organisation supporting children in schools and children’s homes across Lesotho through professional social work services.</p>
            <div className="mt-6">
              <Link href="/projects" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-md shadow-sm transition-colors">Learn More</Link>
            </div>
          </div>

          {/* Background image (object positioned slightly lower) */}
          <Image
            src="/images/hero_image.jpg"
            alt="SaCHSWAL work with children"
            fill
            className="object-cover z-0"
            sizes="100vw"
            style={{ objectPosition: 'center 35%' }}
          />

          {/* Desktop overlay panel (pinned to left edge; card lowered within hero) */}
          <div className="hidden md:flex absolute inset-0 items-start pt-20">
            <div className="w-full px-0 flex justify-start">
              <div className="max-w-md bg-white/85 backdrop-blur-sm p-8 shadow-md relative z-30">
                <h1 id="hero-heading" className="text-4xl font-extrabold text-orange-600">Building children’s future together</h1>
                <p className="mt-4 text-gray-700">SaCHSWAL is a legally registered social work organisation supporting children in schools and children’s homes across Lesotho through professional social work services.</p>
                <div className="mt-6">
                  <Link href="/projects" className="inline-block bg-linear-to-b from-orange-500 to-orange-600 text-white font-medium px-6 py-3 rounded-md shadow-sm hover:from-orange-600 hover:to-orange-700 transition-colors">Learn More</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      

      {/* What We Do (Enhanced Design) */}
      <Reveal>
        <section className="what-we-do py-16 bg-neutral-50">
          <div className="max-w-300 mx-auto px-4 text-center">

            <h2 id="what-heading" className="text-3xl md:text-4xl font-bold">What We Do</h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">

              <Reveal className="">
                <div className="service-card p-6 bg-neutral-50 rounded-lg shadow-sm flex flex-col items-center hover:shadow-md transition-transform transform hover:-translate-y-1">
                  <Image src="/icons/communication.svg" alt="Counselling Icon" width={64} height={64} className="mb-4" style={{ width: '64px', height: 'auto' }} />
                  <h3 className="font-bold text-lg mb-2">Individual & Group Counselling</h3>
                  <p className="text-center text-sm text-gray-700">Professional support for children and adolescents to address social, emotional, and behavioural needs.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="service-card p-6 bg-neutral-50 rounded-lg shadow-sm flex flex-col items-center hover:shadow-md transition-transform transform hover:-translate-y-1">
                  <Image src="/icons/hug.svg" alt="Psycho-Social Icon" width={64} height={64} className="mb-4" style={{ width: '64px', height: 'auto' }} />
                  <h3 className="font-bold text-lg mb-2">Psycho-Social Support</h3>
                  <p className="text-center text-sm text-gray-700">Helping children cope with trauma, grief, and everyday challenges.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="service-card p-6 bg-neutral-50 rounded-lg shadow-sm flex flex-col items-center hover:shadow-md transition-transform transform hover:-translate-y-1">
                  <Image src="/icons/playground.svg" alt="Play Therapy Icon" width={64} height={64} className="mb-4" style={{ width: '64px', height: 'auto' }} />
                  <h3 className="font-bold text-lg mb-2">Play Therapy</h3>
                  <p className="text-center text-sm text-gray-700">Using structured play to improve children’s emotional and social development.</p>
                </div>
              </Reveal>

            </div>
          </div>
        </section>
      </Reveal>
      {/* Who We Serve (Enhanced Design) */}
      <Reveal>
        <section className="who-we-serve py-16 bg-white border-t border-gray-200">
          <div className="max-w-350 mx-auto px-8 text-center">

            <h2 id="who-serve-heading" className="text-3xl md:text-4xl font-bold">Who We Serve</h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">

              <Reveal>
                <div className="beneficiary-card p-6 bg-white rounded-lg shadow-sm flex flex-col items-center hover:shadow-md transition-transform transform hover:-translate-y-1">
                  <Image src="/icons/children.svg" alt="Children Icon" width={64} height={64} className="mb-4" style={{ width: '64px', height: 'auto' }} />
                  <h3 className="font-bold text-lg mb-2">School Children</h3>
                  <p className="text-center text-sm text-gray-700">Providing support, protection, and counselling for children attending schools across Lesotho.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="beneficiary-card p-6 bg-white rounded-lg shadow-sm flex flex-col items-center hover:shadow-md transition-transform transform hover:-translate-y-1">
                  <Image src="/icons/home.svg" alt="Children’s Homes Icon" width={64} height={64} className="mb-4" style={{ width: '64px', height: 'auto' }} />
                  <h3 className="font-bold text-lg mb-2">Children’s Homes</h3>
                  <p className="text-center text-sm text-gray-700">Ensuring children living in care homes receive social work support and protection services.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="beneficiary-card p-6 bg-white rounded-lg shadow-sm flex flex-col items-center hover:shadow-md transition-transform transform hover:-translate-y-1">
                  <Image src="/icons/community.svg" alt="Community Icon" width={64} height={64} className="mb-4" style={{ width: '64px', height: 'auto' }} />
                  <h3 className="font-bold text-lg mb-2">Communities</h3>
                  <p className="text-center text-sm text-gray-700">Supporting families and communities to strengthen child protection and social development programs.</p>
                </div>
              </Reveal>

            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA (Neutral, Typography-Driven) */}
      <section aria-labelledby="home-cta-heading" className="home-cta py-16 bg-neutral-50 border-t border-gray-200">
        <div className="max-w-350 mx-auto px-8 text-center flex flex-col items-center gap-6">

          <div className="w-16 h-1 bg-gray-300 mx-auto mb-4 rounded"></div>

          <h2 id="home-cta-heading" className="text-3xl md:text-4xl font-bold">Learn More About Our Work</h2>

          <p className="subheading max-w-xl text-gray-700 leading-relaxed">Explore our Programs & Services and see how SaCHSWAL is building children’s futures together across Lesotho.</p>

          <div>
            <Link href="/projects" className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-colors">
              View Programs & Services
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
