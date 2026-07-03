"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Mock data representing the per-course vector namespaces
const courses = [
  { id: 'cos141', name: 'Computer Hardware Maintenance', code: 'COS 141', docs: 8, coverage: 75, color: 'from-blue-500 to-indigo-600' },
  { id: 'stat111', name: 'Descriptive Statistics', code: 'STAT 111', docs: 5, coverage: 40, color: 'from-emerald-500 to-teal-600' },
  { id: 'math103', name: 'Mathematical Methods I', code: 'MATH 103', docs: 12, coverage: 90, color: 'from-violet-500 to-purple-600' },
];

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const avatarRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        modalRef.current &&
        avatarRef.current &&
        !modalRef.current.contains(e.target) &&
        !avatarRef.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const openModal = () => setShowModal(true);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* GLOBAL TOP NAVIGATION */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="font-bold tracking-tight text-slate-900">Lighthub.ed</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div
                  ref={avatarRef}
                  onClick={openModal}
                  onMouseEnter={openModal}
                  role="button"
                  tabIndex={0}
                  className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.418 0-8 2.686-8 6v2h16v-2c0-3.314-3.582-6-8-6z" />
                  </svg>
                </div>

                {showModal && (
                  <div
                    ref={modalRef}
                    className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl p-3 shadow-lg z-50"
                  >
                    <div className="text-xs font-semibold text-slate-700 mb-2">Preferences</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xxs text-slate-500">Dark mode</div>
                      <button
                        type="button"
                        aria-pressed={darkMode}
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT LAYER */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="md:flex md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your Study Spaces</h1>
            <p className="mt-2 text-sm text-slate-500">Select a course vector namespace to manage files, detect gaps, or launch Panic Mode.</p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Link href="/course/cos141" className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-150">
              <span className="mr-2 text-base font-bold">+</span>
              New Space
            </Link>
          </div>
        </div>

        {/* VECTOR NAMESPACE GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <div>
                {/* Visual badge top right */}
                <div className={`absolute top-0 right-0 h-2 w-full bg-gradient-to-r ${course.color}`} />
                <div className="flex items-center justify-between mt-2">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">{course.code}</span>
                  <div className="text-xs text-slate-400">{course.docs} docs</div>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">{course.name}</h3>
                <p className="mt-1 text-xxs text-slate-500">Coverage: {course.coverage}%</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link href={`/course/${course.id}`} className="text-indigo-600 font-semibold text-xs hover:underline">Open</Link>
                <Link href={`/course/${course.id}/gaps`} className="text-amber-600 font-semibold text-xs hover:underline">Detect Gaps</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
