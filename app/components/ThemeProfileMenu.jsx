'use client';

import { useEffect, useState } from 'react';

export default function ThemeProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(preferred);
      document.documentElement.classList.toggle('dark', preferred === 'dark');
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lg shadow-slate-500/10 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
        aria-label="Open theme menu"
      >
        ST
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-56 rounded-3xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Profile actions
            </p>
            <p className="mt-1 text-sm font-semibold">Theme mode</p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-slate-100 px-3 py-2 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800"
          >
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {theme === 'dark' ? 'Dark mode' : 'Light mode'}
            </span>
            <span className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300'}`}>
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
