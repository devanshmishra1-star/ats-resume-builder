import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";

export async function Templates() {
  const templates = await prisma.template.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { displayOrder: 'asc' },
  });

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'Official': return 'bg-blue-100 text-blue-700';
      case 'Most Popular': return 'bg-amber-100 text-amber-700';
      case 'Trending': return 'bg-rose-100 text-rose-700';
      case 'Campus Favourite': return 'bg-emerald-100 text-emerald-700';
      case 'New': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTemplateLink = (slug: string) => {
    const s = slug.toLowerCase().trim();
    if (s === 'lpu official' || slug === 'LPU Official ') return '/builder/?template=modern';
    if (s === 'lpu mba' || slug === 'LPU MBA ' || slug === 'lpu-mba') return '/builder/?template=lpu-mba';
    if (s.includes('ropar') || s.includes('b.tech') || s.includes('btech')) return '/builder/?template=iit-ropar';
    if (s.includes('general') || slug === 'LPU-Official ') return '/builder/?template=lpu-general';
    return '#';
  };

  const isTemplateReady = (slug: string) => {
    const s = slug.toLowerCase().trim();
    return (
      slug === 'LPU Official ' || 
      s === 'lpu mba' || slug === 'LPU MBA ' || slug === 'lpu-mba' || 
      slug === 'LPU-Official ' || s.includes('general') ||
      s.includes('ropar') || s.includes('b.tech') || s.includes('btech')
    );
  };

  return (
    <section className="content-section muted-section" id="templates">
      <div className="container">
        <SectionHeader
          kicker="Resume Templates"
          title="Start with a premium university format."
          copy="Choose a professionally designed layout. Each option instantly opens the live builder so you can start typing immediately."
        />
        <div className="template-grid">
          {templates.map((template) => (
            <article key={template.slug} className="template-card template-card-live relative overflow-hidden group">
              {template.badge && (
                <div className="absolute top-3 right-3 z-10">
                   <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${getBadgeColor(template.badge)}`}>
                      {(template.badge === 'Most Popular' || template.badge === 'Official') ? <Star size={12} fill="currentColor" /> : null}
                      {template.badge}
                   </span>
                </div>
              )}
              <div className="template-preview">
                <Image
                  src={(template.thumbnailImage && template.thumbnailImage.length > 5) ? template.thumbnailImage : (template.slug === 'LPU Official ' ? "/assets/lpu-resume-template.png" : "/assets/modern-resume-template-640.webp")}
                  alt={`${template.name} resume template preview`}
                  width={640}
                  height={900}
                  sizes="(max-width: 760px) calc(100vw - 32px), 360px"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="template-body relative bg-white">
                <div>
                  <p className="template-label">{template.university || template.category}</p>
                  <h3>{template.name}</h3>
                  <p className="template-copy">{template.shortDescription}</p>
                </div>
                <div className="template-actions">
                  <Link prefetch={true} className={`button-secondary ${!isTemplateReady(template.slug) ? 'opacity-50 pointer-events-none' : ''}`} href={getTemplateLink(template.slug)}>
                    <Eye size={16} aria-hidden="true" />
                    Preview
                  </Link>
                  <Link prefetch={true} className={`button-primary ${!isTemplateReady(template.slug) ? 'opacity-50 pointer-events-none !bg-gray-400 !text-white !border-gray-400' : ''}`} href={getTemplateLink(template.slug)}>
                    {isTemplateReady(template.slug) ? 'Use Template' : 'Coming Soon'}
                    {isTemplateReady(template.slug) && <ArrowRight size={16} aria-hidden="true" />}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
