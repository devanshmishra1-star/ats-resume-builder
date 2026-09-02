"use client";
import Link from "next/link";
import Image from "next/image";
import { Download, FileText, CheckCircle, Smartphone, History } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const stepsData = [
  { tab: "Personal", title: "Select Template", fields: [{ l: "Full Name", v: "" }, { l: "Email Address", v: "" }, { l: "Phone", v: "" }] },
  { tab: "Personal", title: "Personal Details", fields: [{ l: "Full Name", v: "First Last" }, { l: "Email Address", v: "sXXXXXXXXX@gmail.com" }, { l: "Phone", v: "+91 1234567890" }] },
  { tab: "Education", title: "Education", fields: [{ l: "Institution", v: "LPU" }, { l: "Degree", v: "B.Tech Computer Science" }, { l: "Year", v: "2020 - 2024" }] },
  { tab: "Skills", title: "Skills", fields: [{ l: "Languages", v: "C++, Java, JavaScript" }, { l: "Frameworks", v: "Angular, React JS, Node JS" }] },
  { tab: "Experience", title: "Experience", fields: [{ l: "Company", v: "JP Morgan Chase & Co." }, { l: "Role", v: "SEPI Intern" }, { l: "Duration", v: "May 2023 - Jul 2023" }] },
  { tab: "Projects", title: "Projects", fields: [{ l: "Project Name", v: "Fkart App" }, { l: "Tech Stack", v: "MERN Stack" }, { l: "Description", v: "E-commerce platform with dynamic data..." }] },
  { tab: "Projects", title: "Ready to Download!", fields: [{ l: "Status", v: "Resume Complete ✅" }] },
];

const tabs = ["Personal", "Education", "Skills", "Experience", "Projects"];

