import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export function BuilderComparison() {
  return (
    <section className="content-section muted-section" id="comparison">
      <div className="container">
        <SectionHeader
          kicker="Why Choose Us"
          title="See why our Real-time Builder stands out."
          copy="Stop fighting with clunky forms and delayed previews. Build your resume with confidence in a truly modern workspace."
        />
        
        <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Generic Builders */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  <X size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-700">Generic Builders</h3>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Blind forms without real-time previews",
                  "Paywalls hidden at the final export step",
                  "Clunky interfaces that slow you down",
                  "Poor ATS compatibility and messy formatting",
                  "Requires sign-up before even trying"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-red-100 p-1 text-red-600">
                      <X size={12} />
                    </span>
                    <span className="text-gray-600 leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* ATS Resume Builder */}
            <div className="p-8 bg-white relative">
              <div className="absolute top-0 right-0 p-8 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
              </div>
              <div className="flex items-center gap-3 mb-6 relative">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
                  <Check size={20} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">ATS Resume Builder</h3>
              </div>
              
              <ul className="space-y-4 relative">
                {[
                  "WYSIWYG Real-time A4 document preview",
                  "100% Free PDF export without watermarks",
                  "Lightning fast section-wise editing",
                  "Strict ATS-friendly semantic structuring",
                  "No sign-up required, start instantly"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-blue-100 p-1 text-blue-600">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-gray-800 font-medium leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
