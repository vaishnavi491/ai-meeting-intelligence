import { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";

import {
  CalendarDays,
  ClipboardList,
  Trophy,
  Sparkles,
  Rocket,
  Moon,
  Sun,
} from "lucide-react";

function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchMeetings();

    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);

    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/";
};

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");

const response = await axios.get(
  "https://ai-meeting-intelligence-ng81.onrender.com/api/meetings",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setMeetings(response.data.meetings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalMeetings = meetings.length;

  const totalActionItems = meetings.reduce(
    (acc, meeting) =>
      acc + (meeting.actionItems?.length || 0),
    0
  );

  const totalDecisions = meetings.reduce(
    (acc, meeting) =>
      acc + (meeting.decisions?.length || 0),
    0
  );

  const stats = [
    {
      label: "Meetings",
      value: totalMeetings,
      icon: <CalendarDays size={22} />,
    },
    {
      label: "Action Items",
      value: totalActionItems,
      icon: <ClipboardList size={22} />,
    },
    {
      label: "Decisions",
      value: totalDecisions,
      icon: <Trophy size={22} />,
    },
    {
      label: "AI Usage",
      value: "128%",
      icon: <Sparkles size={22} />,
    },
  ];

  const weeklyData = [
    { name: "Mon", value: 18 },
    { name: "Tue", value: 24 },
    { name: "Wed", value: 34 },
    { name: "Thu", value: 26 },
    { name: "Fri", value: 30 },
    { name: "Sat", value: 20 },
    { name: "Sun", value: 14 },
  ];

  const shareData = [
    { name: "Summary", value: 45 },
    { name: "Transcript", value: 28 },
    { name: "Reports", value: 27 },
  ];

  const suggestions = useMemo(
    () => [
      "What were the main decisions?",
      "Summarize action items.",
      "Show top risks.",
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-[#060816] dark:text-white transition-colors duration-300">

      {/* NAVBAR */}

      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-[#0B1020]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-2xl font-bold text-black dark:text-white">
            AI Meeting Intelligence
          </h1>

          <div className="flex items-center gap-3">

          
            <button
              onClick={toggleTheme}
              className="rounded-full bg-slate-800 p-3 text-white"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 px-4 py-2 border border-slate-800">

  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-bold text-white">

    V

  </div>

  <div className="text-left">

    <h3 className="text-sm font-semibold text-white">
      Vaishnavi
    </h3>

    <p className="text-xs text-slate-400">
      AI SaaS Dashboard
    </p>

  </div>

</div>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* HERO */}

        <section className="rounded-3xl bg-white dark:bg-[#111827] p-8 shadow-lg">
          <div className="grid gap-8 lg:grid-cols-2">

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                PREMIUM AI DASHBOARD
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight">
                Meet smarter with AI-powered meeting intelligence.
              </h1>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-gray-100 dark:bg-[#0B1220] p-6">
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Weekly Activity
                  </p>

                  <h2 className="mt-3 text-4xl font-bold">
                    24
                  </h2>
                </div>

                <div className="rounded-2xl bg-gray-100 dark:bg-[#0B1220] p-6">
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Team Productivity
                  </p>

                  <h2 className="mt-3 text-4xl font-bold">
                    100%
                  </h2>
                </div>

              </div>
            </div>

            <div className="rounded-3xl bg-gray-100 dark:bg-[#0B1220] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-slate-500">
                TEAM PULSE
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                AI-assisted meeting intelligence
              </h2>

              <div className="mt-6 space-y-4">

                <div className="rounded-2xl bg-white dark:bg-[#111827] p-5">
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Most active channel
                  </p>

                  <p className="mt-2 font-semibold">
                    Product strategy
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#111827] p-5">
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Average review time
                  </p>

                  <p className="mt-2 font-semibold">
                    16 minutes
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* STATS */}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={stat.label}
              className="rounded-3xl bg-white dark:bg-[#111827] p-6 shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-slate-800 p-4 text-white">
                {stat.icon}
              </div>

              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-slate-500">
                {stat.label}
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                {stat.value}
              </h2>
            </motion.div>
          ))}

        </section>

        {/* CHARTS */}

        <section className="grid gap-6 xl:grid-cols-2">

          <div className="rounded-3xl bg-white dark:bg-[#111827] p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">
              Meeting Trend
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid stroke="#1e293b" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#06b6d4"
                    fill="#0891b2"
                  />
                </AreaChart>
              </ResponsiveContainer>

            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-[#111827] p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">
              AI Usage Share
            </h2>

            <div className="h-[300px]">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={shareData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                  >
                    <Cell fill="#06b6d4" />
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#22c55e" />
                  </Pie>

                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>
          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="rounded-3xl bg-white dark:bg-[#111827] p-6 shadow-lg">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-cyan-600 p-3 text-white">
              <Rocket size={20} />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-slate-500">
                QUICK ACTIONS
              </p>

              <h2 className="text-2xl font-bold">
                Suggested AI prompts
              </h2>
            </div>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            {suggestions.map((item) => (
              <Link
                key={item}
                to="/chat"
                className="rounded-2xl bg-gray-100 dark:bg-[#0B1220] p-5 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                {item}
              </Link>
            ))}

          </div>

        </section>

        {loading && (
          <div className="rounded-3xl bg-white dark:bg-[#111827] p-10 text-center shadow-lg">
            Loading analytics...
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;