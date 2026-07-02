'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ThemeProfileMenu from '@/components/ThemeProfileMenu';

const initialSyllabusModules = [
  {
    id: 1,
    title: "Module 1: Low-Level Storage & System Architecture",
    status: "partial",
    gapsCount: 1,
    topics: [
      { name: "Motherboard Bus Architectures (PCIe, SATA)", status: "covered", source: "Week2_Motherboards.pdf" },
      { name: "BIOS/UEFI Configuration & Boot Flags", status: "covered", source: "Week1_Intro_Maintenance.pdf" },
      { name: "Interrupt Vectors & INT 13h Disk Operations", status: "missing", source: "No matching context found" }
    ]
  },
  {
    id: 2,
    title: "Module 2: POST Diagnostics & Diagnostic Routine",
    status: "covered",
    gapsCount: 0,
    topics: [
      { name: "Power-On Self-Test (POST) Failure Sequence", status: "covered", source: "Week1_Intro_Maintenance.pdf" },
      { name: "Audible Beep Code Diagnostic Matrices", status: "covered", source: "Week1_Intro_Maintenance.pdf" }
    ]
  },
  {
    id: 3,
    title: "Module 3: Non-Volatile Memory Registers",
    status: "missing",
    gapsCount: 2,
    topics: [
      { name: "CMOS Battery Voltage Decay & Clock Drift", status: "missing", source: "No matching context found" },
      { name: "NVRAM Variables Configuration Protection", status: "missing", source: "No matching context found" }
    ]
  }
];

export default function CurriculumGapDetector() {
  const [modules, setModules] = useState(initialSyllabusModules);
  const [generatingForId, setGeneratingForId] = useState(null);

  const handlePatchGap = (topicName) => {
    setGeneratingForId(topicName);
    
    setTimeout(() => {
      setModules(prevModules => 
        prevModules.map(mod => ({
          ...mod,
          topics: mod.topics.map(topic => 
            topic.name === topicName 
              ? { ...topic, status: "covered", source: "✨ Synthesized AI Supplement" } 
              : topic
          )
        }))
      );
      setGeneratingForId(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      
      {/* GLOBAL TOP NAVIGATION */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="font-bold tracking-tight text-slate-900">Lighthub.ed — GAP DETECTOR</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/course/cos141" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                ← Return to Workspace
              </Link>
              <ThemeProfileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* TITLE HERO */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:bg-slate-900 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Syllabus Mapping Matrix</h1>
            <p className="text-xs text-slate-500 mt-1">
              Cross-referencing university benchmark curriculum expectations against your uploaded repository.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-100 text-amber-800 text-xs px-3 py-2 rounded-xl font-medium self-stretch sm:self-auto justify-center">
            <span>⚠️ Total Disparities Detected: 3</span>
          </div>
        </div>

        {/* COMPARISON MODULE CARDS */}
        <div className="space-y-6">
          {modules.map((mod) => (
            <div key={mod.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-700">
              
              {/* Card Module Header Banner */}
              <div className={`p-4 border-b border-slate-100 flex justify-between items-center ${
                mod.status === 'covered' ? 'bg-emerald-50/20' : mod.status === 'partial' ? 'bg-amber-50/20' : 'bg-rose-50/10'
              }`}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 truncate mr-2">{mod.title}</h3>
                <span className={`text-xxs font-bold uppercase px-2.5 py-1 rounded-full shrink-0 ${
                  mod.status === 'covered' ? 'bg-emerald-100 text-emerald-800' : mod.status === 'partial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {mod.status === 'covered' ? '● Verified Complete' : mod.status === 'partial' ? '▲ Knowledge Gaps' : '✕ Unprepared'}
                </span>
              </div>

              {/* Topics Breakdown List */}
              <div className="divide-y divide-slate-100">
                {mod.topics.map((topic, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-slate-50/50 transition">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{topic.name}</p>
                      {/* Hidden on extra small screens, pops up on 'sm' and up */}
                      <div className="hidden sm:flex items-center space-x-2 text-xxs text-slate-400">
                        <span>Status Tracked:</span>
                        <span className={topic.status === 'covered' ? 'text-slate-600 font-medium' : 'text-rose-500 font-bold'}>
                          {topic.source}
                        </span>
                      </div>
                    </div>

                    {/* Action button adapts neatly to screen width */}
                    <div className="w-full sm:w-auto">
                      {topic.status === 'missing' ? (
                        <button
                          onClick={() => handlePatchGap(topic.name)}
                          disabled={generatingForId !== null}
                          className="w-full sm:w-auto px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xxs rounded-xl shadow-sm transition text-center"
                        >
                          {generatingForId === topic.name ? 'Generating Notes...' : '✨ Patch Context Gap'}
                        </button>
                      ) : (
                        <div className="text-emerald-600 font-bold text-xs flex items-center justify-start sm:justify-end space-x-1 px-2 py-1">
                          <span>✓</span> <span className="text-xxs uppercase tracking-wider">Ready</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
}