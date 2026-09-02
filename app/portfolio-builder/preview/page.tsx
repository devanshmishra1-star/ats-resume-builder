"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioRenderer } from "@/components/PortfolioRenderer";
import { Settings, Save, CheckCircle, ExternalLink, X } from "lucide-react";

export default function PortfolioPreviewPage() {
  const [data, setData] = useState<any>(null);
  const [slug, setSlug] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const draft = localStorage.getItem("digital_portfolio_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setData(parsed);
        // generate a default slug based on name
        if (parsed.profile?.name) {
          setSlug(parsed.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
        router.push("/portfolio-builder");
      }
    } else {
      router.push("/portfolio-builder");
    }
  }, [router]);

  const handlePublish = async () => {
    if (!slug) return alert("Please enter a username URL");
    setIsPublishing(true);
    try {
      const res = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, data }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      // Save edit token
      localStorage.setItem(`portfolio_token_${result.portfolio.slug}`, result.portfolio.editToken);
      setPublishSuccess(true);
    } catch (e: any) {
      alert(e.message || "Failed to publish");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleThemeToggle = () => {
    setData((prev: any) => ({
      ...prev,
      design: {
        ...prev.design,
        theme: prev.design.theme === "dark" ? "light" : "dark"
      }
    }));
  };

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading preview...</div>;

  if (publishSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg text-center">
          <div className="text-green-500 flex justify-center mb-6">
            <CheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your Portfolio is Live!</h2>
          <p className="text-gray-600 mb-8">Your digital portfolio has been successfully published to the web.</p>
          <div className="bg-gray-100 p-4 rounded-xl mb-8 flex items-center justify-between">
            <span className="font-mono text-sm text-gray-800">atsresumebuilder.co.in/u/{slug}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => window.open(`/u/${slug}`, "_blank")} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700">
              <ExternalLink size={18} /> View Live
            </button>
            <button onClick={() => router.push("/")} className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-300">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden flex">
      {/* Main Preview Area */}
      <div className="flex-1 h-full overflow-y-auto">
        <div className="sticky top-0 z-50 bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
          <div className="font-bold">Portfolio Preview (Draft)</div>
          <button onClick={() => setShowEditor(!showEditor)} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <Settings size={16} /> Edit & Publish
          </button>
        </div>
        <PortfolioRenderer data={data} />
      </div>

      {/* Editor Sidebar */}
      {showEditor && (
        <div className="w-96 h-full bg-white shadow-2xl border-l border-gray-200 flex flex-col z-50 absolute right-0 top-0">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-900">Publish Settings</h3>
            <button onClick={() => setShowEditor(false)} className="text-gray-500 hover:text-gray-900">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Quick Design Tweaks */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Design Tweaks</h4>
              <button 
                onClick={handleThemeToggle}
                className="w-full py-2 border rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Toggle {data.design?.theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
            
            {/* Publishing details */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Publishing</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL slug</label>
                  <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 ring-indigo-500">
                    <span className="bg-gray-100 px-3 py-2 text-gray-500 text-sm border-r">/u/</span>
                    <input 
                      type="text" 
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="flex-1 px-3 py-2 outline-none text-sm font-mono"
                      placeholder="username"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">This will be your public link.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t bg-gray-50">
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isPublishing ? 'Publishing...' : <><Save size={18} /> Publish to Web</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
