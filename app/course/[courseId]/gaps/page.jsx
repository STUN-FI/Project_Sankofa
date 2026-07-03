"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function GapDetectorPage() {
  const [loading, setLoading] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState('');

  const fetchComplementaryNotes = async () => {
    setLoading(true);
    setGeneratedNotes('');
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: "Analyze the missing syllabus concept: BIOS Configuration Interrupts. Cross-reference with standard hardware troubleshooting guidelines and generate high-yield bridging study notes." 
        })
      });
      
      const data = await response.json();
      setGeneratedNotes(data.reply);
    } catch (error) {
      setGeneratedNotes("Failed to connect to the local vector engine. Please verify your FastAPI backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* HEADER */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-xxs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              Lighthub.ed Analytics Hub
            </span>
            <h1 className="text-base font-bold text-slate-900 mt-1">Syllabus Gap Alignment</h1>
          </div>
          <Link href="/course/cos141" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
            ← Back to Workspace
          </Link>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 lg:p-6 space-y-6">
        
        {/* GAP BANNER INFOCARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs">
              <span>⚠️</span> <span>Detected Gap: BIOS Configuration Interrupts</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your indexed vector space covers basic motherboard architectures and introductory maintenance procedures, but completely skips over software-to-hardware interrupt handling execution mechanisms during the initial system boot phase.
            </p>
          </div>
          <button
            onClick={fetchComplementaryNotes}
            disabled={loading}
            className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-sm disabled:opacity-50 whitespace-nowrap self-start md:self-center"
          >
            {loading ? "Analyzing Core Vector Gaps..." : "Generate Complementary Notes"}
          </button>
        </div>

        {/* OUTPUT HUB */}
        <section className="bg-white border border-slate-200 rounded-2xl min-h-[400px] flex flex-col shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bridging Study Guide Material</h2>
            <span className="text-xxs text-slate-400 font-mono">Output Status: Dynamic Markdown</span>
          </div>

          <div className="flex-1 p-6 text-xs text-slate-700 leading-relaxed overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-2 text-slate-400">
                <span className="animate-spin text-lg">⏳</span>
                <p className="text-xxs tracking-wider uppercase animate-pulse">Scanning ChromaDB background references & synthesizing missing nodes...</p>
              </div>
            ) : generatedNotes ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 whitespace-pre-wrap font-mono text-slate-800 border-l-2 border-l-amber-500 shadow-inner">
                {generatedNotes}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center max-w-xs mx-auto space-y-2 text-slate-400">
                <span className="text-xl">📚</span>
                <p className="text-xxs leading-relaxed">Click the generation button above to let Lighthub.ed extract adjacent vector weights and build flash revision data to cover your exam scope.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}