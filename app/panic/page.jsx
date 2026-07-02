'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Mock high-yield crisis items extracted by our RAG system
const mockSummaries = [
  { id: 1, topic: 'BIOS Configuration Interrupts', detail: 'Interrupt vectors point to memory locations handling hardware requests. Primary key is INT 13h for low-level disk operations.' },
  { id: 2, topic: 'POST Sequence Failure States', detail: 'Power-On Self-Test uses audible beep codes if video memory fails. 1 long, 2 short beeps usually indicates a display adapter issue.' },
  { id: 3, topic: 'CMOS Battery Voltages', detail: 'A failing CR2032 lithium cell (below 3.0V) resets the system clock and returns BIOS variables to fallback defaults during cold boots.' },
];

// Mock structured 48-hour sprint schedule based on curriculum gaps
const mockSchedule = [
  { time: "Hours 0 - 12 (Block A)", phase: "Core Gap Aggression", task: "Review synthesized notes on INT 13h Interrupt Vectors & disk I/O.", complete: true },
  { time: "Hours 12 - 24 (Block B)", phase: "Diagnostic Deep-Dive", task: "Drill down on Motherboard POST beep code diagnostic matrices.", complete: false },
  { time: "Hours 24 - 36 (Block C)", phase: "NVRAM Registers", task: "Study CMOS clock drifts, voltage decay behaviors, and variable reset fallbacks.", complete: false },
  { time: "Hours 36 - 48 (Block D)", phase: "Final Simulation", task: "Run rapid-fire Active Recall matrix checks and review flagged cards.", complete: false }
];

const mockFlashcards = [
  { question: 'What is the exact purpose of the POST (Power-On Self-Test)?', answer: 'To verify the presence and basic operational integrity of core hardware system components (RAM, CPU, Cache, Storage, Controllers) before executing the OS bootloader.' },
  { question: 'What does a constant, repeating short beep code typically signal?', answer: 'A fatal power supply unit failure, motherboard regulation failure, or severe system memory (RAM) misplacement.' },
  { question: 'What memory structure holds system configuration variables when power is completely lost?', answer: 'Non-Volatile RAM (NVRAM) or the CMOS register, kept alive by the dedicated motherboard lithium cell.' }
];

export default function PanicModePage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeline, setTimeline] = useState(mockSchedule);

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % mockFlashcards.length);
    }, 150);
  };

  const toggleTask = (index) => {
    setTimeline(prev => prev.map((item, idx) => 
      idx === index ? { ...item, complete: !item.complete } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      
      {/* EMERGENCY CRISIS HEADER */}
      <header className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white shadow-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">PANIC MODE ACTIVE: COS 141</h1>
              <p className="text-xxs text-rose-100 font-medium">LLM Workspace condensed down into absolute exam essentials.</p>
            </div>
          </div>
          <Link 
            href="/course/cos141" 
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition text-center w-full sm:w-auto shrink-0"
          >
            ← Exit Crisis Room
          </Link>
        </div>
      </header>

      {/* CORE THREE-PANEL COMPACT SYSTEM */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* COLUMN 1: 48-HOUR TIME-BOXED SCHEDULER */}
        <main className="flex-1 space-y-6">
          
          {/* Timeline Block */}
          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">48-Hour Survival Countdown</h2>
              <p className="text-xs text-slate-500 mt-0.5">Time-boxed task blocks to map out remaining revision intervals safely.</p>
            </div>

            <div className="relative border-l-2 border-slate-200 ml-2 pl-4 space-y-5">
              {timeline.map((block, idx) => (
                <div key={idx} className="relative group">
                  {/* Outer circle layout indicator */}
                  <div className={`absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 bg-white transition-all ${
                    block.complete ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 group-hover:border-rose-500'
                  }`} />
                  
                  <div className={`p-3 rounded-xl border transition-all ${
                    block.complete ? 'bg-slate-50/70 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wide">
                          {block.time}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 mt-1">{block.phase}</h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{block.task}</p>
                      </div>
                      <button 
                        onClick={() => toggleTask(idx)}
                        className={`text-xxs font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg border transition self-start sm:self-auto ${
                          block.complete 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {block.complete ? '✓ Done' : 'Mark Ready'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick High-Yield Cheat Notes Summary */}
          <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">High-Yield Content Snippets</h2>
              <p className="text-xs text-slate-500 mt-0.5">Extracted system patches covering detected curriculum disparities.</p>
            </div>
            <div className="space-y-3">
              {mockSummaries.map((summary) => (
                <div key={summary.id} className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/10">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="text-rose-500">📌</span> {summary.topic}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{summary.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* COLUMN 2: ACTIVE RECALL MATRIX (Right side) */}
        <aside className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 sticky top-24">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">Active Recall Matrix</h2>
              <p className="text-xs text-slate-500 mt-0.5">Audit comprehension instantly via active evaluation loops.</p>
            </div>

            {/* THE FLASHCARD CONTAINER */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className={`min-h-[260px] rounded-2xl border cursor-pointer p-5 flex flex-col justify-between shadow-sm transform transition-all duration-300 ${
                isFlipped 
                  ? 'bg-slate-900 text-white border-slate-800 rotate-1' 
                  : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-100/30 -rotate-1'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isFlipped ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isFlipped ? '🧠 Core Answer Key' : '❓ Crisis Prompt'}
                </span>
                
                <p className={`mt-6 text-xs font-bold leading-relaxed tracking-tight ${
                  isFlipped ? 'text-slate-200' : 'text-slate-900'
                }`}>
                  {isFlipped ? mockFlashcards[cardIndex].answer : mockFlashcards[cardIndex].question}
                </p>
              </div>

              <div className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-4 border-t border-dashed border-slate-300/40">
                {isFlipped ? 'Tap inside card to hide answer' : 'Tap inside card to reveal answer'}
              </div>
            </div>

            {/* METRIC CARD BAR */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-semibold text-slate-400">
                Card {cardIndex + 1} of {mockFlashcards.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents flipping the card accidentally when clicking next
                  handleNextCard();
                }}
                className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm"
              >
                Next Card →
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}