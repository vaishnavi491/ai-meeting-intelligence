import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/meetings": "Meeting History",
  "/upload": "Upload Meeting",
  "/chat": "AI Chat",
  "/settings": "Settings",
};

function Mainlayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_22%),linear-gradient(180deg,_#020617_0%,_#020617_100%)]" />

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:pl-[280px]">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} pageTitle={pageTitles[location.pathname] || "Workspace"} />

        <main className="min-h-screen px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto max-w-7xl"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Mainlayout;
