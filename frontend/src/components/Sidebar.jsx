import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Upload,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Meeting History",
      path: "/meetings",
      icon: <History size={18} />,
    },
    {
      name: "Upload Meeting",
      path: "/upload",
      icon: <Upload size={18} />,
    },
    {
      name: "AI Chat",
      path: "/chat",
      icon: <MessageSquare size={18} />,
    },
    {
      name: "Analytics",
      path: "/dashboard",
      icon: <BarChart3 size={18} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? "block opacity-60 bg-slate-950" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="fixed inset-y-0 left-0 z-30 w-[280px] overflow-hidden rounded-r-[40px] border-r border-slate-800/60 bg-slate-950/95 shadow-2xl backdrop-blur-xl lg:static lg:translate-x-0"
      >
        <div className="flex h-full flex-col px-6 py-8">
          <div className="mb-10 flex items-center gap-3 rounded-3xl bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white">MeetingIQ</h1>
              <p className="text-sm text-slate-400">AI Meeting Intelligence</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-sky-500 to-violet-500 text-slate-950 shadow-lg shadow-sky-500/20"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-3xl border border-slate-800/60 bg-slate-900/75 p-4 shadow-inner shadow-slate-950/30">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">AI Status</p>
                <p className="mt-2 text-sm font-semibold text-emerald-300">Connected</p>
              </div>
              <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-emerald-300">
                <span className="text-xs">Live</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
