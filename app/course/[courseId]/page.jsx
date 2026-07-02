'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function StudySpacePage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I've loaded your course documents into my vector memory. Ask me anything about this syllabus, or check the section below for detected layout or content gaps." }
  ]);
  const [input, setInput] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isDesktopChatOpen, setIsDesktopChatOpen] = useState(true);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm processing that query against your indexed PDFs. (Backend FastAPI endpoint connection goes here!)" }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-x-hidden">
      
      {/* GLOBAL TOP NAVIGATION */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="font-bold tracking-tight text-slate-900">Lighthub.ed</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                ← Dashboard
              </Link>
              <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
                ST
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* RESPONSIVE CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 py-6 lg:px-8 gap-6 pb-24 lg:pb-6 transition-all duration-300">
        
        {/* COLUMN 1: SIDEBAR */}
        <aside className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-6 flex-shrink-0 shadow-sm">
          <div className="space-y-5">
            <div>
              <p className="text-xxs font-bold uppercase tracking-wider text-slate-400 mb-2">Active Workspace</p>
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold text-xs">
                <span>📚</span> <span>COS 141 - Hardware</span>
              </div>
            </div>

            <div>
              <p className="text-xxs font-bold uppercase tracking-wider text-slate-400 mb-2">Indexed Files</p>
              <div className="space-y-1.5 max-h-36 lg:max-h-none overflow-y-auto text-xs text-slate-600">
                <div className="p-2.5 bg-slate-50 rounded-xl truncate border border-slate-100 flex items-center space-x-2">
                  <span>📄</span> <span className="truncate">Week1_Intro_Maintenance.pdf</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl truncate border border-slate-100 flex items-center space-x-2">
                  <span>📄</span> <span className="truncate">Week2_Motherboards.pdf</span>
                </div>
              </div>
            </div>
          </div>

          {/* PULSING / SHINING PANIC BUTTON */}
          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/panic"
              className="w-full block text-center bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 text-white rounded-xl py-3 text-xs font-bold shadow-md hover:from-rose-500 hover:to-red-500 transition duration-150 shadow-rose-200 animate-pulse"
            >
              🚨 LAUNCH PANIC MODE
            </Link>
          </div>
        </aside>

        {/* COLUMN 2: CENTER MAIN FEED */}
        <main className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col space-y-6 shadow-sm transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">COS 141 Workspace</h1>
              <p className="text-xs text-slate-500 mt-1">Computer Hardware Maintenance and Troubleshooting Vector Context</p>
            </div>
            
            {/* Desktop-only chat restore button when sidebar is closed */}
            {!isDesktopChatOpen && (
              <button 
                onClick={() => setIsDesktopChatOpen(true)}
                className="hidden lg:inline-flex items-center space-x-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-xs font-semibold transition"
              >
                <span>💬 Open AI Co-Pilot</span>
              </button>
            )}
          </div>

          {/* DRAG & DROP UPLOAD */}
          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-8 text-center bg-slate-50 cursor-pointer transition-all">
            <div className="text-2xl mb-2">📥</div>
            <p className="text-xs font-semibold text-slate-700">Drag & drop course PDFs or image documents here</p>
            <p className="text-xxs text-slate-400 mt-1">Supports standard text PDFs or Scanned/Handwritten content via OCR</p>
          </div>

          {/* GAP DETECTION */}
          <div className="border border-amber-200 bg-amber-50/60 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs">
              <span>⚠️</span> <span>Information Gap Flagged</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We noticed a syllabus timeline disparity between your **Week 1 PDF** and **Week 2 PDF**. The concept of *BIOS Configuration Interrupts* was mentioned but not explicitly defined anywhere in your files.
            </p>
            <Link
              href="/course/cos141/gaps"
              className="inline-flex bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-3 py-2 rounded-xl transition shadow-sm"
            >
              Generate Complementary Notes
            </Link>
          </div>
        </main>

        {/* COLUMN 3: DESKTOP AI CONTEXT CHAT ENGINE (With open/close handler toggle) */}
        {isDesktopChatOpen && (
          <section className="hidden lg:flex w-80 bg-white border border-slate-200 rounded-2xl flex-col justify-between flex-shrink-0 shadow-sm animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-xs font-bold text-slate-900 tracking-wide">Workspace AI Co-Pilot</h2>
                <p className="text-xxs text-slate-400">Isolated ChromaDB Thread</p>
              </div>
              <button 
                onClick={() => setIsDesktopChatOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1.5 hover:bg-slate-100 rounded-lg transition"
                title="Hide panel"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30 max-h-[450px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white rounded-b-2xl">
              <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200 focus-within:border-indigo-500 focus-within:bg-white transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask context question..." 
                  className="w-full bg-transparent border-0 py-2.5 pl-3 pr-10 text-xs text-slate-900 focus:ring-0"
                />
                <button type="submit" className="absolute right-3 text-indigo-600 font-bold text-sm">➔</button>
              </div>
            </form>
          </section>
        )}

      </div>

      {/* MOBILE FLOATING CHATBOT BUTTON & WINDOW */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
          className="fixed bottom-6 right-6 h-14 w-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl z-50 hover:bg-indigo-500 transition-all text-xl"
        >
          {isMobileChatOpen ? '✕' : '💬'}
        </button>

        {isMobileChatOpen && (
          <div className="fixed bottom-24 right-6 left-6 max-w-sm ml-auto bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 flex flex-col h-[400px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-xs font-bold text-slate-900">Workspace AI Co-Pilot</h2>
                <p className="text-xxs text-slate-400">Mobile Thread View</p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white">
              <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask question..." 
                  className="w-full bg-transparent border-0 py-2 pl-3 pr-10 text-xs text-slate-900 focus:ring-0"
                />
                <button type="submit" className="absolute right-3 text-indigo-600 font-bold text-sm">➔</button>
              </div>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}