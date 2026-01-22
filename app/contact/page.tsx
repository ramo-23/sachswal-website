import ContactForm from "../../src/components/ContactForm/ContactForm";
import PageContainer from "../../src/components/PageContainer/PageContainer";
import Reveal from "../../src/components/Reveal/Reveal";
import { MdPerson, MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';

export default function ContactPage() {
  return (
    <main className="bg-white">
        <section className="w-full py-16 bg-neutral-50">
          <PageContainer>
            <div className="text-center">
              <Reveal delay={0}>
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Contact Information</h1>
              </Reveal>

              <Reveal delay={100}>
                <p className="mt-4 max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
                  Reach out to us through any of the following channels. We aim to respond to all enquiries within 48 hours.
                </p>
              </Reveal>
            </div>
          </PageContainer>
        </section>

        <PageContainer>
        <section className="py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
            <Reveal delay={200}>
              <div>

                <div className="mt-6">
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-50 text-orange-600">
                        <MdPerson className="h-5 w-5" />
                      </div>
                      <div>
                          <div className="text-sm font-medium">Contact Person</div>
                          <div className="text-gray-700">Tsepang Manyeli (Ms)</div>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-50 text-orange-600">
                        <MdPhone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Phone</div>
                        <div className="text-gray-700">+266 6903 1338</div>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-50 text-orange-600">
                        <MdEmail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <div className="text-gray-700"><a className="text-sky-600" href="mailto:sachswal@gmail.com">sachswal@gmail.com</a></div>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-50 text-orange-600">
                        <MdLocationOn className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Location</div>
                        <div className="text-gray-700">
                          <div>SaCHSWAL Office — Mafeteng Community Centre</div>
                          <div>Mapholaneng, Mafeteng District, Lesotho</div>
                          <div>P.O. Box 45, Mafeteng 900</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 rounded-md bg-neutral-100 p-4 shadow-sm border border-gray-100">
                  <h4 className="text-sm font-semibold">Office Hours</h4>
                  <div className="mt-2 text-sm text-gray-600">
                    <div>Monday - Friday: 8:00 AM - 5:00 PM</div>
                    <div>Saturday: 9:00 AM - 1:00 PM</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Send us a message</h2>
                <p className="mt-3 text-gray-600">Fill out the form below and we will get back to you as soon as possible.</p>

                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
