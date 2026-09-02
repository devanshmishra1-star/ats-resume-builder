"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, MapPin, ExternalLink, Activity, Shield, Target, Smartphone } from 'lucide-react';

export function PortfolioRenderer({ data }: { data: any }) {
  if (!data) return null;

  const { profile, skills, experience, projects, education, certifications, sections, design, keyMetrics } = data;
  
  const theme = design?.visualDirection?.theme || design?.theme || "light";
  const style = design?.visualDirection?.style || design?.style || "minimal-editorial";
  const accentHex = design?.visualDirection?.accentColor || design?.accentColor || "#d97757"; // Premium orange/rust default
  const fontHeading = design?.visualDirection?.fontHeading || design?.fontHeading || "Inter";
  const fontBody = design?.visualDirection?.fontBody || design?.fontBody || "Inter";

  const heroLayout = design?.layout?.hero || "premium-editorial";
  const projectsLayout = design?.layout?.projects || "case-studies";
  const expLayout = design?.layout?.experience || "timeline";
  const skillsLayout = design?.layout?.skills || "pillars";
  const has3D = design?.background3D?.enabled || true;

  const isDark = theme === "dark";
  const isMinimal = style === "minimal-editorial";
  const isCreative = style === "creative";
  const isTechnical = style === "technical";
  const isCorporate = style === "corporate";

  const Background3D = () => {
    if (!has3D) return null;
    if (isMinimal) return (
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-[0.03]">
        <motion.div animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="absolute inset-0" style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>
    );
    if (isTechnical) return (
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-20">
        <motion.div animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${accentHex} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      </div>
    );
    if (isCreative) return (
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30 blur-3xl">
        <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter" style={{ backgroundColor: accentHex }} />
        <motion.div animate={{ rotate: -360, scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter" style={{ backgroundColor: isDark ? '#4F46E5' : '#818CF8' }} />
      </div>
    );
    return null;
  };

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontHeading.replace(/ /g, '+')}:wght@400;700;900&family=${fontBody.replace(/ /g, '+')}:wght@400;500;700&family=Playfair+Display:ital,wght@1,600&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [fontHeading, fontBody]);

  let containerBg = isDark ? "bg-[#0a0a0a] text-white" : "bg-[#faf9f6] text-[#1a1a1a]"; // Off-white premium default
  if (isCreative) containerBg = isDark ? "bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white" : "bg-gradient-to-br from-indigo-50 via-purple-50 to-[#faf9f6] text-gray-900";
  if (isTechnical) containerBg = isDark ? "bg-[#050505] text-green-400 font-mono" : "bg-gray-100 text-gray-900 font-mono";
  
  let cardBg = isDark ? "bg-[#111] border-[#222]" : "bg-white border-gray-200 shadow-sm";
  if (isMinimal) cardBg = "bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem]";
  if (isCreative) cardBg = isDark ? "bg-white/5 border-white/10 backdrop-blur-md shadow-xl border-l-4" : "bg-white/60 border-white/40 backdrop-blur-md shadow-xl border-l-4";
  if (isTechnical) cardBg = isDark ? "bg-black border border-green-900/50 rounded-none" : "bg-white border border-gray-300 rounded-none shadow-none";

  const renderIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes("github")) return <Github size={18} />;
    if (lower.includes("linkedin")) return <Linkedin size={18} />;
    if (lower.includes("twitter") || lower.includes("x")) return <Twitter size={18} />;
    return <ExternalLink size={18} />;
  };

  const getHighlightText = (fullText: string, highlight: string) => {
    if (!fullText || !highlight) return fullText;
    const parts = fullText.split(highlight);
    if (parts.length === 1) return fullText;
    return (
      <>
        {parts[0]}
        <span style={{ color: accentHex, fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>{highlight}</span>
        {parts[1]}
      </>
    );
  };

  const renderHero = () => {
    if (heroLayout === "premium-editorial" || isMinimal) {
      return (
        <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 text-left z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium mb-8 bg-white/50 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full inline-block mr-2" style={{ backgroundColor: accentHex }}></span>
              Available for work
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-extrabold tracking-tight mb-6 text-5xl md:text-7xl lg:text-[5rem] leading-[1.1]" style={{ fontFamily: fontHeading }}>
              {profile.valueProposition ? getHighlightText(profile.valueProposition, profile.valuePropositionHighlight || profile.valueProposition.split(' ').slice(-2).join(' ')) : profile.name}
            </motion.h1>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl font-medium mb-10 opacity-70 max-w-2xl leading-relaxed">
              {profile.about || profile.role}
            </motion.p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="px-8 py-4 rounded-xl text-white font-semibold transition-transform hover:scale-105" style={{ backgroundColor: accentHex }}>
                Book a call
              </motion.button>
              {profile.links?.map((link: any, i: number) => (
                <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + (i*0.1) }} key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-4 rounded-xl border border-gray-300 bg-white/50 hover:bg-white transition-colors shadow-sm">
                  {renderIcon(link.platform)}
                </motion.a>
              ))}
            </div>
          </div>
          
          {profile.image && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex-1 w-full flex justify-center relative">
              <div className="relative w-full max-w-md aspect-[4/5]">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-transparent z-10"></div>
                 <img src={profile.image} alt={profile.name} className="w-full h-full object-cover grayscale contrast-125 object-top drop-shadow-2xl" style={{ filter: 'grayscale(100%) contrast(1.1)' }} />
              </div>
            </motion.div>
          )}
        </section>
      );
    }
    
    // Fallback hero...
    return (
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-bold tracking-tight mb-4 text-5xl md:text-7xl" style={{ fontFamily: fontHeading }}>
              {profile.name}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl md:text-2xl font-medium mb-6" style={{ color: accentHex }}>
              {profile.role}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg leading-relaxed opacity-80 mb-8 max-w-xl">
              {profile.about}
            </motion.p>
          </div>
          {profile.image && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex-1 flex justify-center md:justify-end">
              <img src={profile.image} alt={profile.name} className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform" style={{ border: `4px solid ${accentHex}` }} />
            </motion.div>
          )}
      </section>
    );
  };

  const renderMetrics = () => {
    if (!keyMetrics || keyMetrics.length === 0) return null;
    return (
      <section className="border-y border-gray-200 py-8 bg-white/40 backdrop-blur-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 divide-x divide-gray-200">
          {keyMetrics.map((metric: any, i: number) => (
            <div key={i} className={`pl-8 flex-1 text-center md:text-left ${i === 0 ? 'pl-0 border-none' : ''}`}>
              <div className="text-4xl md:text-5xl font-bold mb-1" style={{ fontFamily: fontHeading }}>{metric.value}</div>
              <div className="text-sm md:text-base opacity-60 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!skills || skills.length === 0) return null;
    
    if (skillsLayout === "pillars" || isMinimal) {
      const icons = [<Target size={32} />, <Shield size={32} />, <Activity size={32} />, <Smartphone size={32} />];
      return (
        <section className="py-20">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: fontHeading }}>How I <span style={{ color: accentHex, fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>help</span>.</h2>
              <p className="text-lg opacity-60">Core pillars and expertise.</p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
            {skills.slice(0,3).map((skillGroup: any, i: number) => (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className={`p-10 ${cardBg} flex flex-col items-center text-center`}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${accentHex}15`, color: accentHex }}>
                  {icons[i % icons.length]}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: fontHeading }}>{skillGroup.category}</h3>
                <p className="opacity-70 leading-relaxed">{skillGroup.items.join(', ')}</p>
              </motion.div>
            ))}
           </div>
        </section>
      );
    }
    
    // Fallback skills...
    return (
      <section>
        <h2 className="text-3xl font-bold mb-10 border-b border-gray-500/20 pb-4" style={{ fontFamily: fontHeading }}>Expertise</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skillGroup: any) => skillGroup.items.map((skill: string, j: number) => (
            <span key={`${skillGroup.category}-${j}`} className={`px-4 py-2 rounded-full border ${cardBg} text-sm font-bold shadow-sm`}>{skill}</span>
          )))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    
    if (projectsLayout === "case-studies" || isMinimal) {
      return (
        <section className="py-20">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: fontHeading }}>Recent <span style={{ color: accentHex, fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>case studies</span></h2>
              <p className="text-lg opacity-60">The work moves numbers, not just pixels.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj: any, i: number) => (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className={`p-10 pb-0 overflow-hidden flex flex-col ${cardBg}`}>
                <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold tracking-wider uppercase mb-6 self-start text-gray-500">
                  {proj.techStack}
                </div>
                <h3 className="text-3xl font-bold mb-6 leading-tight">{proj.title}</h3>
                <ul className="space-y-3 opacity-80 mb-10 list-disc list-inside">
                  <li className="leading-relaxed">{proj.description}</li>
                </ul>
                <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center pb-8">
                   {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="font-semibold flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: accentHex }}>View Project <ExternalLink size={16}/></a>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      );
    }
    
    // Fallback projects...
    return (
      <section>
        <h2 className="text-3xl font-bold mb-10 border-b border-gray-500/20 pb-4" style={{ fontFamily: fontHeading }}>Selected Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((proj: any, i: number) => (
            <div key={i} className={`p-8 rounded-3xl border shadow-sm flex flex-col h-full ${cardBg}`}>
              <h3 className="text-2xl font-bold mb-4">{proj.title}</h3>
              <p className="opacity-80 mb-6 flex-grow">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  const renderExperience = () => {
      // ... keep basic for now, let's prioritize the hero/skills/projects which the user showed
      if (!experience || experience.length === 0) return null;
      return (
        <section className="py-20">
          <h2 className="text-3xl font-bold mb-12" style={{ fontFamily: fontHeading }}>Experience</h2>
          <div className="space-y-12">
            {experience.map((exp: any, i: number) => (
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={i} className="md:grid md:grid-cols-4 md:gap-8 items-start border-b border-gray-200 pb-12 last:border-0">
                <div className="md:col-span-1 mb-2 md:mb-0 opacity-50 font-bold tracking-wider text-sm uppercase pt-1">{exp.duration}</div>
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <div className="text-lg font-medium mb-4 mt-1" style={{ color: accentHex }}>{exp.company}</div>
                  <ul className="space-y-3 opacity-70 list-disc list-outside pl-4">
                    {exp.description.map((desc: string, j: number) => <li key={j} className="leading-relaxed">{desc}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      );
  }

  return (
    <div className={`min-h-screen ${containerBg} selection:bg-[#d97757]/30 transition-colors duration-500 relative z-0 overflow-x-hidden`} style={{ '--accent': accentHex, fontFamily: fontBody } as React.CSSProperties}>
      <Background3D />
      
      {/* Premium Top Navigation Pill */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-2 py-2 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full shadow-lg flex items-center gap-8 hidden md:flex">
         <div className="flex items-center gap-3 px-4 border-r border-gray-200">
            <span className="font-bold tracking-tight text-black">{profile.name.split(' ')[0]}</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
         </div>
         <div className="flex gap-6 text-sm font-semibold opacity-60">
            <a href="#work" className="hover:text-black">Work</a>
            <a href="#about" className="hover:text-black">About</a>
         </div>
         <button className="w-10 h-10 rounded-full text-white flex items-center justify-center transition-transform hover:scale-105" style={{ backgroundColor: accentHex }}>
            <Mail size={16} />
         </button>
      </nav>

      {renderHero()}
      {renderMetrics()}
      
      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-10">
        {renderSkills()}
        {renderProjects()}
        {renderExperience()}
      </div>
    </div>
  );
}