export function Hero() {
  const [step, setStep] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const bgImages = [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', // Clean top-down desk with laptop and notebook (No hands, perfect for working/resume)
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', // Ultra-bright modern white office
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop'  // Super clean white desk space
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const next = prev === 6 ? 0 : prev + 1;
        if (next !== 0) {
          setShowBadge(true);
          setTimeout(() => setShowBadge(false), 350);
        }
        return next;
      });
    }, 800); // 0.8 seconds per step
    
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearInterval(bgTimer);
    };
  }, [bgImages.length]);

  const activeData = stepsData[step];

  return (
    <section className="hero-section" id="home">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle overlay so text remains readable but image is clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-[#f8f6f2] z-10" />
        {bgImages.map((src, index) => (
          <motion.div
            key={src}
            initial={false}
            animate={{ 
              opacity: bgIndex === index ? 1 : 0,
              scale: bgIndex === index ? 1 : 1.05
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ pointerEvents: 'none' }}
          >
            <Image
              src={src}
              alt="Hero Background"
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center pt-8 pb-12">
        <MotionReveal className="hero-copy-block flex flex-col items-center">
          <p className="section-kicker">Real-time ATS Resume Builder</p>
          <h1>Create an ATS-friendly resume that updates as you type.</h1>
          <p className="mx-auto">
            Stop fighting with clunky templates. Build a polished A4 CV in our premium live builder.
            Fill your details, watch the real-time preview, and export a flawless PDF instantly.
          </p>
          <div className="hero-actions justify-center flex-wrap">
            <Link className="button-primary" href="#templates">
              <FileText size={17} aria-hidden="true" />
              Start Live Builder
            </Link>
            <Link className="button-secondary font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0" href="/portfolio-builder">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              AI Portfolio Generator
            </Link>
            <Link className="button-secondary" href="#my-resumes">
              <History size={17} aria-hidden="true" />
              My Resumes
            </Link>
            <Link className="button-secondary" href="https://play.google.com/store/apps/details?id=com.dmappstudios.resumebuilder" target="_blank" rel="noopener noreferrer">
              <Smartphone size={17} aria-hidden="true" />
              Download App
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08} className="hero-product !bg-transparent !p-0 !border-0 !shadow-none mt-16 mb-10 !w-full !max-w-[950px] !mx-auto !justify-self-center">
          <div className="relative w-full h-[650px] rounded-2xl overflow-hidden border border-white/40 bg-[#f8f9fa] flex shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-gray-900/5">
            
            {/* Ultra Premium Left Panel (Builder Form) */}
            <div className="w-[420px] shrink-0 border-r border-gray-200/60 bg-white/80 backdrop-blur-xl p-6 hidden lg:flex flex-col relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
              
              {/* Premium Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map(t => (
                   <span key={t} className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 cursor-default ${activeData.tab === t ? 'bg-gray-900 text-white shadow-md' : 'border border-gray-200/80 bg-white text-gray-500'}`}>
                      {t}
                   </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4 min-h-[20px]">
                 <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-800">{activeData.title}</h2>
                 {step > 0 && step < 6 && <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">+ Add New</span>}
              </div>
              
              {/* Premium Block */}
              <div className="rounded-xl p-5 bg-white flex-1 overflow-hidden flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 ring-1 ring-gray-900/5 relative min-h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                     key={step}
                     initial={{ opacity: 0, y: 6 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -6 }}
                     transition={{ duration: 0.15, ease: "easeOut" }}
                     className="space-y-4 flex-1 flex flex-col"
                  >
                     {activeData.fields.map((f, i) => (
                        <div key={i}>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">{f.l}</label>
                          <div className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-300 ${f.v ? 'text-gray-800 bg-gray-50/80' : 'text-transparent bg-gray-50/30'}`}>
                             {f.v || "Empty"}
                          </div>
                        </div>
                     ))}
                     
                     {step === 6 && (
                       <div className="mt-6 flex flex-col items-center justify-center text-center p-5 bg-blue-50/50 rounded-xl border border-blue-100/50">
                         <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 shadow-inner">
                           <Download size={24} />
                         </div>
                         <p className="text-sm font-bold text-gray-900">Your Resume is Ready!</p>
                         <p className="text-xs text-gray-500 mt-1">Exported as ATS-friendly PDF.</p>
                       </div>
                     )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Background gradient fade to make it look like a scrollable list */}
              {step < 6 && (
                <div className="rounded-xl p-5 bg-white shadow-sm mt-4 opacity-40 border border-gray-100 relative pointer-events-none translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-10 rounded-xl"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-800">NEXT SECTION</span>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Right Panel (A4 Preview) - Centered and Beautiful */}
            <div className="flex-1 bg-gradient-to-br from-gray-50/80 to-gray-200/50 p-4 sm:p-8 flex items-center justify-center relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
              
              {/* Status Badges */}
              <AnimatePresence>
                {showBadge && (
                  <motion.span 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-14 right-4 sm:right-6 inline-flex items-center gap-1.5 rounded-full bg-green-500/90 backdrop-blur-md border border-green-400/50 px-3 py-1.5 text-xs font-bold text-white shadow-lg z-30"
                  >
                    <CheckCircle size={14} /> Live Updated
                  </motion.span>
                )}
              </AnimatePresence>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-3 z-20">
                 <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Live Sync
                 </span>
              </div>
              
              {/* A4 Paper - Fixed Size for Perfect Scaling regardless of screen */}
              <div className={`bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] w-[380px] h-[537px] p-6 flex flex-col border border-gray-100 shrink-0 font-sans relative z-10 overflow-hidden transition-transform duration-500 group ${step === 6 ? 'scale-[1.03]' : 'hover:scale-[1.02]'}`}>
                
                {/* Header (Personal Info) */}
                <div className="text-center mb-3 border-b border-gray-900 pb-2 min-h-[60px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {step >= 1 ? (
                      <motion.div key="filled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="w-full">
                        <div className="font-serif font-bold text-xl leading-tight text-gray-900 tracking-tight">First Last</div>
                        <div className="text-[9px] text-gray-600 mt-1 font-medium">Mathura, Uttar Pradesh 281001</div>
                        <div className="flex items-center justify-center gap-2 text-[8px] font-medium text-gray-700 mt-1.5">
                          <span className="flex items-center gap-0.5"><strong className="text-gray-900">P</strong> +91 1234567890</span>
                          <span className="flex items-center gap-0.5"><strong className="text-gray-900">E</strong> sXXXXXXXXX@gmail.com</span>
                          <span className="flex items-center gap-0.5"><strong className="text-gray-900">in</strong> linkedin.com/in/sXXXXXXXXX</span>
                          <span className="flex items-center gap-0.5"><strong className="text-gray-900">G</strong> github.com/sxxx-cce12/</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-2 w-full opacity-30">
                        <div className="w-48 h-5 bg-gray-200 rounded"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded"></div>
                        <div className="flex gap-3 mt-1">
                           <div className="w-16 h-2 bg-gray-200 rounded"></div>
                           <div className="w-24 h-2 bg-gray-200 rounded"></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex-1 flex flex-col gap-3.5">
                  {/* Experience */}
                  <AnimatePresence>
                    {step >= 4 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                        <div className="font-serif font-bold text-[12px] uppercase text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">Internship</div>
                        <div className="flex justify-between text-[10px] leading-tight items-baseline">
                          <span className="font-bold text-gray-900">SEPI Intern <span className="font-normal text-gray-500 italic">| Tableau, SAP, DNS</span></span>
                          <span className="font-bold text-gray-900 text-[9px]">May 2023 - Jul 2023</span>
                        </div>
                        <div className="text-[9px] font-semibold italic text-gray-700 mt-0.5">JP Morgan Chase & Co.</div>
                        <div className="pl-2 mt-1.5 space-y-1">
                          <div className="flex gap-1.5 text-[9px] text-gray-800 leading-relaxed"><span className="text-gray-400 mt-0.5">•</span> <span>Contributed to the advancement of the organization's robust Document Manager web application.</span></div>
                          <div className="flex gap-1.5 text-[9px] text-gray-800 leading-relaxed"><span className="text-gray-400 mt-0.5">•</span> <span>Improved user experience and productivity by implementing comprehensive row grouping, column filtering...</span></div>
                          <div className="flex gap-1.5 text-[9px] text-gray-800 leading-relaxed"><span className="text-gray-400 mt-0.5">•</span> <span>Wrote Angular unit test cases using the Jasmine framework to validate components.</span></div>
                        </div>
                        
                        <div className="flex justify-between text-[10px] leading-tight items-baseline mt-3">
                          <span className="font-bold text-gray-900">Full Stack Web Developer Intern</span>
                          <span className="font-bold text-gray-900 text-[9px]">Feb 2022 - Aug 2022</span>
                        </div>
                        <div className="text-[9px] font-semibold italic text-gray-700 mt-0.5">edureka</div>
                        <div className="pl-2 mt-1 space-y-1">
                           <div className="flex gap-1.5 text-[9px] text-gray-800 leading-relaxed"><span className="text-gray-400 mt-0.5">•</span> <span>Built two dynamic web applications, Flipkart Clone and Zomato Clone.</span></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Projects */}
                  <AnimatePresence>
                    {step >= 5 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                        <div className="font-serif font-bold text-[12px] uppercase text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">Projects</div>
                        <div className="flex justify-between text-[10px] leading-tight items-baseline">
                          <span className="font-bold text-gray-900">Fkart App <span className="font-normal text-gray-500 italic">| MERN Stack</span></span>
                          <span className="font-bold text-gray-900 text-[9px]">Jul 2022 - Aug 2022</span>
                        </div>
                        <div className="pl-2 mt-1.5 space-y-1">
                          <div className="flex gap-1.5 text-[9px] text-gray-800 leading-relaxed"><span className="text-gray-400 mt-0.5">•</span> <span>Developed an e-commerce platform wherein users can buy numerous products.</span></div>
                        </div>
                        
                        <div className="flex justify-between text-[10px] leading-tight items-baseline mt-2.5">
                          <span className="font-bold text-gray-900">Project SearchEverywhere <span className="font-normal text-gray-500 italic">| Python, Linux, Bash</span></span>
                          <span className="font-bold text-gray-900 text-[9px]">Feb 2021 - Mar 2023</span>
                        </div>
                        <div className="pl-2 mt-1.5 space-y-1">
                          <div className="flex gap-1.5 text-[9px] text-gray-800 leading-relaxed"><span className="text-gray-400 mt-0.5">•</span> <span>Designed an open-source Linux tool that allows users to search specific information...</span></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Education, Certificates & Skills */}
                  <AnimatePresence>
                    {step >= 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="grid grid-cols-2 gap-4 mt-auto">
                        <div>
                          <div className="font-serif font-bold text-[11px] uppercase text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">Education</div>
                          <div className="text-[9px] font-bold text-gray-900 leading-tight">B.Tech Computer Science</div>
                          <div className="text-[8px] italic text-gray-600 mt-0.5">LPU — 2020-2024</div>
                          
                          <div className="font-serif font-bold text-[11px] uppercase text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5 mt-2">Certifications</div>
                          <div className="text-[9px] font-bold text-gray-900 leading-tight">Full Stack Web Development</div>
                          <div className="text-[8px] italic text-gray-600 mt-0.5">Edureka — Aug 2022</div>
                        </div>
                        <AnimatePresence>
                          {step >= 3 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                              <div className="font-serif font-bold text-[11px] uppercase text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">Skills</div>
                              <div className="text-[8px] leading-tight text-gray-800"><strong className="text-gray-900">Langs:</strong> C++, Java, JS</div>
                              <div className="text-[8px] leading-tight text-gray-800 mt-0.5"><strong className="text-gray-900">Tech:</strong> Angular, React, Node</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
              
              <div className={`absolute bottom-6 right-6 shadow-[0_8px_20px_rgba(37,99,235,0.4)] rounded-full bg-blue-600 p-3.5 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 z-30 cursor-pointer group ${step === 6 ? 'scale-110 ring-4 ring-blue-500/30' : 'hover:scale-110'}`}>
                <Download size={20} strokeWidth={2.5} className={step === 6 ? "animate-bounce" : "group-hover:translate-y-0.5 transition-transform"} />
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
