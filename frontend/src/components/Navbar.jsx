import { Link } from "react-router-dom";
import { Bell, Menu, Search, Moon, SunMedium, Sparkles } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({ onToggleSidebar, pageTitle }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/90 text-slate-200 transition hover:border-slate-700 hover:bg-slate-900 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Workspace</p>
            <h2 className="text-2xl font-semibold text-white">{pageTitle}</h2>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-300 transition hover:border-slate-700 hover:bg-slate-900">
            <Search size={16} /> Search meetings
          </button>

          <Link
            to="/upload"
            className="rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
          >
            New Meeting
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/90 text-slate-200 transition hover:border-slate-700 hover:bg-slate-900"
          >
            {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>

          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/90 text-slate-200 transition hover:border-slate-700 hover:bg-slate-900">
            <Bell size={18} />
          </button>

          <div className="hidden h-11 min-w-[3rem] items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20 md:flex">
            <Sparkles size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
