"use client";
import Link from "next/link";
import { Edit3, Download, FileText, Clock, Trash2 } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";
import { useState, useEffect } from "react";

export function MyResumes() {
  const [resumes, setResumes] = useState<any[]>([]);

  useEffect(() => {
    try {
      let saved = [];
      const storedArray = localStorage.getItem("ats-saved-resumes");
      if (storedArray) {
        saved = JSON.parse(storedArray);
      }
      
      // Fallback: migrate old draft if no array exists
      if (!saved || saved.length === 0) {
        const legacyDraft = localStorage.getItem("ats-resume-draft");
        if (legacyDraft) {
          const parsed = JSON.parse(legacyDraft);
          if (parsed && parsed.fields) {
            // Give it a generic ID and add to array
            parsed.id = parsed.id || "res_legacy";
            saved = [parsed];
            localStorage.setItem("ats-saved-resumes", JSON.stringify(saved));
          }
        }
      }
      
      if (Array.isArray(saved)) {
        // Sort by most recently saved first
        saved.sort((a, b) => (b.lastSaved || 0) - (a.lastSaved || 0));
        setResumes(saved);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      const updated = resumes.filter(r => r.id !== id);
      setResumes(updated);
      localStorage.setItem("ats-saved-resumes", JSON.stringify(updated));
    }
  };

  if (resumes.length === 0) return null;

  return (
    <section id="my-resumes" className="bg-gray-50/50 py-12 border-y border-gray-200/50">
      <div className="container">
        <MotionReveal>
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Resumes</h2>
            <p className="text-gray-600 max-w-lg mx-auto text-sm">
              Pick up right where you left off or instantly download your latest versions.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2">
            {resumes.map((draft, idx) => {
              const firstName = draft.fields?.firstName || "My";
              const lastName = draft.fields?.lastName || "Resume";
              let fullName = `${firstName} ${lastName}`.trim();
              if (fullName === "My Resume" && draft.title) {
                fullName = draft.title;
              }
              const dateStr = draft.lastSaved ? new Date(draft.lastSaved).toLocaleDateString() : "Recently";
              const id = draft.id || "res_legacy";

              return (
                <div key={id + idx} className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow relative group">
                  <button 
                    onClick={() => handleDelete(id)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Resume"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="flex items-center gap-4 pr-8">
                    <div className="w-12 h-16 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                      <FileText className="text-blue-500" size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-md text-gray-900 mb-1 line-clamp-1">{fullName}</h3>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Clock size={12} />
                        <span>Last edited {dateStr}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
                    <Link href={`/builder/?id=${id}&edit=true`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xs rounded-lg transition-colors">
                      <Edit3 size={14} />
                      <span>Edit</span>
                    </Link>
                    <Link href={`/builder/?id=${id}&print=true`} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm shadow-blue-600/20">
                      <Download size={14} />
                      <span>Download</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
