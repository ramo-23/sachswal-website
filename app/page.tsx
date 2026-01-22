import Link from "next/link";
import Image from "next/image";
import Reveal from "../src/components/Reveal/Reveal";

export default function Home() {

  return (
    <main>
      <section aria-labelledby="hero-heading" className="w-full relative">
        <div className="relative w-full h-80 md:h-96 overflow-hidden">
          {/* parallax image */}
          <Image
            src="/images/hero_image.jpg"
            alt="SaCHSWAL work with children"
            fill
            className="object-cover"
            sizes="100vw"
            style={{ objectPosition: 'center 35%' }}
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-300 mx-auto px-4 text-center text-white">
              <h1 id="hero-heading" className="text-[28px] md:text-[44px] font-extrabold drop-shadow-lg">Building children’s future together</h1>
              <p className="mt-4 max-w-180 mx-auto text-gray-100 text-lg">SaCHSWAL is a legally registered social work organisation supporting children in schools and children’s homes across Lesotho through professional social work services.</p>
              <div className="mt-6">
                <Link href="/projects" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md shadow-sm transition-colors">Learn More</Link>
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
