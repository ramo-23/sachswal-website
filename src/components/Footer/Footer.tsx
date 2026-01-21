"use client";

import type { ReactNode } from "react";
import Reveal from "../Reveal/Reveal";

export default function Footer({ children }: { children?: ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <Reveal>
      <footer className="bg-white border-t border-gray-200 text-gray-700 py-8">
        <div className="max-w-350 mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">

            {/* Left: Organisation name + registration */}
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900">SaCHSWAL</h3>
              <div className="text-sm text-gray-600">REG: 2023/198</div>
            </div>

            {/* Center: Contact info with header */}
            <div className="text-sm text-gray-600">
              <div className="mb-2 text-sm font-semibold text-gray-900">Contact</div>
              <div className="text-gray-700">Phone: 69031338</div>
              <div className="mt-1">
                Email: <a href="mailto:sachswal@gmail.com" className="underline text-gray-700 hover:text-gray-900">sachswal@gmail.com</a>
              </div>
              <div className="mt-1 text-gray-700">Location: Mafeteng, Lesotho</div>
            </div>

            {/* Right: Social icons with header */}
            <div className="flex md:justify-end md:items-start">
              <div>
                <div className="mb-2 text-sm font-semibold text-gray-900">Find us at</div>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/schools-and-children-s-homes-agency-of-lesotho-sachswal-247bb6276?originalSubdomain=ls"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SaCHSWAL on LinkedIn"
                    className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full text-gray-600 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200 shadow-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.795-1.75-1.732 0-.938.784-1.732 1.75-1.732s1.75.794 1.75 1.732c0 .937-.784 1.732-1.75 1.732zm13.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.767 1.197-1.767 2.437v4.68h-3v-9h2.881v1.233h.041c.401-.759 1.379-1.561 2.837-1.561 3.034 0 3.596 1.996 3.596 4.59v5.738z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/people/School-and-Childrens-Homes-Agency-of-Social-workers-Lesotho-Sachswal/100092442713744/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SaCHSWAL on Facebook"
                    className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full text-gray-600 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200 shadow-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .73.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.766v2.309h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.324-.594 1.324-1.324v-21.35c0-.732-.594-1.325-1.325-1.325z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Divider above copyright */}
        <div className="max-w-350 mx-auto px-8">
          <div className="border-t border-gray-200 mt-6"></div>
        </div>

        {/* Bottom full-width copyright row */}
        <div className="mt-4 text-center text-sm text-gray-600">© {year} SaCHSWAL. All rights reserved.</div>

        {children}
      </footer>
    </Reveal>
  );
}
