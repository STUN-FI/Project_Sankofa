 'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Mock high-yield crisis items extracted by our RAG system
const mockSummaries = [
  { id: 1, topic: 'BIOS Configuration Interrupts', detail: 'Interrupt vectors point to memory locations handling hardware requests. Primary key is INT 13h for low-level disk operations.' },
  { id: 2, topic: 'POST Sequence Failure States', detail: 'Power-On Self-Test uses audible beep codes if video memory fails. 1 long, 2 short beeps usually indicates a display adapter issue.' },
  { id: 3, topic: 'CMOS Battery Voltages', detail: 'A failing CR2032 lithium cell (below 3.0V) resets the system clock and returns BIOS variables to fallback defaults during cold boots.' },
];

const mockFlashcards = [
  { question: 'What is the exact purpose of the POST (Power-On Self-Test)?', answer: 'To verify the presence and basic operational integrity of core hardware system components (RAM, CPU, Cache, Storage, Controllers) before executing the OS bootloader.' },
  { question: 'What does a constant, repeating short beep code typically signal?', answer: 'A fatal power supply unit failure, motherboard regulation failure, or severe system memory (RAM) misplacement.' },
  { question: 'What memory structure holds system configuration variables when power is completely lost?', answer: 'Non-Volatile RAM (NVRAM) or the CMOS register, kept alive by the dedicated motherboard lithium cell.' }
];

export default function PanicModePage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % mockFlashcards.length);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      
      {/* EMERGENCY CRISIS HEADER */}
      <header className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">PANIC MODE ACTIVE: COS 141</h1>
              <p className="text-xxs text-rose-100 font-medium">Llm Workspace condensed down into absolute exam essentials.</p>
            </div>
          </div>
          <Link
            href="/course/cos141"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition text-center w-full sm:w-auto"
          >
            ← Exit Crisis Room
          </Link>
        </div>
      </header>

      {/* CORE TWO-COLUMN CRISIS VIEW */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* PANEL 1: EMERGENCY CORE SUMMARY STRIP (Left Side) */}
        <main className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">High-Yield Crisis Summaries</h2>
            <p className="text-xs text-slate-500 mt-0.5">Extracted system notes covering detected information gaps.</p>
          </div>

          <div className="space-y-4">
            {mockSummaries.map((summary) => (
              <div 
                key={summary.id}
                className="p-4 rounded-xl border border-rose-100 bg-rose-50/20 hover:border-rose-200 transition-all"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-rose-600 text-sm mt-0.5">📌</span>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">{summary.topic}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{summary.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* PANEL 2: INTERACTIVE FLASHCARD ENGINE (Right Side) */}
        <section className="w-full lg:w-[450px] bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Recall Matrix</h2>
            <p className="text-xs text-slate-500 mt-0.5">Flip the card to audit your understanding instantly.</p>
          </div>

          {/* THE FLASHCARD CONTAINER */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`flex-1 min-h-[260px] max-h-[300px] rounded-2xl border cursor-pointer p-6 flex flex-col justify-between shadow-sm transform transition-all duration-300 ${
              isFlipped 
                ? 'bg-slate-900 text-white border-slate-800 rotate-1' 
                : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 -rotate-1'
            }`}
          >
            <div>
              <span className={`text-xxs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                isFlipped ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {isFlipped ? '🧠 Core Answer Key' : '❓ Crisis Prompt'}
              </span>
              
              <p className={`mt-6 text-sm font-semibold leading-relaxed tracking-tight ${
                isFlipped ? 'text-slate-200' : 'text-slate-900'
              }`}>
                {isFlipped ? mockFlashcards[cardIndex].answer : mockFlashcards[cardIndex].question}
              </p>
            </div>

            <div className="text-center text-xxs font-bold uppercase tracking-wider text-slate-400 pt-4 border-t border-dashed border-slate-300/40">
              {isFlipped ? 'Tap anywhere to hide answer' : 'Tap anywhere to reveal answer'}
            </div>
          </div>

          {/* CARD METRIC CONTROLS */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-semibold text-slate-400">
              Card {cardIndex + 1} of {mockFlashcards.length}
            </span>
            <button
              onClick={handleNextCard}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
            >
              Next Card →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}