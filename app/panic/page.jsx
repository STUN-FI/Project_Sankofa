"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PanicModePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 });
  const [loadingContext, setLoadingContext] = useState(false);
  const [cramResponse, setCramResponse] = useState('');

  // 48-Hour High-Intensity Countdown Timer Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fast Backend Ingestion Route to pull quick summary answers directly from ChromaDB chunks
  const triggerEmergencyCram = async (topic) => {
    setLoadingContext(true);
    setCramResponse('');
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Provide an emergency high-yield exam summary for the topic: ${topic}. Focus on key definitions, architecture, and common exam questions.` })
      });
      const data = await response.json();
      setCramResponse(data.reply);
    } catch (error) {
      setCramResponse("Failed to connect to the local vector engine. Make sure your FastAPI backend is running.");
    } finally {
      setLoadingContext(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-rose-500 selection:text-white">
      
      {/* PANIC HEADER MODE MONITOR */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-600 animate-ping" />
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-rose-600">Lighthub.ed Panic Core Active</h1>
            <p className="text-xxs text-slate-500">COS 141 • 48-Hour Ingestion Engine Mode</p>
          </div>
        </div>
        
        {/* COUNTDOWN CLOCK */}
        <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl">
          <span className="text-xxs font-bold uppercase tracking-wider text-rose-700 mr-2">Time to Exam:</span>
          <div className="font-mono text-sm font-bold text-rose-600 flex space-x-1">
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
            <span className="animate-pulse">:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
            <span className="animate-pulse">:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>

        <Link href="/course/cos141" className="text-xxs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-white transition shadow-sm">
          ← Leave Panic Space
        </Link>
      </header>

      {/* CORE WORKSPACE SPLIT LAYOUT */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CRISIS RADAR HUB (5-COLS) */}
        <main className="lg:col-span-5 flex flex-col space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Emergency Cram Targets</h2>
              <p className="text-xxs text-slate-500 mt-0.5">Select a high-probability target topic to fetch local vector context summaries.</p>
            </div>

            {/* TOPIC SELECTION BLOCKS */}
            <div className="space-y-2">
              {[
                { title: "BIOS Interrupts & INT 13h Disk Operations", prob: "94% Match" },
                { title: "Northbridge vs Southbridge Architecture", prob: "88% Match" },
                { title: "POST (Power-On Self-Test) Sequence Failures", prob: "82% Match" },
                { title: "CMOS Battery Loss & Volatile Clock Resets", prob: "75% Match" }
              ].map((topic, i) => (
                <button
                  key={i}
                  onClick={() => triggerEmergencyCram(topic.title)}
                  className="w-full text-left p-3.5 bg-slate-50 border border-slate-100 hover:border-rose-200 hover:bg-rose-50/20 rounded-xl flex justify-between items-center group transition"
                >
                  <div className="space-y-0.5 max-w-[80%]">
                    <p className="text-xs font-semibold text-slate-700 group-hover:text-rose-600 transition truncate">{topic.title}</p>
                    <p className="text-xxs font-mono text-slate-400">ChromaDB Context Match Pool</p>
                  </div>
                  <span className="text-xxs font-mono bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded-md font-bold">
                    {topic.prob}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* HIGH-INTENSITY MEMORY JOGGERS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Quick Recall Mnemonics</h3>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xxs text-slate-600 leading-relaxed">
                <strong className="text-rose-600 block mb-1">POST Order sequence:</strong>
                CPU Register Verification → ROM BIOS Checksum → CMOS Integrity → Timer Check → Video Controller Initialization.
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 text-center text-xxs text-slate-400 font-medium">
              Lighthub.ed Engine v1.0 • Low-Bandwidth Offline Optimization
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: REVISION RECEPTOR EXECUTOR (7-COLS) */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden min-h-[500px] shadow-sm">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <span className="text-xs font-bold tracking-wide text-slate-700">Active High-Yield Vector Synthesis</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow shadow-emerald-500" title="Backend pipeline active" />
          </div>

          <div className="flex-1 p-5 overflow-y-auto text-xs text-slate-600 space-y-4">
            {loadingContext ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 text-slate-400">
                <span className="animate-spin text-lg">⏳</span>
                <p className="text-xxs tracking-wider uppercase animate-pulse">Running vector lookup & context extraction...</p>
              </div>
            ) : cramResponse ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 leading-relaxed whitespace-pre-wrap text-slate-800 border-l-2 border-l-rose-500 shadow-inner">
                {cramResponse}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-xs mx-auto space-y-2 text-slate-400">
                <span className="text-xl">⚡</span>
                <p className="text-xxs leading-relaxed">Select an Emergency Cram Target on the left menu grid to generate instantaneous layout-optimized study notes direct from ChromaDB.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}