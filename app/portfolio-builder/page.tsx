"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { UploadCloud, FileText, Loader2, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioBuilderLanding() {
  const [file, setFile] = useState<File | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progressMsg, setProgressMsg] = useState("Reading your resume...");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture(e.target.files[0]);
    }
  };

  const generatePortfolio = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setProgressMsg("Reading your resume...");

    const formData = new FormData();
    formData.append("resume", file);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      // Simulate progress messages since the actual Gemini API call might take 10-15 seconds
      const msgs = [
        "Understanding your experience...",
        "Organizing your projects...",
        "Identifying your strongest skills...",
        "Designing your portfolio...",
        "Preparing your interactions..."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < msgs.length) {
          setProgressMsg(msgs[i]);
          i++;
        }
      }, 3000);

      const response = await fetch("/api/portfolio/generate", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      if (!response.ok) {
        let errText = await response.text();
        let errMsg = "Failed to generate portfolio.";
        try {
          const errObj = JSON.parse(errText);
          if (errObj.error) errMsg = errObj.error;
        } catch (e) {
          console.error("Non-JSON error response", errText);
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      
      // Save the generated JSON to localStorage for the preview page
      localStorage.setItem("digital_portfolio_draft", JSON.stringify(data.portfolio));
      
      // Navigate to preview page
      router.push("/portfolio-builder/preview");
      
    } catch (err: any) {
      setError(err.message || "An error occurred during generation.");
      setIsUploading(false);
    }
  };

  return (
    <SiteShell>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-10 md:p-14 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-2xl mb-6 text-indigo-600">
              <Wand2 size={40} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              AI Portfolio Generator
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg mx-auto">
              Upload your resume. Get your own professionally designed portfolio website in seconds. No coding required.
            </p>

            <AnimatePresence mode="wait">
              {!isUploading ? (
                <motion.div
                  key="upload-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center pointer-events-none">
                      {file ? (
                        <>
                          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600 mb-4">
                            <FileText size={32} />
                          </div>
                          <p className="font-semibold text-gray-900 text-lg">{file.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </>
                      ) : (
                        <>
                          <div className="bg-gray-100 p-4 rounded-full text-gray-500 mb-4">
                            <UploadCloud size={32} />
                          </div>
                          <p className="font-semibold text-gray-900 text-lg">Click or drag your resume here</p>
                          <p className="text-sm text-gray-500 mt-1">Supports PDF & DOCX formats</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Picture Upload Field */}
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer relative mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePictureChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center pointer-events-none">
                      {picture ? (
                        <>
                          <p className="font-semibold text-gray-900">{picture.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{(picture.size / 1024 / 1024).toFixed(2)} MB</p>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold text-gray-900">Upload Professional Picture (Optional)</p>
                          <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP</p>
                        </>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 bg-red-50 p-3 rounded-lg text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={generatePortfolio}
                    disabled={!file}
                    className="w-full py-4 px-8 bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Generate My Portfolio
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="loading-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                    <Loader2 size={64} className="text-indigo-600 animate-spin relative z-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-2">Building Your Portfolio</h3>
                  <div className="h-8 flex items-center justify-center">
                    <motion.p
                      key={progressMsg}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-indigo-600 font-medium text-lg"
                    >
                      {progressMsg}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SiteShell>
  );
}
