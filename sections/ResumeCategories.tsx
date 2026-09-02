import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const categories = [
  { title: "Software Engineer", href: "/builder/" },
  { title: "MBA", href: "/builder/" },
  { title: "B.Tech", href: "/builder/" },
  { title: "MCA", href: "/builder/" },
  { title: "Teacher", href: "/builder/" },
  { title: "Finance", href: "/builder/" },
  { title: "Marketing", href: "/builder/" },
  { title: "Healthcare", href: "/builder/" },
  { title: "HR", href: "/builder/" },
  { title: "Freshers", href: "/builder/" }
];

export function ResumeCategories() {
  return (
    <section className="content-section muted-section" id="categories">
      <div className="container">
        <SectionHeader
          kicker="Resume Categories"
          title="Built for students, professionals and every role in between."
          copy="The layout is modular so users can quickly find a category that feels relevant to their next application."
        />
        <div className="category-grid">
          {categories.map((item) => (
            <Link className="category-card" key={item.title} href={item.href}>
              <span>{item.title}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
